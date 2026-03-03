import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import { deleteAudioBlob, getAudioBlob, saveAudioBlob } from "./lib/audioStore";

const STORAGE_KEY = "canciones:songs:v1";

const seed = [
  {
    id: 1,
    title: "Golden Hour",
    artist: "JVKE",
    year: 2022,
    genre: "Pop",
    duration: "3:29",
    moods: ["warm", "romantic"],
    note: "Golden-hour vibe, re lindo para caminar.",
    liked: true,
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60",
    spotifyUrl: "https://open.spotify.com/track/4yNk9iz9WVJikRFle3XEvn",
    spotifyEmbed: "https://open.spotify.com/embed/track/4yNk9iz9WVJikRFle3XEvn",
    hasAudio: false,
    audioUrl: "",
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    year: 2022,
    genre: "Pop",
    duration: "2:47",
    moods: ["nostalgic"],
    note: "Me pone nostálgica pero arriba.",
    liked: false,
    cover:
      "https://images.unsplash.com/photo-1521337706264-a414f153a5f5?w=800&auto=format&fit=crop&q=60",
    spotifyUrl: "https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7",
    spotifyEmbed: "https://open.spotify.com/embed/track/4LRPiXqCikLlN15c3yImP7",
    hasAudio: false,
    audioUrl: "",
  },
  {
    id: 3,
    title: "My Own Demo",
    artist: "You",
    year: 2026,
    genre: "Demo",
    duration: "—",
    moods: ["experimental"],
    note: "Ejemplo: acá iría un mp3 tuyo.",
    liked: false,
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60",
    spotifyUrl: "",
    spotifyEmbed: "",
    hasAudio: false,
    audioUrl: "",
  },
];

function normalizeSpotifyEmbed(url) {
  if (!url) return "";
  // Si pega link de Spotify “open”, lo convertimos a embed
  if (url.includes("open.spotify.com/track/")) {
    const id = url.split("track/")[1]?.split("?")[0];
    return id ? `https://open.spotify.com/embed/track/${id}` : "";
  }
  // Si ya es embed lo dejamos
  if (url.includes("open.spotify.com/embed/")) return url;
  return "";
}

function parseMoods(str) {
  return String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export default function App() {
  const [songs, setSongs] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : seed;
    } catch {
      return seed;
    }
  });

  const [query, setQuery] = useState("");
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [genreFilter, setGenreFilter] = useState("all");
  const [moodFilter, setMoodFilter] = useState("all");

  const [nowPlayingId, setNowPlayingId] = useState(null);

  // para limpiar objectURLs cuando cambian
  const objectUrlsRef = useRef(new Map());

  // Persist metadata
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs.map((s) => ({ ...s, audioUrl: "" }))));
    // guardamos audioUrl vacío porque se reconstruye desde IndexedDB (por performance y porque es URL temporal)
  }, [songs]);

  // Hydrate audioUrl desde IndexedDB cuando haya hasAudio
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const updated = await Promise.all(
        songs.map(async (s) => {
          if (!s.hasAudio) return s;
          if (s.audioUrl) return s;

          const blob = await getAudioBlob(s.id);
          if (!blob) return { ...s, hasAudio: false, audioUrl: "" };

          // Crear objectURL
          const url = URL.createObjectURL(blob);
          objectUrlsRef.current.set(s.id, url);
          return { ...s, audioUrl: url };
        })
      );

      if (!cancelled) setSongs(updated);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo al montar

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      for (const url of objectUrlsRef.current.values()) URL.revokeObjectURL(url);
      objectUrlsRef.current.clear();
    };
  }, []);

  const genres = useMemo(() => {
    const set = new Set(songs.map((s) => s.genre).filter(Boolean));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [songs]);

  const moods = useMemo(() => {
    const set = new Set();
    songs.forEach((s) => (s.moods || []).forEach((m) => set.add(m)));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [songs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = songs.filter((s) => {
      const match =
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.note || "").toLowerCase().includes(q) ||
        (s.moods || []).some((m) => m.toLowerCase().includes(q));

      const likedOk = onlyLiked ? s.liked : true;
      const genreOk = genreFilter === "all" ? true : s.genre === genreFilter;
      const moodOk = moodFilter === "all" ? true : (s.moods || []).includes(moodFilter);

      return match && likedOk && genreOk && moodOk;
    });

    list.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "artist") return a.artist.localeCompare(b.artist);
      if (sortBy === "year") return (b.year || 0) - (a.year || 0);
      // recent: id es timestamp para nuevas -> más grande = más nuevo
      return (b.id || 0) - (a.id || 0);
    });

    return list;
  }, [songs, query, onlyLiked, sortBy, genreFilter, moodFilter]);

  const featured = useMemo(() => {
    // Top 3: liked primero, luego recientes
    const copy = [...songs].sort((a, b) => {
      if (a.liked !== b.liked) return a.liked ? -1 : 1;
      return (b.id || 0) - (a.id || 0);
    });
    return copy.slice(0, 3);
  }, [songs]);

  const stats = useMemo(() => {
    const total = songs.length;
    const liked = songs.filter((s) => s.liked).length;
    const withAudio = songs.filter((s) => s.hasAudio).length;
    const withLinks = songs.filter((s) => s.spotifyUrl).length;
    return { total, liked, withAudio, withLinks };
  }, [songs]);

  const nowPlaying = useMemo(() => {
    return songs.find((s) => s.id === nowPlayingId) || null;
  }, [songs, nowPlayingId]);

  const toggleLike = (id) => {
    setSongs((prev) => prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)));
  };

  const playSong = (id) => setNowPlayingId(id);

  const removeSong = async (id) => {
    // borrar audio si existe
    await deleteAudioBlob(id);
    const url = objectUrlsRef.current.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(id);
    }
    setSongs((prev) => prev.filter((s) => s.id !== id));
    if (nowPlayingId === id) setNowPlayingId(null);
  };

  const addSong = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const title = String(fd.get("title") || "").trim();
    const artist = String(fd.get("artist") || "").trim();
    if (!title || !artist) return;

    const year = Number(fd.get("year") || 0) || new Date().getFullYear();
    const genre = String(fd.get("genre") || "").trim() || "—";
    const duration = String(fd.get("duration") || "").trim() || "—";
    const cover = String(fd.get("cover") || "").trim();
    const note = String(fd.get("note") || "").trim();
    const moodsStr = String(fd.get("moods") || "").trim();
    const spotifyUrl = String(fd.get("spotifyUrl") || "").trim();

    const id = Date.now();
    const audioFile = form.elements.audio?.files?.[0];

    let hasAudio = false;
    let audioUrl = "";

    if (audioFile) {
      hasAudio = true;
      await saveAudioBlob(id, audioFile);
      const url = URL.createObjectURL(audioFile);
      objectUrlsRef.current.set(id, url);
      audioUrl = url;
    }

    const spotifyEmbed = normalizeSpotifyEmbed(spotifyUrl);

    const newSong = {
      id,
      title,
      artist,
      year,
      genre,
      duration,
      cover,
      note,
      moods: parseMoods(moodsStr),
      liked: false,
      spotifyUrl,
      spotifyEmbed,
      hasAudio,
      audioUrl,
    };

    setSongs((prev) => [newSong, ...prev]);
    setNowPlayingId(id);
    form.reset();
  };

  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <Logo />
          <div>
            <h1>Canciones Library</h1>
            <p className="sub">
              Minimal + dark + pastel · subí tu audio o pegá links
            </p>
          </div>
        </div>

        <div className="stats">
          <div className="pill">Total: <b>{stats.total}</b></div>
          <div className="pill">Fav: <b>{stats.liked}</b></div>
          <div className="pill">Audio: <b>{stats.withAudio}</b></div>
          <div className="pill">Links: <b>{stats.withLinks}</b></div>
        </div>
      </header>

      <section className="hero card">
        <div className="heroLeft">
          <h2>Top picks</h2>
          <p className="muted">
            Elegí una canción para verla en <b>Now Playing</b>. Podés filtrar por mood y género.
          </p>

          <div className="featured">
            {featured.map((s) => (
              <button key={s.id} className="featuredCard" onClick={() => playSong(s.id)}>
                <div className="featuredCover" style={{ backgroundImage: `url(${s.cover || ""})` }} />
                <div className="featuredMeta">
                  <div className="t">{s.title}</div>
                  <div className="d">{s.artist} · {s.genre}</div>
                </div>
                <div className="go">▶</div>
              </button>
            ))}
          </div>
        </div>

        <div className="heroRight">
          <h2>Agregar canción</h2>
          <form className="form" onSubmit={addSong}>
            <input className="input" name="title" placeholder="Título *" />
            <input className="input" name="artist" placeholder="Artista *" />

            <div className="row">
              <input className="input" name="year" placeholder="Año" />
              <input className="input" name="duration" placeholder="Duración (3:12)" />
            </div>

            <input className="input" name="genre" placeholder="Género (Pop, Indie…)" />
            <input className="input" name="moods" placeholder="Moods (comma) ej: chill, sad, warm" />
            <input className="input" name="cover" placeholder="Cover URL (opcional)" />
            <input className="input" name="spotifyUrl" placeholder="Spotify link (opcional)" />
            <input className="input" name="note" placeholder="Nota (por qué te gusta / qué te hace sentir)" />

            <input className="input" name="audio" type="file" accept="audio/*" />

            <button className="btn" type="submit">Agregar</button>
            <p className="hint">
              Tip: Para Spotify, pegá el link normal y se convierte solo a embed.
            </p>
          </form>
        </div>
      </section>

      <section className="layout">
        <div className="library card">
          <div className="libraryTop">
            <h2>Biblioteca</h2>

            <div className="controls">
              <input
                className="input"
                placeholder="Buscar (título, artista, mood, nota)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select className="input select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recent">Orden: Recientes</option>
                <option value="title">Orden: Título</option>
                <option value="artist">Orden: Artista</option>
                <option value="year">Orden: Año</option>
              </select>

              <select className="input select" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                {genres.map((g) => (
                  <option key={g} value={g}>{g === "all" ? "Género: Todos" : g}</option>
                ))}
              </select>

              <select className="input select" value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)}>
                {moods.map((m) => (
                  <option key={m} value={m}>{m === "all" ? "Mood: Todos" : m}</option>
                ))}
              </select>

              <label className="check">
                <input type="checkbox" checked={onlyLiked} onChange={(e) => setOnlyLiked(e.target.checked)} />
                Solo favoritas
              </label>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="empty">No hay resultados.</p>
          ) : (
            <ul className="list">
              {filtered.map((s) => (
                <li key={s.id} className={`item ${nowPlayingId === s.id ? "active" : ""}`}>
                  <button className="play" onClick={() => playSong(s.id)} title="Play">
                    ▶
                  </button>

                  <div className="coverWrap">
                    {s.cover ? (
                      <img className="cover" src={s.cover} alt={`${s.title} cover`} />
                    ) : (
                      <div className="cover placeholder" />
                    )}
                  </div>

                  <div className="meta">
                    <div className="titleRow">
                      <div className="title">{s.title}</div>
                      <div className="chips">
                        {(s.moods || []).slice(0, 3).map((m) => (
                          <span key={m} className="chip">{m}</span>
                        ))}
                      </div>
                    </div>

                    <div className="detail">
                      {s.artist} · {s.year} · {s.genre} · {s.duration}
                    </div>

                    {s.note ? <div className="note">{s.note}</div> : null}

                    <div className="actions">
                      {s.spotifyUrl ? (
                        <a className="open" href={s.spotifyUrl} target="_blank" rel="noreferrer">
                          Open link
                        </a>
                      ) : (
                        <span className="mutedSmall">Sin link</span>
                      )}

                      {s.hasAudio ? <span className="mutedSmall">Audio propio ✅</span> : <span className="mutedSmall">—</span>}
                    </div>
                  </div>

                  <button className={`like ${s.liked ? "on" : ""}`} onClick={() => toggleLike(s.id)} title="Fav">
                    {s.liked ? "♥" : "♡"}
                  </button>

                  <button className="trash" onClick={() => removeSong(s.id)} title="Delete">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="now card">
          <div className="nowTop">
            <h2>Now Playing</h2>
            {!nowPlaying ? <span className="mutedSmall">Elegí una canción</span> : null}
          </div>

          {!nowPlaying ? (
            <div className="nowEmpty">
              <p className="muted">Click en ▶ de cualquier canción.</p>
            </div>
          ) : (
            <div className="nowBody">
              <div className="nowHead">
                {nowPlaying.cover ? (
                  <img className="nowCover" src={nowPlaying.cover} alt="cover" />
                ) : (
                  <div className="nowCover placeholder" />
                )}
                <div>
                  <div className="nowTitle">{nowPlaying.title}</div>
                  <div className="nowDetail">
                    {nowPlaying.artist} · {nowPlaying.genre}
                  </div>
                </div>
              </div>

              {nowPlaying.note ? <div className="nowNote">{nowPlaying.note}</div> : null}

              {nowPlaying.audioUrl ? (
                <audio className="player" controls src={nowPlaying.audioUrl} />
              ) : nowPlaying.spotifyEmbed ? (
                <div className="embed">
                  <iframe
                    src={nowPlaying.spotifyEmbed}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="spotify"
                  />
                </div>
              ) : (
                <div className="muted">No tiene audio ni embed.</div>
              )}
            </div>
          )}
        </aside>
      </section>

      <footer className="footer">
        Hecho con React · Gratis · Subí tu propio audio o links ✨
      </footer>
    </div>
  );
}
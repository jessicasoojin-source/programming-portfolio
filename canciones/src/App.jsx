import { useMemo, useState } from "react";
import "./App.css";
import Logo from "./components/Logo";

const initialSongs = [
  {
    id: 1,
    title: "Golden Hour",
    artist: "JVKE",
    year: 2022,
    genre: "Pop",
    duration: "3:29",
    liked: true,
    spotifyUrl: "https://open.spotify.com/track/4yNk9iz9WVJikRFle3XEvn",
    spotifyEmbed: "https://open.spotify.com/embed/track/4yNk9iz9WVJikRFle3XEvn",
  },
  {
    id: 2,
    title: "As It Was",
    artist: "Harry Styles",
    year: 2022,
    genre: "Pop",
    duration: "2:47",
    liked: false,
    spotifyUrl: "https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP7",
    spotifyEmbed: "https://open.spotify.com/embed/track/4LRPiXqCikLlN15c3yImP7",
  },
];

export default function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [query, setQuery] = useState("");
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [sortBy, setSortBy] = useState("title");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = songs.filter((s) => {
      const match =
        s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
      return match && (onlyLiked ? s.liked : true);
    });

    list.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "artist") return a.artist.localeCompare(b.artist);
      if (sortBy === "year") return b.year - a.year;
      return 0;
    });

    return list;
  }, [songs, query, onlyLiked, sortBy]);

  const toggleLike = (id) => {
    setSongs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)),
    );
  };

  const addSong = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") || "").trim();
    const artist = String(fd.get("artist") || "").trim();
    const year = Number(fd.get("year") || 0) || new Date().getFullYear();
    const genre = String(fd.get("genre") || "").trim() || "—";
    const duration = String(fd.get("duration") || "").trim() || "—";

    if (!title || !artist) return;

    setSongs((prev) => [
      { id: Date.now(), title, artist, year, genre, duration, liked: false },
      ...prev,
    ]);
    e.currentTarget.reset();
  };

  const likedCount = songs.filter((s) => s.liked).length;

  return (
    <div className="page">
      <header className="top">
        <div className="brand">
          <Logo />
          <div>
            <h1>Canciones</h1>
            <p className="sub">
              {songs.length} total · {likedCount} favoritas
            </p>
          </div>
        </div>

        <div className="controls">
          <input
            className="input"
            placeholder="Buscar por título o artista…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="input select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Orden: Título</option>
            <option value="artist">Orden: Artista</option>
            <option value="year">Orden: Año</option>
          </select>

          <label className="check">
            <input
              type="checkbox"
              checked={onlyLiked}
              onChange={(e) => setOnlyLiked(e.target.checked)}
            />
            Solo favoritas
          </label>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Agregar canción</h2>
          <form className="form" onSubmit={addSong}>
            <input className="input" name="title" placeholder="Título *" />
            <input className="input" name="artist" placeholder="Artista *" />

            <div className="row">
              <input className="input" name="year" placeholder="Año" />
              <input
                className="input"
                name="duration"
                placeholder="Duración (3:12)"
              />
            </div>

            <input className="input" name="genre" placeholder="Género" />
            <button className="btn" type="submit">
              Agregar
            </button>
          </form>
          <p className="hint">* obligatorio</p>
        </section>

        <section className="card">
          <h2>Lista</h2>

          {filtered.length === 0 ? (
            <p className="empty">No hay resultados.</p>
          ) : (
            <ul className="list">
              {filtered.map((s) => (
                <li key={s.id} className="item">
                  <div className="meta">
                    <div className="title">{s.title}</div>
                    <div className="detail">
                      {s.artist} · {s.year} · {s.genre} · {s.duration}
                    </div>
                  </div>
                  <div className="actions">
                    <a
                      className="open"
                      href={s.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  </div>

                  {s.spotifyEmbed && (
                    <div className="embed">
                      <iframe
                        src={s.spotifyEmbed}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`${s.title} spotify`}
                      />
                    </div>
                  )}

                  <button
                    className={`like ${s.liked ? "on" : ""}`}
                    onClick={() => toggleLike(s.id)}
                    aria-label="Favorito"
                    title="Favorito"
                  >
                    {s.liked ? "♥" : "♡"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="footer">
        Minimal + dark + pastel · hecho con React ✨
      </footer>
    </div>
  );
}

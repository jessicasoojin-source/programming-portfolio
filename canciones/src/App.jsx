import { useMemo, useState } from "react";
import "./App.css";

const initialSongs = [
  { id: 1, title: "Golden Hour", artist: "JVKE", year: 2022, genre: "Pop", duration: "3:29", liked: false },
  { id: 2, title: "As It Was", artist: "Harry Styles", year: 2022, genre: "Pop", duration: "2:47", liked: false },
  { id: 3, title: "Blinding Lights", artist: "The Weeknd", year: 2019, genre: "Synthpop", duration: "3:20", liked: false },
];

export default function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [query, setQuery] = useState("");
  const [onlyLiked, setOnlyLiked] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return songs.filter((s) => {
      const match = s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
      const likedOk = onlyLiked ? s.liked : true;
      return match && likedOk;
    });
  }, [songs, query, onlyLiked]);

  const toggleLike = (id) => {
    setSongs((prev) => prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)));
  };

  return (
    <div className="page">
      <header className="top">
        <h1>🎧 Canciones</h1>

        <div className="controls">
          <input
            className="input"
            placeholder="Buscar por título o artista…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <label className="check">
            <input type="checkbox" checked={onlyLiked} onChange={(e) => setOnlyLiked(e.target.checked)} />
            Solo favoritas
          </label>
        </div>
      </header>

      <main className="card">
        <ul className="list">
          {filtered.map((s) => (
            <li key={s.id} className="item">
              <div>
                <div className="title">{s.title}</div>
                <div className="detail">
                  {s.artist} · {s.year} · {s.genre} · {s.duration}
                </div>
              </div>

              <button className={`like ${s.liked ? "on" : ""}`} onClick={() => toggleLike(s.id)}>
                {s.liked ? "♥" : "♡"}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
import { createContext, useState, useEffect } from "react";
import { useRef } from "react";


export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {

  const [watchlist, setWatchlist] = useState([]);
  const [genreList, setGenreList] = useState([]);

  // ✅ Load from localStorage (on first load)
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  // ✅ Save to localStorage (whenever updated)
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // 🎬 Fetch genres
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=d5d47df625a83c3b961980c4616e58f5`)
      .then(res => res.json())
      .then(data => setGenreList(data.genres || []))
      .catch(() => setGenreList([]));
  }, []);

  // ❤️ Toggle watchlist
 const toggleWatchlist = (movie) => {
  setWatchlist((prev) => {
    const exists = prev.some((m) => m.id === movie.id);

    if (exists) {
      return prev.filter((m) => m.id !== movie.id);
    } else {
      return [...prev, movie];
    }
  });
};

const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // ❌ skip first save
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}, [watchlist]);

  return (
    <WatchListContext.Provider value={{ watchlist, toggleWatchlist, genreList }}>
      {children}
    </WatchListContext.Provider>
  );
};
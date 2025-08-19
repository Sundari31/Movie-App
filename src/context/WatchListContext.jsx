import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext()

export const WatchListProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([])
    const [genreList, setGenreList] = useState([])

    useEffect(() =>{
    
      let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=d5d47df625a83c3b961980c4616e58f5`
   
      fetch(url)
      .then((response) => response.json())
      .then((data) => setGenreList(data.genres || []))
    }, [])

    const toggleWatchlist = (movie) => {
        const index = watchlist.findIndex((m) => m.id === movie.id)

        if (index === -1) {
            setWatchlist([...watchlist, movie])
        } else {
            setWatchlist([...watchlist.slice(0, index),
            ...watchlist.slice(index + 1)
            ])
        }
    }

    return (
        <WatchListContext.Provider value={{ watchlist, toggleWatchlist, genreList }}>
            {children}
        </WatchListContext.Provider>
    )
}
import React, { useContext, useState } from 'react'
import GenreFilter from '../components/GenreFilter'
import { WatchListContext } from '../context/WatchListContext'
import Moviecard from '../components/Moviecard'

const Watchlist = () => {

  const { watchlist, genreList } = useContext(WatchListContext)

  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const filteredMovies = watchlist
    .filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((movie) =>
      !selectedGenre || movie.genre_ids.includes(Number(selectedGenre))
    )

  return (
    <div className="bg-black min-h-screen text-white px-4 pt-24">

      {/* 🎬 Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
         My Watchlist
      </h1>

      {/* 🔍 Search + 🎯 Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search in watchlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 rounded bg-gray-800 border border-gray-600 
          focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Genre Filter */}
        <GenreFilter
          genreList={genreList}
          setSelectedGenre={setSelectedGenre}
        />

      </div>

      {/* 🎬 Movies */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {filteredMovies.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No movies in your watchlist
          </p>
        )}

        {filteredMovies.map(movie => (
          <Moviecard key={movie.id} movie={movie} />
        ))}

      </div>

    </div>
  )
}

export default Watchlist
import React, { useContext, useState } from 'react'
import GenreFilter from '../components/GenreFilter'
import { WatchListContext } from '../context/WatchListContext'
import Moviecard from '../components/Moviecard'
import { FaHeart, FaSearch } from 'react-icons/fa'

const Watchlist = () => {
  const { watchlist, genreList } = useContext(WatchListContext)
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const filteredMovies = watchlist
    .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
    .filter((movie) => !selectedGenre || movie.genre_ids.includes(Number(selectedGenre)))

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white" style={{ fontFamily: "'Georgia', serif" }}>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-10 pt-24 sm:pt-28 pb-16">

        {/* Page header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaHeart className="text-red-500" size={18} />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Watchlist
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10
              text-white/40 text-xs font-bold">
              {watchlist.length}
            </span>
          </div>
          <p className="text-white/30 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
            Movies you've saved to watch later
          </p>
        </div>

        {/* Search + Filter bar */}
        {watchlist.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10">
            <div className="relative flex-1 sm:max-w-sm">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={13} />
              <input
                type="text"
                placeholder="Search your watchlist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                  text-white text-sm placeholder-white/25 focus:outline-none focus:ring-2
                  focus:ring-red-500/50 focus:border-red-500/40 hover:border-white/20 transition"
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
            </div>
            <GenreFilter genreList={genreList} setSelectedGenre={setSelectedGenre} />
          </div>
        )}

        {/* Empty watchlist */}
        {watchlist.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
              <FaHeart className="text-white/20" size={28} />
            </div>
            <h2 className="text-xl font-bold text-white/50 mb-2">Your watchlist is empty</h2>
            <p className="text-white/25 text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
              Browse movies and click the heart icon to save them here
            </p>
          </div>
        )}

        {/* No filter results */}
        {watchlist.length > 0 && filteredMovies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">🔍</span>
            <p className="text-white/40 font-semibold">No matches found</p>
            <p className="text-white/20 text-sm mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>
              Try adjusting your search or genre filter
            </p>
          </div>
        )}

        {/* Movie Grid */}
        {filteredMovies.length > 0 && (
          <>
            {(search || selectedGenre) && (
              <p className="text-white/30 text-xs mb-4" style={{ fontFamily: "system-ui, sans-serif" }}>
                Showing {filteredMovies.length} of {watchlist.length} movies
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {filteredMovies.map((movie) => (
                <Moviecard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Watchlist

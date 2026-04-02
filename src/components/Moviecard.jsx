import React, { useContext, useState } from 'react'
import { FaPlay, FaHeart, FaRegHeart, FaStar } from "react-icons/fa"
import { WatchListContext } from '../context/WatchListContext'

const Moviecard = ({ movie, onPlay }) => {
  const { toggleWatchlist, watchlist } = useContext(WatchListContext)
  const inWatchList = watchlist.some((m) => m.id === movie.id)
  const [imgError, setImgError] = useState(false)

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
  const year = movie.release_date ? movie.release_date.split("-")[0] : ""

  return (
    <div className="group relative cursor-pointer rounded-xl overflow-hidden bg-[#111]
      shadow-lg hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)] transition-all duration-400
      hover:-translate-y-1">

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imgError && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] text-white/20 text-sm">
            No Image
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm
          px-2 py-0.5 rounded-md text-xs font-bold">
          <FaStar className="text-amber-400" size={9} />
          <span className="text-white">{rating}</span>
        </div>

        {/* Watchlist button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWatchlist(movie) }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
            backdrop-blur-sm border transition-all duration-200 opacity-0 group-hover:opacity-100
            ${inWatchList
              ? "bg-red-600/90 border-red-500 text-white"
              : "bg-black/60 border-white/20 text-white/60 hover:text-red-400 hover:border-red-400"}`}
        >
          {inWatchList ? <FaHeart size={10} /> : <FaRegHeart size={10} />}
        </button>

        {/* Play button — center on hover */}
        {onPlay && (
          <div className="absolute inset-0 flex items-center justify-center
    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button
              onClick={() => onPlay(movie.id, movie.title)}
              className="w-12 h-12 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center
        justify-center shadow-xl hover:bg-red-500 hover:scale-110 transition-all duration-200
        border-2 border-white/20 pointer-events-auto"
            >
              <FaPlay className="text-white ml-0.5" size={14} />
            </button>
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-bold text-sm leading-tight line-clamp-2">{movie.title}</p>
          <p className="text-white/50 text-xs mt-0.5">{year}</p>
        </div>
      </div>

      {/* Below-card title (visible always on mobile) */}
      <div className="p-2 sm:hidden">
        <p className="text-white text-xs font-semibold line-clamp-1">{movie.title}</p>
        <p className="text-white/40 text-[10px]">{year}</p>
      </div>

    </div>
  )
}

export default Moviecard

import React, { useContext } from 'react'
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa"
import { WatchListContext } from '../context/WatchListContext'

const Moviecard = ({ movie, onPlay }) => {

    const { toggleWatchlist, watchlist } = useContext(WatchListContext)

    const inWatchList = watchlist.some((m) => m.id === movie.id)

    return (
        <div className="relative group cursor-pointer">

            {/* Poster */}
            <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-lg 
    group-hover:scale-110 transition duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent 
  opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"></div>

            {/* Info */}
            <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                <p className="text-gray-300 text-sm">{movie.release_date}</p>

                {/* Buttons */}
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={() => onPlay(movie.id, movie.title)}
                        className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                        ▶ Play
                    </button>

                    <button
                        onClick={() => toggleWatchlist(movie)}
                        className="bg-gray-700 px-3 py-1 rounded text-sm"
                    >
                        {inWatchList ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Moviecard
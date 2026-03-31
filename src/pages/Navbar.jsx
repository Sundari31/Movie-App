import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { WatchListContext } from '../context/WatchListContext'
import { FaHeart, FaSearch } from "react-icons/fa"

const Navbar = ({ onSearch }) => {

  const { watchlist } = useContext(WatchListContext)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <nav className="fixed w-full z-50 flex justify-between items-center px-6 py-4 
    bg-gradient-to-b from-black via-black/80 to-transparent text-white">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-red-600">
        MovieFlix
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* 🔍 Search */}
        <div className="flex items-center gap-2">

          {showSearch && (
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => onSearch(e.target.value)}
              className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          )}

          <FaSearch
            className="cursor-pointer hover:scale-110 transition"
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>

        {/* ❤️ Watchlist */}
        <Link to="/watchlist" className="relative">
          <FaHeart className="text-red-500 text-xl" />
          <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 py-0.5 rounded-full">
            {watchlist.length}
          </span>
        </Link>

      </div>

    </nav>
  )
}

export default Navbar
import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { WatchListContext } from '../context/WatchListContext'
import { FaHeart, FaSearch, FaTimes } from "react-icons/fa"

const Navbar = ({ onSearch }) => {
  const { watchlist } = useContext(WatchListContext)
  const [showSearch, setShowSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value)
    onSearch(e.target.value)
  }

  const clearSearch = () => {
    setSearchVal("")
    onSearch("")
    setShowSearch(false)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}>
            <span className="text-white">CINE</span>
            <span className="text-red-500">FLUX</span>
          </span>
          <span className="hidden sm:block h-4 w-px bg-red-500/50" />
          <span className="hidden sm:block text-[10px] text-white/30 uppercase font-semibold">
            Stream
          </span>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className={`overflow-hidden transition-all duration-300 ${showSearch ? "w-40 sm:w-64 opacity-100" : "w-0 opacity-0"}`}>
              <div className="relative">
                <input
                  type="text"
                  value={searchVal}
                  placeholder="Search movies..."
                  onChange={handleSearchChange}
                  autoFocus={showSearch}
                  className="w-full pl-3 pr-7 py-1.5 rounded-lg bg-white/8 border border-white/15
                    text-black text-sm placeholder-white/30 focus:outline-none focus:border-black
                    focus:bg-white/12 transition-all"
                />
                {searchVal && (
                  <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition">
                    <FaTimes size={10} />
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => { setShowSearch(!showSearch); if (showSearch) clearSearch() }}
              className="p-2 rounded-lg hover:bg-white/8 transition text-white/60 hover:text-white"
            >
              {showSearch ? <FaTimes size={15} /> : <FaSearch size={15} />}
            </button>
          </div>

          {/* Watchlist */}
          <Link
            to="/watchlist"
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm font-semibold
              ${location.pathname === "/watchlist"
                ? "bg-red-600 border-red-500 text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"}`}
          >
            <span className="hidden sm:inline text-xs tracking-wide">Watchlist</span>
            {watchlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold
                w-4 h-4 rounded-full flex items-center justify-center border border-[#0a0a0a]">
                {watchlist.length > 9 ? "9+" : watchlist.length}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar

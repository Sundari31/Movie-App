import React, { useEffect, useState } from 'react'
import Moviecard from '../components/Moviecard'
import TrailerModal from "../components/TrailerModal"
import { FaPlay, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Home = ({ search }) => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [videoKey, setVideoKey] = useState(null)
  const [heroIndex, setHeroIndex] = useState(0)

useEffect(() => {
  setPage(1)
}, [search])

  const handlePlay = async (id, title) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5d47df625a83c3b961980c4616e58f5`
      )
      const data = await res.json()
      const video =
        data.results?.find(v => v.type === "Trailer" && v.site === "YouTube") ||
        data.results?.find(v => v.type === "Teaser" && v.site === "YouTube") ||
        data.results?.find(v => v.site === "YouTube")
      if (video) {
        setVideoKey(video.key)
      } else {
        window.open(`https://www.youtube.com/results?search_query=${title} trailer`, "_blank")
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true)
      setError(false)
      let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=d5d47df625a83c3b961980c4616e58f5`
      if (search) url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=d5d47df625a83c3b961980c4616e58f5`
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results || [])
          setHeroIndex(0)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }, 500)
    return () => clearTimeout(delayDebounce)
  }, [page, search])

  const heroMovie = movies[heroIndex] || null
  const heroMovies = movies.slice(0, 5)

  // Pagination helper
  const getPageNumbers = () => {
    const pages = []
    for (let i = -2; i <= 2; i++) {
      const p = page + i
      if (p > 0) pages.push(p)
    }
    return pages
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      {!loading && !error && heroMovie && (
        <div className="relative w-full h-[55vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">

          {/* Backdrop */}
          <img
            key={heroMovie.id}
            src={`https://image.tmdb.org/t/p/original/${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className="w-full h-full object-cover object-top transition-all duration-700"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end pb-10 sm:pb-16 px-4 sm:px-10 lg:px-16 max-w-screen-2xl mx-auto">
            <div className="max-w-xl">

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  <FaStar size={11} />
                  {heroMovie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-white/50 text-xs">
                  {heroMovie.release_date?.split("-")[0]}
                </span>
                <span className="px-2 py-0.5 rounded bg-red-600/30 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                  Popular
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
                {heroMovie.title}
              </h1>

              {/* Overview */}
              <p className="text-white/60 text-sm sm:text-base leading-relaxed line-clamp-2 mb-6 max-w-md"
                style={{ fontFamily: "system-ui, sans-serif" }}>
                {heroMovie.overview}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePlay(heroMovie.id, heroMovie.title)}
                  className="flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-red-600
                    hover:bg-red-500 transition-all duration-200 font-bold text-sm sm:text-base shadow-lg
                    hover:shadow-red-600/30 active:scale-95"
                >
                  <FaPlay size={12} />
                  Play Trailer
                </button>
                <button
                  onClick={() => setHeroIndex((heroIndex + 1) % heroMovies.length)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20
                    border border-white/10 transition font-semibold text-sm active:scale-95"
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>

          {/* Hero thumbnails (desktop) */}
          <div className="absolute bottom-8 right-6 sm:right-10 hidden lg:flex gap-2">
            {heroMovies.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setHeroIndex(i)}
                className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === heroIndex ? "border-red-500 scale-105" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92/${m.poster_path}`}
                  alt={m.title}
                  className="w-12 h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-10 pb-16">

        {/* Section heading */}
        <div className="flex items-center justify-between py-6 sm:py-8">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-red-500 rounded-full" />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {search ? `Results for "${search}"` : "Popular Now"}
            </h2>
          </div>
          {!search && (
            <span className="text-white/30 text-xs font-semibold uppercase tracking-widest">
              Page {page}
            </span>
          )}
        </div>

        {/* States */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">⚠️</span>
            <p className="text-white/50 text-lg font-semibold">Failed to load movies</p>
            <p className="text-white/25 text-sm mt-1">Check your connection or API key</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🎬</span>
            <p className="text-white/50 text-lg font-semibold">No movies found</p>
            <p className="text-white/25 text-sm mt-1">Try a different search term</p>
          </div>
        )}

        {/* Movie Grid */}
        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {movies.map((movie) => (
              <Moviecard key={movie.id} movie={movie} onPlay={handlePlay} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!search && !loading && movies.length > 0 && (
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-10 sm:mt-12 flex-wrap">

            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                disabled:opacity-25 hover:bg-white/10 hover:border-white/20 transition active:scale-95"
            >
              <FaChevronLeft size={12} className="text-white/70" />
            </button>

            {getPageNumbers().map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-150 active:scale-95 ${page === p
                    ? "bg-red-600 border border-red-500 text-white shadow-lg shadow-red-900/30"
                    : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(prev => prev + 1)}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                hover:bg-white/10 hover:border-white/20 transition active:scale-95"
            >
              <FaChevronRight size={12} className="text-white/70" />
            </button>

          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {videoKey && (
        <TrailerModal videoKey={videoKey} onClose={() => setVideoKey(null)} />
      )}
    </div>
  )
}

export default Home
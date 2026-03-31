import React, { useEffect, useState } from 'react'
import Moviecard from '../components/Moviecard'
import TrailerModal from "../components/TrailerModal"
import Navbar from './Navbar'
const Home = () => {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [videoKey, setVideoKey] = useState(null)

  // 🔍 Handle Search from Navbar
  const handleSearch = (value) => {
    setSearch(value)
    setPage(1)
  }

  // 🎬 Trailer Play
  const handlePlay = async (id, title) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d5d47df625a83c3b961980c4616e58f5`
      )

      const data = await res.json()

      let video =
        data.results?.find(v => v.type === "Trailer" && v.site === "YouTube") ||
        data.results?.find(v => v.type === "Teaser" && v.site === "YouTube") ||
        data.results?.find(v => v.site === "YouTube")

      if (video) {
        setVideoKey(video.key)
      } else {
        window.open(
          `https://www.youtube.com/results?search_query=${title} trailer`,
          "_blank"
        )
      }

    } catch (err) {
      console.error(err)
    }
  }

  // 🎬 Fetch Movies
  useEffect(() => {

    const delayDebounce = setTimeout(() => {

      setLoading(true)
      setError(false)

      let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=d5d47df625a83c3b961980c4616e58f5`

      if (search) {
        url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=d5d47df625a83c3b961980c4616e58f5`
      }

      fetch(url)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results || [])
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })

    }, 500)

    return () => clearTimeout(delayDebounce)

  }, [page, search])

  return (
    <div className='bg-black min-h-screen text-white'>

      {/* 🔝 Navbar */}
      <Navbar onSearch={handleSearch} />

      <div className='p-4 pt-20'>

        {/* 🎬 Hero Section */}
        {movies.length > 0 && (
          <div className="relative h-[60vh] mb-10">

            <img
              src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent rounded-lg" />

            <div className="absolute bottom-10 left-6">
              <h1 className="text-4xl font-bold">
                {movies[0].title}
              </h1>

              <button
                onClick={() => handlePlay(movies[0].id, movies[0].title)}
                className="mt-4 bg-red-600 px-5 py-2 rounded hover:bg-red-700"
              >
                ▶ Play Trailer
              </button>
            </div>

          </div>
        )}

        {/* 🎬 Movies */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-2">

          {loading && (
            <p className="text-center col-span-full">Loading movies...</p>
          )}

          {error && (
            <p className="text-red-500 text-center col-span-full">
              Failed to fetch movies
            </p>
          )}

          {!loading && !error && movies.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">
              No movies found
            </p>
          )}

          {!loading && !error && movies.map(movie => (
            <Moviecard
              key={movie.id}
              movie={movie}
              onPlay={handlePlay}
            />
          ))}

        </div>

        {/* 📄 Pagination */}
        {!search && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

            {/* PREV */}
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40 hover:bg-gray-700"
            >
              ◀
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(5)].map((_, i) => {
              const pageNumber = page - 2 + i

              if (pageNumber <= 0) return null

              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNumber)}
                  className={`px-3 py-1 rounded ${page === pageNumber
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                    }`}
                >
                  {pageNumber}
                </button>
              )
            })}

            {/* NEXT */}
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
            >
              ▶
            </button>

          </div>
        )}

      </div>

      {/* 🎬 Trailer Modal */}
      {videoKey && (
        <TrailerModal
          videoKey={videoKey}
          onClose={() => setVideoKey(null)}
        />
      )}

    </div>
  )
}

export default Home
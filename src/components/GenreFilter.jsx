import React from "react"

const GenreFilter = ({ genreList, setSelectedGenre }) => {
  return (
    <div className="relative">
      <select
        className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10
          text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
          hover:border-white/20 transition cursor-pointer min-w-[160px]"
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{ colorScheme: "dark" }}
      >
        <option value="">All Genres</option>
        {genreList.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      {/* Custom arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default GenreFilter

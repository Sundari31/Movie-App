import React from "react"

const GenreFilter = ({genreList, setSelectedGenre}) => {

  return (
   <>
   <select
  className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white 
  focus:outline-none focus:ring-2 focus:ring-red-500"
  onChange={(e) => setSelectedGenre(e.target.value)}
>
    <option value="">All Genres</option>
    {genreList.map((genre) => {
        return (
            <option key={genre} value={genre.id}>{genre.name}</option>
        )
    })}
   </select>
   </>
  )
}

export default GenreFilter
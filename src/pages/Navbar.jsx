import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { WatchListContext } from '../context/WatchListContext'

const Navbar = () => {

const {watchlist} = useContext(WatchListContext)

  return (
   <nav className='bg-gray-900 p-4 text-white flex justify-between fixed w-full z-10'>
    <Link className='text-xl font-bold' to="/">Movie App</Link>
    <Link className='text-xl' to="/watchlist">Watchlist({watchlist.length})</Link>
   </nav>
  )
}

export default Navbar

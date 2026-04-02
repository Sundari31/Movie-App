import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import { WatchListProvider } from './context/WatchListContext'

function App() {
  const [count, setCount] = useState(0)
    const [search, setSearch] = useState("")

  return (
    <>
    <WatchListProvider>
      <BrowserRouter>
      <Navbar onSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home search={search} />}></Route>
        <Route path='/watchlist' element={<Watchlist search={search} />}></Route>
      </Routes>
      </BrowserRouter>
    </WatchListProvider>
    </>
  )
}

export default App

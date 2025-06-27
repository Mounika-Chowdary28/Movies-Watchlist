import './App.css'
import Navbar from './components/Navbar'
import Movies from './components/Movies'
import Watchlist from './components/Watchlist'
import Banner from './components/Banner'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
  const [watchlist,setwatchlist]=useState([])

  let HandleWatchlist=(movieObj)=>{
    let newwatchlist=[...watchlist,movieObj]
    localStorage.setItem('movies' , JSON.stringify(newwatchlist))
    setwatchlist(newwatchlist)
    console.log(newwatchlist)
  }

  let RemoveWatchlist=(movieObj)=>{
    let fwl=watchlist.filter((movie)=>{
      return movie.id!=movieObj.id
    })
    setwatchlist(fwl)
     localStorage.setItem('movies', JSON.stringify(fwl));
    console.log(fwl)
  }
  
  useEffect(() => {
  let MoviesFromls = localStorage.getItem('movies');
  if (!MoviesFromls) return;
  setwatchlist(JSON.parse(MoviesFromls));
}, []);


  return(
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<><Banner/><Movies HandleWatchlist={HandleWatchlist} RemoveWatchlist={RemoveWatchlist} watchlist={watchlist}/></>}/>
    <Route path='/Watchlist' element={<Watchlist watchlist={watchlist} setwatchlist={setwatchlist} RemoveWatchlist={RemoveWatchlist} />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

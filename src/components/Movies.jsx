import { useEffect, useState } from "react"
import axios from "axios";
import Card from "./Card"
import Pagination from "./Pagination";
function Movies({HandleWatchlist,RemoveWatchlist,watchlist}){

    const [Movies,setMovies]=useState([])
    const [pageNo,setpageNo]=useState(1)

    const pagePrev=()=>{
        if(pageNo==1)
            setpageNo(1)
        else
        setpageNo(pageNo-1)
    }
    const pageNext=()=>{
        setpageNo(pageNo+1)
    }
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cc06206b5277cc03f3b5c0bf32dc3c72&language=en-US&page=${pageNo}`).then(function(res){
            setMovies(res.data.results)
        })
    },[pageNo])
    return(
        <div className="p-5">
            <div className="text-2xl m-5 font-bold text-center">
                Trending Movies
            </div>

            <div className="flex flex-row flex-wrap justify-around gap-8">
            {Movies.map((MovieObj)=>{
                return <Card key={MovieObj.id} MovieObj={MovieObj} poster_path={MovieObj.poster_path} name={MovieObj.original_title} HandleWatchlist={HandleWatchlist} RemoveWatchlist={RemoveWatchlist} watchlist={watchlist} />
            })}
            
            </div>
            <Pagination pageNo={pageNo} pagePrev={pagePrev} pageNext={pageNext} />
        </div>

    )
}

export default Movies

//https://api.themoviedb.org/3/movie/popular?api_key=cc06206b5277cc03f3b5c0bf32dc3c72&language=en-US&page=1
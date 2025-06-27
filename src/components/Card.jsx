function Card({ poster_path, name, HandleWatchlist,MovieObj,RemoveWatchlist,watchlist}) {
  
    function contain(MovieObj){
        for(let i=0;i<watchlist.length;i++){
            if(watchlist[i].id==MovieObj.id){
                return true
            }
        }
        return false
    }

  return (
    <div>
      <div
        className="h-[40vh] w-[175px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-end items-center relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
        }}
      >
        {contain(MovieObj)?<div onClick={()=>RemoveWatchlist(MovieObj)} className="absolute top-0 right-0 m-4 text-white text-xl bg-gray-900/60 h-7 w-7 rounded-lg">&#10060;</div>:<div onClick={()=>HandleWatchlist(MovieObj)} className="absolute top-0 right-0 m-4 text-white text-xl bg-gray-900/60 h-7 w-7 rounded-lg">
          &#129505;
        </div> }
        

        {/* Movie name */}
        <div className="text-white text-xl w-full p-2 text-center">
          {name}
        </div>
      </div>
    </div>
  );
}

export default Card;

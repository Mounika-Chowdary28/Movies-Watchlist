
function Pagination({pagePrev,pageNext,pageNo}){
    return(
        <div className="bg-gray-400 p-4 mt-8 flex justify-center">
            <div onClick={pagePrev} className="px-8">
                <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div className="font-bold">{pageNo}</div>
            <div onClick={pageNext} className="px-8">
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    )
}

export default Pagination
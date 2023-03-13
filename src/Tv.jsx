import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Tv() {

  const [trendingTv, setTrendingTv] = useState([]);
  let nums = new Array(20).fill(1).map((ele , index) => index+1);


  async function getTrending(pageNumber) {
    let {data} = await  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=c73c7153f601e122d35a46d43dbd6eca&language=en-US&sort_by=popularity.desc&page=${pageNumber}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
    setTrendingTv(data.results)
  }

  useEffect(()=>{
    getTrending(1);
  } , []);

  return (
    <div>
      {trendingTv ?<div className="row mt-5 justify-content-center">
      
      {trendingTv.map((tv , i)=> <div key={i} className='col-md-3'>
        <div className="tv">
  
          <Link to={`/tvdetails/${tv.id}`}>
        <img className='w-100' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
          <h3 className='h6 my-2'>{tv.name}</h3>        
          </Link>
  
        </div>
      </div>)}
  
      </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
      </div> }
      


      <nav aria-label="..." className='py-5'>
  <ul className="pagination pagination-sm d-flex justify-content-center">
    {
      nums.map((pageNum) => <li onClick={()=> getTrending(pageNum)} key={pageNum}  className="page-item"><a className="page-link bg-transparent text-white">{pageNum}</a></li>
      )
    }
    
  </ul>
</nav>
    </div>
  )
}

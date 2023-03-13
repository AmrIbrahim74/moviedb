import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(mediaType , callback) {
    let {data} = await  axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c73c7153f601e122d35a46d43dbd6eca`);
    callback(data.results.slice(0,10))
  }

  useEffect(()=>{
    getTrending('movie' , setTrendingMovies)
    getTrending('tv' , setTrendingTv)
    getTrending('person' , setTrendingPeople)
  } , []);

  return (
    <>
    
    <div className="row mt-5">
      <div className="col-md-4">
        
        <div className="brdr w-25 mb-4"></div>
        <h2 className=' h3 py-3' >Trending <br />Movies <br />to Watch Now</h2>
        <p className=' text-muted'>Most watched movies by days</p>
        <div className="brdr mt-4"></div>
      </div>
    {trendingMovies.map((movie , i)=> <div key={i} className='col-md-2'>
      <div className="movie">

        <Link to={`/moviedetails/${movie.id}`}>
      <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        <h3 className='h6 my-2'>{movie.title}</h3>        
        </Link>

      </div>
    </div>)}

    </div>


    
    <div className="row mt-5 py-5">
      <div className="col-md-4">
        
        <div className="brdr w-25 mb-4"></div>
        <h2 className=' h3 py-3' >Trending <br />Tv Shows <br />to Watch Now</h2>
        <p className=' text-muted'>Most watched tv shows by days</p>
        <div className="brdr mt-4"></div>
      </div>
    {trendingTv.map((tv , i)=> <div key={i} className='col-md-2'>
      <div className="tv">
      <Link to={`/tvdetails/${tv.id}`}>
        <img className='w-100' src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
        <h3 className='h6 my-2'>{tv.name}</h3>
        </Link>
      </div>
    </div>)}

    </div>

    
    <div className="row mt-5 py-5">
      <div className="col-md-4">
        
        <div className="brdr w-25 mb-4"></div>
        <h2 className=' h3 py-3' >Trending <br />People <br />to Watch Now</h2>
        <p className=' text-muted'>Most watched people by days</p>
        <div className="brdr mt-4"></div>
      </div>
    {trendingPeople.map((person , i)=> <div key={i} className='col-md-2'>
      <div className="person">
        <img className='w-100' src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" />
        <h3 className='h6 my-2'>{person.name}</h3>
      </div>
    </div>)}

    </div>
    </>
  )
}

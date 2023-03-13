import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {

    let params = useParams();
    
    const [movieDetails, setMovieDetails] = useState(null);


    async function getMovieDetails(id) {
        let {data} =await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c73c7153f601e122d35a46d43dbd6eca&language=en-US`);
        setMovieDetails(data);
    }

    useEffect(()=> {
        getMovieDetails(params.id);
    }, [])

  return (
    <div>
        {movieDetails?
        <div className="row my-5">
            <div className="col-md-3">
                <img className='w-100' src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="" />
            </div>
            <div className="col-md-9">
                <h2>{movieDetails.title}</h2>
                <p className='text-muted py-3'>{movieDetails.overview}</p>
                <ul>
                    <li>Budget : {movieDetails.budget}</li>
                    <li>Vote : {movieDetails.vote_average}</li>
                    <li>Popularity : {movieDetails.popularity}</li>
                    <li>Vote Count : {movieDetails.vote_count}</li>
                    <li>Language : {movieDetails.original_language}</li>
                    <li>Homepage : {movieDetails.homepage}</li>
                    
                </ul>
            </div>
        </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>}
    </div>
  )
}

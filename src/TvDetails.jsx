import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function TvDetails() {
    let params = useParams();
    const [tvDetails, setTvDetails] = useState(null);

    async function getTvDetails(id) {
        let {data} =await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=c73c7153f601e122d35a46d43dbd6eca&language=en-US`);
        setTvDetails(data);
    }

    useEffect(() => {
        getTvDetails(params.id);
    } , [])


  return (
    <div>
        {tvDetails?
        <div className="row my-5">
            <div className="col-md-3">
                <img className='w-100' src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`} alt="" />
            </div>
            <div className="col-md-9">
                <h2>{tvDetails.name}</h2>
                <p className='text-muted py-3'>{tvDetails.overview}</p>
                <ul>
                    <li>Budget : {tvDetails.budget}</li>
                    <li>Vote : {tvDetails.vote_average}</li>
                    <li>Popularity : {tvDetails.popularity}</li>
                    <li>Vote Count : {tvDetails.vote_count}</li>
                    <li>Language : {tvDetails.original_language}</li>
                    <li>Homepage : {tvDetails.homepage}</li>
                    
                </ul>
            </div>
        </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
            <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>}
    </div>
  )
}

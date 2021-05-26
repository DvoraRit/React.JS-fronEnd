import React , {useEffect, lazy, Suspense} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Utils from '../Utils'
import {useState} from 'react'
const MovieComp = lazy(()=>import ('./movie'))


export default function MoviesComp ()
{
    const [moviesState, setMovies] = useState([]);

    useEffect (async()=>
    {
        let movies = await Utils.getAllMoviesFromFB();
        setMovies(movies);
    },[])
  
    let items =  moviesState.map((element,index) => {
        return <MovieComp Data={element} key={index}/>
    });
    
    return(
        <div>
         <h3>Movies</h3>
            <Button>Add Movie</Button>
      
            <Suspense fallback={<div>Loading...</div>}>
                {items}
            </Suspense>
        </div>
    )
}

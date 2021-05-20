import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Utils from '../Utils'
import {useState} from 'react'
import MovieComp from './movie'




export default function MoviesComp ()
{
    const [showMovies, setShowMovies] = useState('none');
    const [moviesState, setMovies] = useState([]);

    const showAllMovies= async(e) =>
    {
        e.preventDefault();//to prevent refreshing the page 
        setShowMovies("block");
        
        let movies = await Utils.getAllMoviesFromFB();
       // let lessMovies = movies.slice(1,10);
        setMovies(movies);
        console.log(movies);
    }
    //let lessMovies = moviesState.slice(1,10);
    //console.log(lessMovies);
    let items =  moviesState.map((element,index) => {
        return <MovieComp Data={element} key={index}/>
    });
    
    return(
        <div>
         <h3>Movies</h3>
         <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={e=>showAllMovies(e)}>All Movies</Button>
            <Button>Add Movie</Button>
         </ButtonGroup>
             <div style={{display:showMovies}}>
             showing Movies
                {items}
            </div>
        </div>
    )
}

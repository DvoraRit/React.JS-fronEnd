import React, {useState, createContext} from 'react'

//Create context object

export const MoviesContext = createContext();

export const MoviesContextProvider = props =>
{
    const [movies,setMovies] = useState([]);

    return (
        <MoviesContext.Provider value={[movies,setMovies]}>
            
            {props.children}

        </MoviesContext.Provider>
    )

}

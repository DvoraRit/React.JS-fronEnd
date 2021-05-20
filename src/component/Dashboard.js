import React, { useState, lazy, Suspense, useContext } from "react"
import { Card, Button, Alert, Navbar, Nav, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contex/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Utils from '../Utils'
import {MoviesContext} from '../contex/MovieContext'
const MovieComp = lazy(()=>import ('./movie'))

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const [showMovies, setShowMovies] = useState('block')
    
    //const [movies,setMovies] = useContext(MoviesContext)
    const [movies, setMovies] = useState([])
    const history = useHistory()
  
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }

    const showAllMovies= async(e) =>
    {
        e.preventDefault();//to prevent refreshing the page 
        setShowMovies("block");
        
        let movies = await Utils.getAllMoviesFromFB();
        setMovies(movies);
    }
    
    console.log(movies)
    let tenItems = movies.slice(0,20);
    let items =  tenItems.map((element,index) => {
            return <MovieComp Data={element} key={index}/>
    });
  
    return (
       <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Hello {currentUser.email}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/" onClick={showAllMovies}>Movies</Nav.Link>
                <Nav.Link href="Subscriptions">Subscriptions</Nav.Link>
                <Nav.Link href="/update-profile">Update Profile</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
        </Navbar>

            <Suspense fallback={<div>Loading...</div>}>
                <div>
                    {items}
                </div>
            </Suspense>
      </>
    )
  }
  
import React, { useState, lazy, Suspense, useContext, useEffect } from "react"
import { Card, Button, Alert, Navbar, Nav, Form, FormControl } from "react-bootstrap"
import { useAuth } from "../contex/AuthContext"
import { Link, Route, useHistory, Switch } from "react-router-dom"
import Utils from '../Utils'
import firebase from '../firebaseApp'
import {MoviesContext} from '../contex/MovieContext'
import MembersComp from './Members'
import MoviesComp from './movies'
import {useRoutes} from 'hookrouter'
const MovieComp = lazy(()=>import ('./movie'))
const routes ={
  "/movies" :() => <MoviesComp/>,
  "/Members" : () =><MembersComp/>
}

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const match = useRoutes(routes)
    
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }

    return (
       <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Hello {currentUser.email}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/movies">Movies</Nav.Link>
                <Nav.Link href="/Users">User Management</Nav.Link>
                <Nav.Link href="/Members">Members</Nav.Link>
                <Nav.Link href="/update-profile">Update Profile</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
        </Navbar>

        <Switch>
              <Route path="/movies" component={MoviesComp} />
              <Route path="/Members" component={MembersComp} />
        </Switch>
      </>
    )
  }
  
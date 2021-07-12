import React, { useState, lazy} from "react"
import { Navbar, Nav} from "react-bootstrap"
import { useAuth } from "../contex/AuthContext"
import {useHistory, Switch,Route, Router } from "react-router-dom"
import MembersComp from './Members'
import MoviesComp from './movies'
import PrivateRoute from "./PrivateRoute"
import UpdateProfile from './UpdateProfile'
import {useRoutes} from 'hookrouter'
import {AuthProvider} from '../contex/AuthContext'
import LoadingGif from './LoadingGif'

export default function Dashboard(props) {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    
    async function handleLogout() {
      setError("")
      try {
        await logout()
        history.push("/")
      } catch {
        setError("Failed to log out")
      }
    }

    return (
       <>
       <div className="Dashbord">
       <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Hello {currentUser.email}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={`${props.match.url}/movies`}>Movies</Nav.Link>
                <Nav.Link href={`${props.match.url}/Members`}>Members</Nav.Link>
                <Nav.Link href="/Users">User Management</Nav.Link>
                <Nav.Link href={`${props.match.url}/update-profile`}>Update Profile</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
                <Nav.Link href={`${props.match.url}/Loading`}>Loading</Nav.Link>
            </Nav>
        </Navbar>  

        <Switch>
          <Route path={`${props.match.url}/Members`} component={MembersComp}/>
            <Route path={`${props.match.url}/movies`} component={MoviesComp} />
            <Route path={`${props.match.url}/Loading`} component={LoadingGif} />
            <PrivateRoute path={`${props.match.url}/update-profile`} component={UpdateProfile} />
        </Switch>         
       </div>
      </>
    )
  }
  
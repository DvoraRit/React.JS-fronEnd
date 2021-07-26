import React, { useState} from "react"
import { Navbar, Nav} from "react-bootstrap"
import Paper from '@material-ui/core/Paper';
import { useAuth } from "../contex/AuthContext"
import {useHistory, Switch,Route } from "react-router-dom"
import MembersComp from './Members'
import MoviesComp from './movies'
import UpdateProfile from './UpdateProfile'
import Image from "../img/moviesBG.jpg"


const styles = {
  paperContainer: {
      height:3450,
      width:'auto',
      backgroundImage: `url(${Image})`
  }
};

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
       <Paper style={styles.paperContainer}>
       <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/Dashbord">Hello {currentUser.email}</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href={`${props.match.url}/movies`}>Movies</Nav.Link>
                <Nav.Link href={`${props.match.url}/Subscriptions`}>Subscriptions</Nav.Link>
                <Nav.Link href={`${props.match.url}/update-profile`}>Update Profile</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
            </Nav>
        </Navbar>  
    
        <Switch>
          <Route path={`${props.match.url}/Subscriptions`} component={MembersComp}/>
            <Route path={`${props.match.url}/movies`} component={MoviesComp} />
            <Route path={`${props.match.url}/update-profile`} component={UpdateProfile} />
        </Switch> 
      </Paper>
    </>
    )
  }
  
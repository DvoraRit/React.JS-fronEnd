import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contex/AuthContext"

// this private route is wraps the regular route.
//if the user logout (currentUser ==null) goto login page - else go to Dashbord page with all props 
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

import './App.css';
import { Container } from "react-bootstrap"
import SignUp from './component/Signup'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {AuthProvider} from './contex/AuthContext'
import Dashboard from "./component/Dashboard"
import Login from './component/logIn'
import PrivateRoute from "./component/PrivateRoute"
import ForgotPassword from './component/ForgotPassword'
import UpdateProfile from './component/UpdateProfile'
import {useRoutes} from 'hookrouter'
import MembersComp from './component/Members'
import MoviesComp from './component/movies'

const routes ={
  "/login" : () => <Login/>,
  "/forgot-password" : () => <ForgotPassword/>,
  "/SignUp" : () => <SignUp/>,
  "/id*" : () => <Dashboard/>
}


function App() {
  const match = useRoutes(routes)
  /*  

  */
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{height:"100vh"}} >

                  <AuthProvider>
                      <Switch>
                         <Route exact path="/" component={Login} />
                          <Route path="/forgot-password" component={ForgotPassword} />
                          <Route path="/SignUp" component={SignUp} />
                          <PrivateRoute  path="/Dashbord" component={Dashboard} />
                      </Switch>
                  </AuthProvider>
               
        </div>
    </Container>
    
  );
}

export default App;

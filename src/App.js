
import './App.css';
import { Container } from "react-bootstrap"
import SignUp from './component/Signup'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {AuthProvider} from './contex/AuthContext'
import Dashboard from "./component/Dashboard"
import Login from './component/logIn'
import PrivateRoute from "./component/PrivateRoute"
import ForgotPassword from './component/ForgotPassword'
import LargeMovieImg from './component/LargeMovieImg'

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{height:"100vh"}} >

                  <AuthProvider>
                      <Switch>
                         <Route exact path="/" component={Login} />
                         <Route exact path="/login" component={Login} />
                          <Route path="/forgot-password" component={ForgotPassword} />
                          <Route path="/SignUp" component={SignUp} />
                          <Route path="/LargeImage" component={LargeMovieImg} />
                          <PrivateRoute  path="/Dashbord" component={Dashboard} />
                      </Switch>
                  </AuthProvider>
               
        </div>
    </Container>
  );
}

export default App;

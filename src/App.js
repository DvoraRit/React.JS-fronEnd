
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

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{height:"100vh"}} >
          <Router>
              <AuthProvider>
                  <Switch>
                      <Route path="/SignUp" component={SignUp} />
                      <PrivateRoute exact path="/" component={Dashboard} />
                      <Route path="/login" component={Login} />
                      <Route path="/forgot-password" component={ForgotPassword} />
                      <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  </Switch>
              </AuthProvider>
        </Router>
      </div>
    </Container>
    
  );
}

export default App;

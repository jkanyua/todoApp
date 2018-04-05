import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <AppBar />
        </div>
        <Router>
          <div>
            <h2>
              {
                this.props.isLoggedIn &&
                <Link to="/login" onClick={() => console.log('TODO: Logout')}>LogOut</Link> 
              }
            </h2>
            <hr/>
            <Route path="/login" component={Login} />
            <Route path='/register' component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from './Auth/Login'
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
            <Route exact path="/" component={<div />}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/register" component={<div />}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

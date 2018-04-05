import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

import { login } from './AuthRedux'

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
    email:'',
    password:'',
  }
  this.handleClick = this.handleClick.bind(this)
  this.handleRequestClose = this.handleRequestClose.bind(this)
 }
 componentDidMount(){
   this.props.location.search && this.setState({hasLoggedOut: true})
 }
 static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.error){
     return Object.assign({}, prevState, {error: nextProps.error })
   }
   return prevState
 }

handleClick(event){
  if(!this.state.email || !this.state.password) {
    this.setState({error: 'Email and Password should not be empty'})
    return
  }
  this.props.login(
    {
      email: this.state.email,
      password: this.state.password
    }
  ).then(() =>{
    if(this.props.isLoggedIn) {
      this.props.history.push('/')
    }
  })
}

handleRequestClose() {
  this.setState({
    error: false,
    hasLoggedOut: false
  });
};

render() {
  const divStyle = {
    margin: '0 auto',
    width: '344px',
    textAlign: 'center',
  };
    return (
      <div style={divStyle}>
      <br /><br />
        <Card>
        <br /><br />
          <h2>Login</h2>
          <div>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/><br />
            <RaisedButton label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>
            <br/><br />
            Don't have an account? <Link to="/register" >Sign Up</Link> here!<br /><br />
            </div>
            </Card>
            <Snackbar
              open={this.state.error || this.state.hasLoggedOut ? true : false}
              message={this.state.error ? `Login Error: ${this.state.error}` : 'Successfully Logged Out!'}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestedAt: state.auth.requestedAt,
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';

import { register } from './AuthRedux'

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      confirmPassword: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

 static getDerivedStateFromProps(nextProps, prevState){
   if(nextProps.error){
     return Object.assign({}, prevState, {error: nextProps.error })
   }
   return prevState
 }

handleClick(event){
  if(!this.state.password || !this.state.confirmPassword || !this.state.email){
    this.setState({error: 'Password, Confirm Password & Email fields cannot be empty.'})
  } else if(this.state.password === this.state.confirmPassword) {
    this.props.register(
      {
        email: this.state.email,
        password: this.state.password
      }
    ).then(() =>{
      if(this.props.registered) {
        this.props.history.push('/login')
      }
    }) 
  } else {
    this.setState({error: 'Password and Confirm Password fields are not similar.'})
  }
}

handleRequestClose() {
  this.setState({
    error: false,
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
          <br />
          <h2>Register</h2>
            <br />
            <div>
              <TextField
                hintText="Enter your Email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email: newValue})}
              />
              <br/>
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password: newValue})}
              />
              <br />
              <TextField
                type="password"
                hintText="Confirm your Email"
                floatingLabelText="Confirm Password"
                onChange = {(event,newValue) => this.setState({confirmPassword: newValue})}
              />
              <br/>
              <br/><br />
              <RaisedButton label="Submit" primary={true} style={{margin: 15}} onClick={(event) => this.handleClick(event)}/>
              <br/><br />
              Already have an account? <Link to="/login" >Login</Link> here!<br /><br />
            </div>
          </Card>
          <Snackbar
          open={this.state.error ? true : false}
          message={`Register Error: ${this.state.error}`}
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
    registered: state.auth.registered
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { Card } from 'material-ui/Card';

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
  username:'',
  password:''
  }
  this.handleClick = this.handleClick.bind(this)
 }
handleClick(event){
  console.log(event)
}
render() {
  const divStyle = {
    margin: '0 auto',
    width: '344px',
    textAlign: 'center',
  };
    return (
      <div style={divStyle}>
        <Card>
        <h2>Login</h2>
          <div>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/><br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            <br/><br />
            Don't have an account? <Link to="/register" >Sign Up</Link> here!<br /><br />
          </div>
          </Card>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;
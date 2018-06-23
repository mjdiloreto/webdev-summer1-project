import React from 'react';
import UserService from "../services/UserService";
import {Redirect} from "react-router-dom";


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  login() {
    UserService.instance.login({username: this.state.username, password: this.state.password})
      .then(users => {
        if(!users.length) {
          alert("There is no user with that username and password.");
        } else {
          this.setState({loggedIn: true});
          this.props.userChanged(users[0]);
        }
      })
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    if(this.state.loggedIn) {
      this.setState({loggedIn: false});
      return <Redirect to={"/profile"}/>
    }

    return (
      <div className="container-fluid">
        <h1>Login</h1>

        <input placeholder="username" className="form-control"
               onChange={(event) => this.updateForm({username: event.target.value})}/>
        <input placeholder="password" type="password" className="form-control"
               onChange={(event) => this.updateForm({password: event.target.value})}/>
        <button onClick={() => this.login()} className="btn btn-primary btn-block">Login</button>

      </div>);
  }
}
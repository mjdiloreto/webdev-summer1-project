import React from 'react';
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";


export default class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordVerify: '',
      registered: false
    };
  }

  register() {
    if(this.state.password !== this.state.passwordVerify) {
      alert("Passwords must match to register.");
      return;
    }

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.usernameTaken(user.username)
      .then(taken => {
        if(taken.length !== 0) {
          alert("That username is taken.")
        } else {
          UserService.instance.register(user)
            .then(() => this.setState({registered: true}))
            .catch(response => alert(response));
        }
      });
  }

  usernameTaken(username) {
    return UserService.instance.findUserByUsername(username);
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    if(this.state.registered) {
      this.setState({registered: false});
      return <Redirect to={"/profile"}/>
    }

    return (
      <div className="container-fluid">
        <h1>Register</h1>

        <input placeholder="username" className=" form-control"
               onChange={(event) => this.updateForm({username: event.target.value})}/>
        <input type="password" placeholder="password" className=" form-control"
               onChange={(event) => this.updateForm({password: event.target.value})}/>
        <input type="password" placeholder="password" className=" form-control"
               onChange={(event) => this.updateForm({passwordVerify: event.target.value})}/>
        <button onClick={() => this.register()} className="btn btn-primary btn-block">Register</button>

      </div>);
  }
}
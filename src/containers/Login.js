import React from 'react';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  login() {
    console.log("loggin in");
    console.log(this.state.username);
    console.log(this.state.password);
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Login</h1>

        <input placeholder="username" className=" form-control"
               onChange={(event) => this.updateForm({username: event.target.value})}/>
        <input placeholder="password" className=" form-control"
               onChange={(event) => this.updateForm({password: event.target.value})}/>
        <button onClick={() => this.login()} className="btn btn-primary btn-block">Login</button>

      </div>);
  }
}
import React from 'react';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordVerify: ''
    };
  }

  register() {
    console.log("registering");
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.passwordVerify);
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Register</h1>

        <input placeholder="username" className=" form-control"
               onChange={(event) => this.updateForm({username: event.target.value})}/>
        <input placeholder="password" className=" form-control"
               onChange={(event) => this.updateForm({password: event.target.value})}/>
        <input placeholder="password" className=" form-control"
               onChange={(event) => this.updateForm({passwordVerify: event.target.value})}/>
        <button onClick={() => this.register()} className="btn btn-primary btn-block">Register</button>

      </div>);
  }
}
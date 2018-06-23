import React from 'react';
import UserService from "../services/UserService";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    UserService.instance.profile().then(user => {
      this.setState({user: user})
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <p>{this.state.user.username}</p>
        <p>{this.state.user.password}</p>
      </div>
    );
  }
}
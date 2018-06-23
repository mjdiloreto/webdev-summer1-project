import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PhotoContainer from "./PhotoContainer";
import TitleBar from "./TitleBar";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      currentUser: {}
    };
  }

  userChanged(user) {
    this.setState({currentUser: user});
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <TitleBar currentUser={this.state.currentUser}/>

          <Route exact path="/search"
                 component={PhotoContainer}/>
          <Route exact path="/login"
                 render={routeProps => <Login {...routeProps} userChanged={this.userChanged.bind(this)}/>}/>
          <Route exact path="/register"
                 render={routeProps => <Register {...routeProps} userChanged={this.userChanged.bind(this)}/>}/>
          <Route exact path="/profile"
                 component={Profile}/>
        </div>
      </Router>
    );
  }
}


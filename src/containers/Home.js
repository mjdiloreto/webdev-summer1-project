import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PhotoContainer from "./PhotoContainer";
import TitleBar from "./TitleBar";
import Login from "./Login";
import Register from "./Register";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    };
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <TitleBar/>

          <Route exact path="/search"
                 component={PhotoContainer}/>
          <Route exact path="/login"
                 component={Login}/>
          <Route exact path="/register"
                 component={Register}/>
          <Route exact path="/profile"
                 component={TitleBar}/>
        </div>
      </Router>
    );
  }
}


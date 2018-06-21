import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PhotoContainer from "./PhotoContainer";
import SearchBar from "../components/SearchBar";
import TitleBar from "./TitleBar";

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
        </div>
      </Router>
    );
  }
}


import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PhotoContainer from "./PhotoContainer";
import SearchBar from "../components/SearchBar";

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
          <nav className="navbar navbar-dark bg-primary">
            <Link to="/" className="text-white navbar-brand container-fullwidth">Yelper Helper</Link>
            <div className="nav-item float-left">
              <SearchBar ></SearchBar>
            </div>
          </nav>

          <Route exact path="/search"
                 component={PhotoContainer}/>
        </div>
      </Router>
    );
  }
}


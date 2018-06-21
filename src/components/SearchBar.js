import React from 'react'
import {Redirect} from "react-router-dom";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      search: false
    };
  }

  render() {
    if(this.state.search) {
      this.setState({search: false});
      return <Redirect to={'/search' + "?term=" + this.state.term + "&location=" + this.state.location}/>
    }

    return (
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Food Item" aria-label="Search"
          onChange={(event) => this.setState({term: event.target.value})}/>
        <input className="form-control mr-sm-2" type="search" placeholder="Location" aria-label="Search"
          onChange={(event) => this.setState({location: event.target.value})}/>
        <button className="btn btn-outline-secondary my-2 my-sm-0" type="button"
          onClick={() => this.setState({search: true})}>Search</button>
      </form>
    );
  }
}
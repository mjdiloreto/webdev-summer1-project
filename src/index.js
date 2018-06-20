import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import PhotoContainer from "./containers/PhotoContainer";
import Home from "./containers/Home";

// {/*<PhotoContainer term={"Coffee"} location={"Boston"}/>,*/}

ReactDOM.render(
  <Home/>,
  document.getElementById('root')
);
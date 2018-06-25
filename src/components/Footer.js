import React from 'react';


export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar navbar-fixed-bottom">
        <span className="text-muted">Created By Matthew DiLoreto</span>
        <small className="text-muted float-right">June, 2018</small>
      </div>
    )
  }
}
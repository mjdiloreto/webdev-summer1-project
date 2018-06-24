import React from 'react';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{padding: "10px"}}>
        <img src={this.props.src} alt={this.props.alt} style={{width: 150, height: 150}}/>
      </div>
    )
  }
}
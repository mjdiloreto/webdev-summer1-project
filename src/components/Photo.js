import React from 'react';

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      alt: props.alt
    }
  }

  render() {
    return (
      <div style={{padding: "10px"}}>
        <img src={this.state.src} alt={this.state.alt} style={{width: 150, height: 150}}/>
      </div>
    )
  }
}
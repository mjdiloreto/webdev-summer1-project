import React from 'react'
import YelpService from "../services/YelpService";

export default class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: this.props.match.params.businessId,
      business: {}
    };
  }

  componentDidMount() {
    YelpService.instance.searchBusinessById(this.state.businessId)
      .then(business => this.setState({business: business}));
  }

  render() {
    return (
      <div className="container-fluid">
        <p>Business works</p>
        <p>{this.state.businessId}</p>
        <p>{JSON.stringify(this.state.business)}</p>
      </div>
    );
  }
}
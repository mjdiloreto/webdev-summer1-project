import React from 'react'
import YelpService from "../services/YelpService";
import {PhotoCard} from "../components/PhotoCard";
import Photo from "../components/Photo";

export default class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: this.props.match.params.businessId,
      business: {}
    };
  }

  componentWillMount() {
    YelpService.instance.searchBusinessById(this.state.businessId)
      .then(business => this.setState({business: business}));
  }

  render() {
    if(!this.state.business.name) {
      return <div></div>;
    }

    return (
      <div className="container-fluid">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">{this.state.business.name}</h1>
            <p className="lead text-muted">Phone: {this.state.business.display_phone}</p>
            <p className="lead text-muted">Yelp rating: {this.state.business.rating}</p>
            <p className="lead text-muted"><a href={this.state.business.url}>Visit their Yelp page</a></p>
            {/*<Photo src={this.state.business.image_url} alt={this.state.business.image_url}/>*/}
            <p>
              <button className="btn btn-secondary my-2">Write a review</button>
              <button className="btn btn-outline-success my-2"><i className="fa fa-thumbs-up"/></button>
              <button className="btn btn-outline-danger my-2"><i className="fa fa-thumbs-down"/></button>
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container row">

            {this.state.business.photos.map(photo =>
              <PhotoCard src={photo} price={this.state.business.price} alt={photo}/>)}
          </div>
        </div>
      </div>
    );
  }
}
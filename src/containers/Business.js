import React from 'react'
import YelpService from "../services/YelpService";
import BusinessService from "../services/BusinessService";
import PhotoCard from "../components/PhotoCard";

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

  like() {
    BusinessService.instance.likeBusiness(this.state.businessId)
  }

  dislike() {
    BusinessService.instance.dislikeBusiness(this.state.businessId)
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
            <p className="lead text-muted">Price: {this.state.business.price}</p>
            <p className="lead text-muted">Yelp rating: {this.state.business.rating}</p>
            <p className="lead text-muted"><a href={this.state.business.url}>Visit their Yelp page</a></p>
            {/*<Photo src={this.state.business.image_url} alt={this.state.business.image_url}/>*/}
            <p>
              <button className="btn btn-secondary my-2">Write a review</button>
              <button onClick={() => this.like()} className="btn btn-outline-success my-2">
                <i className="fa fa-thumbs-up"/>
              </button>
              <button onClick={() => this.dislike()} className="btn btn-outline-danger my-2">
                <i className="fa fa-thumbs-down"/>
              </button>
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container row">

            {this.state.business.photos.map((photo, index) =>
              <PhotoCard key={index} src={photo} price={this.state.business.price}
                         alt={photo} businessId={this.state.businessId}
                         currentUser={this.props.currentUser}/>)}
          </div>
        </div>
      </div>
    );
  }
}
import React from 'react'
import YelpService from "../services/YelpService";
import BusinessService from "../services/BusinessService";
import PhotoCard from "../components/PhotoCard";
import Redirect from "react-router-dom/es/Redirect";
import ReviewCard from "../components/ReviewCard";

export default class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: this.props.match.params.businessId,
      business: {},
      redirectToReview: false,
      reviews: []
    };
  }

  componentWillMount() {
    YelpService.instance.searchBusinessById(this.state.businessId)
      .then(business => this.setState({business: business}));

    BusinessService.instance.findBusinessById(this.state.businessId)
      .then(businesses => {
        if(businesses.length !== 0) {
          let business = businesses[0];
          console.log(business.reviews)
          this.setState({reviews: business.reviews})
        }
      });
  }

  like() {
    BusinessService.instance.likeBusiness(this.state.business)
  }

  dislike() {
    BusinessService.instance.dislikeBusiness(this.state.business)
  }

  redirectToReview() {
    this.setState({redirectToReview: true});
  }

  render() {
    if(!this.state.business.name) {
      return <div></div>;
    }

    if(this.state.redirectToReview) {
      return <Redirect to={"/business/" + this.state.businessId + "/review"}/>
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
            <p>
              <button className="btn btn-secondary my-2" onClick={() => this.redirectToReview()}>Write a review</button>
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container row">
            {this.state.business.photos.map((photo, index) =>
              <PhotoCard key={index} src={photo} price={this.state.business.price}
                         alt={photo} businessId={this.state.businessId}
                         business={this.state.business}
                         currentUser={this.props.currentUser}/>)}
          </div>
          <div className="container row">
            {this.state.reviews.map((review, index) => (
              <ReviewCard review={review} key={index}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
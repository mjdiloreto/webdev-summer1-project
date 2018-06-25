import React from 'react'
import YelpService from "../services/YelpService";
import BusinessService from "../services/BusinessService";
import PhotoCard from "../components/PhotoCard";
import Redirect from "react-router-dom/es/Redirect";
import ReviewCard from "../components/ReviewCard";
import PhotoCarousel from "../components/PhotoCarousel";
import PhotoService from "../services/PhotoService";
import ReviewService from "../services/ReviewService";

export default class PopularContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      photos: []
    };
  }

  componentWillMount() {
    PhotoService.instance.findPopularPhotos().then(photos => this.setState({photos: photos}));
    ReviewService.instance.findRecentReviews().then(reviews => this.setState({reviews: reviews}));
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Welcome to Yelper Helper!</h1>
            <p className="lead">
              This website let's you search Yelp for images first, instead of having to search businesses and then
              find images from there.
            </p>
            <p className="lead">
              Start by searching for some coffee in your home town!
            </p>
          </div>
        </section>

        <div className="container-fluid row">
          <div className="row">
            <div className="col-6">
              <h1>Popular Photos</h1>
              <PhotoCarousel photos={this.state.photos}/>
            </div>
            <div className="col-6">
              <h1>Recent Reviews</h1>
              {this.state.reviews.map((review, index) => {
                return <ReviewCard key={index} review={review} business={true}/>
              })}
            </div>
          </div>
        </div>

      </div>
    )
  }
}
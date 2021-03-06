import React from 'react';
import BusinessService from "../services/BusinessService";
import ReviewService from "../services/ReviewService";
import {Redirect} from "react-router-dom";

export default class ReviewCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {username: ''},
      business: {name: ''},
      redirectToBusiness: false
    }
  }

  componentWillMount() {
    ReviewService.instance.findUserOfReview(this.props.review).then(user => {
      if(user.username) {
        this.setState({user: user})
      }
    }).then(() => {
      if(this.props.business) {
        ReviewService.instance.findBusinessOfReview(this.props.review).then(business => {
          if(business.name) {
            this.setState({business: business})
          }
        });
      }
    });
  }

  ratingToOpinion(opinion) {
    switch(opinion) {
      case "VERYHIGH":
        return "Very positive";
      case "HIGH":
        return "Positive";
      case "MEDIUM":
        return "Neutral";
      case "LOW":
        return "Negative";
      case "VERYLOW":
        return "Very negative";
      default:
        return "MEDIUM"
    }
  }

  render() {

    if(this.state.redirectToBusiness) {
      return <Redirect to={"/business/" + this.state.business.id}/>
    }

    return (
        <div className="card mb-4 box-shadow">
          <p className="card-img-top" style={{padding: 10}}>{this.props.review.text}</p>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              {/*<div className="btn-group">*/}
                {/*<button type="button" className="btn btn-sm btn-outline-secondary"*/}
                        {/*onClick={() => this.like()}>*/}
                  {/*<i className="fa fa-thumbs-up"/></button>*/}
                {/*<button type="button" className="btn btn-sm btn-outline-secondary"*/}
                        {/*onClick={() => this.dislike()}>*/}
                  {/*<i className="fa fa-thumbs-down"/></button>*/}
              {/*</div>*/}
              <small className="text-muted">{this.state.user.username}</small>
              <small className="text-muted">{this.ratingToOpinion(this.props.review.opinion)}</small>
              {this.props.business && <btn className="btn text-muted"
                onClick={() => this.setState({redirectToBusiness: true})}>{this.state.business.name}</btn>}
            </div>
          </div>
        </div>
    )
  }
}

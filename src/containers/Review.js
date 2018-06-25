import React from 'react'
import BusinessService from "../services/BusinessService";
import {Link, Redirect} from "react-router-dom";
import YelpService from "../services/YelpService";

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessId: this.props.match.params.businessId,
      business: {},
      opinion: 0,
      text: '',
      redirectToBusiness: false,
      redirectToLogin: false
    };
  }

  componentWillMount() {
    YelpService.instance.searchBusinessById(this.state.businessId)
      .then(business => this.setState({business: business}));
  }

  createReview() {
    return BusinessService.instance.createReviewForBusiness(
      {opinion: this.opinionToRating(this.state.opinion), text: this.state.text},
      this.state.business).then(response => {
        if(response.status === 401) {
          this.setState({redirectToLogin: true});
        } else {
          this.setState({redirectToBusiness: true});
        }
    });
  }

  opinionToRating(opinion) {
    switch(opinion) {
      case "Very positive":
        return "VERYHIGH";
      case "Positive":
        return "HIGH";
      case "Neutral":
        return "MEDIUM";
      case "Negative":
        return "LOW";
      case "Very Negative":
        return "VERYLOW";
      default:
        return "MEDIUM"
    }
  }

  render() {
    if(this.state.redirectToLogin) {
      return <Redirect to="/login"/>
    }

    if(this.state.redirectToBusiness) {
      return <Redirect to={"/business/"+ this.state.businessId}/>
    }

    return (
      <div className="container-fluid">
        <form>
          <div className="form-group">
            <label for="exampleFormControlSelect1">How was your experience?</label>
            <select className="form-control" id="exampleFormControlSelect1"
              value={this.state.opinion}
              onChange={(e) => this.setState({opinion: e.target.value})}>
              <option>Very positive</option>
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
              <option>Very negative</option>
            </select>
          </div>
          
          <div className="form-group">
            <label for="exampleFormControlTextarea1">Write your thoughts</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
              onChange={(e) => this.setState({text: e.target.value})}/>
          </div>

          <button type="button" className="btn btn-outline-success"
            onClick={() => this.createReview()}>
            Post Review
          </button>
            <Link type="button" className="btn btn-danger" to={"/business/" + this.state.businessId}>Cancel</Link>
        </form>
      </div>
    );
  }
}
import React from 'react';
import YelpService from '../services/YelpService';
import sleep from '../util';
import Photo from "../components/Photo";
import Paginator from "../components/Paginator";
import queryString from 'query-string';

// 8*3=24 is divisible many ways so will probably look good
const PAGE_LENGTH = 8;

export default class PhotoContainer extends React.Component {

  constructor(props) {
    super(props);

    const query_params = queryString.parse(this.props.location.search);

    this.state = {
      businesses: [],
      photos: [],
      pageLength: PAGE_LENGTH,
      term: query_params.term,
      location: query_params.location
    }
  }

  componentDidMount() {
    this.setSearchedBusinesses(this.state.term, this.state.location)
      .then(() => this.generatePageTurners())
      .then(() => this.pageOne());
  }

  oldMount() {
    YelpService.instance.searchBusinesses("Coffee", "Boston, Ma")
      .then(businesses =>
        businesses.map(business => {
            YelpService.instance.searchPhotosForBusiness(business.id)
              .then(photos => {
                  this.setState({photos: this.state.photos.concat(photos)})
                }
              );

            sleep(200); // Wait 200ms to prevent 423 error from yelp.
          }
        )
      )
  }

  setSearchedBusinesses(query, location) {
    return YelpService.instance.searchBusinesses(query, location)
      .then(businesses => this.setState({businesses: businesses}));
  }

  setPhotos(business) {
    return YelpService.instance.searchPhotosForBusiness(business.id)
      .then(photos => this.setState({photos: this.state.photos.concat(photos)}));
  }

  wipePhotos() {
    this.setState({photos: []});
  }

  page(page_size, page_number) {
    this.wipePhotos();

    for (let i = page_size * page_number; i < page_size * page_number + page_size; i++) {
      if(i >= this.state.businesses.length) {
        return;
      }

      let business = this.state.businesses[i];
      this.setPhotos(business);
      sleep(200);
    }
  }

  pageOne() {
    this.page(this.state.pageLength, 0);
  }

  pageTwo() {
    this.page(this.state.pageLength, 1);
  }

  generatePageTurners() {

    // How many pages will there be?
    let num_turners = Math.ceil(this.state.businesses.length / this.state.pageLength);
    console.log("num turn")
    console.log(num_turners)

    let turners = [];
    for (let i = 0; i < num_turners; i++) {
      turners.push(() => {
        console.log("running");
        this.page(this.state.pageLength, i)
      });
    }

    return turners.map(fun => fun.bind(this));
  }

  render() {
    return (
      <div className="container-fluid">

        {this.state.businesses.length !== 0 && <Paginator page_turners={this.generatePageTurners()}/>}

        <ul>
          {this.state.photos.map((photoUrl, index) =>
            (photoUrl != "" + {} && // The api responds with this if the queries are too fast.
              <li key={index} style={{display: "inline-block"}}>
                <Photo src={photoUrl} alt={photoUrl}/>
              </li>)
          )}
        </ul>
      </div>
    )
  }
}
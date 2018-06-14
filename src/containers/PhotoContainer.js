import React from 'react';
import YelpService from '../services/YelpService';
import sleep from '../util';

export default class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        <ul>
          {this.state.photos.map((photoUrl, index) =>
            <li key={index}>
              <img src={photoUrl} alt={photoUrl}/>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
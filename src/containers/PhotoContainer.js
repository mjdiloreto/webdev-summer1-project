import React from 'react';
import YelpService from '../services/YelpService';
import sleep from '../util';
import Photo from "../components/Photo";
import Paginator from "../components/Paginator";

export default class PhotoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      page: 0
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

  pageOne() {
    console.log("page one");
  }

  pageTwo() {
    console.log("page two");
  }

  render() {
    return (
      <div className="container-fluid">

        <Paginator page_turners={[this.pageOne.bind(this), this.pageTwo.bind(this)]}/>

        {/*<ul>*/}
          {/*{this.state.photos.map((photoUrl, index) =>*/}
            {/*(photoUrl != "" + {} && // The api responds with this if the queries are too fast.*/}
              {/*<li key={index} style={{display: "inline-block"}}>*/}
                {/*<Photo src={photoUrl} alt={photoUrl}/>*/}
              {/*</li>)*/}
          {/*)}*/}
        {/*</ul>*/}
      </div>
    )
  }
}
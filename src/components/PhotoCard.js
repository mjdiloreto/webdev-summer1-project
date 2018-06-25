import React from 'react';
import PhotoService from "../services/PhotoService";
import {Redirect} from "react-router-dom";

export default class PhotoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: {},
      redirectToLogin: false,
    }
  }

  componentDidMount() {
    PhotoService.instance.findPhotoBySrc(this.props.src)
      .then(photos => {
        photos.length !== 0 ? this.setState({photo: photos[0]}) : null
      });
  }

  like = () => {

    // You need to login!
    if(!this.props.currentUser.id) {
      this.setState({redirectToLogin: true});
      return;
    }

    PhotoService.instance.likePhoto(this.props.src, this.props.businessId)
      .then(photo => this.setState({photo: photo}))
  };

  dislike = () => {
    // You need to login!
    if(!this.props.currentUser.id) {
      this.setState({redirectToLogin: true});
      return;
    }

    PhotoService.instance.dislikePhoto(this.props.src, this.props.businessId)
      .then(photo => this.setState({photo: photo}))
  };

  render() {
    if(this.state.redirectToLogin) {
      this.setState({redirectToLogin: false});
      return <Redirect to="/login"/>
    }

    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img className="card-img-top" src={this.props.src} alt={this.props.alt}/>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary"
                        onClick={() => this.like()}>
                  <i className="fa fa-thumbs-up"/></button>
                <button type="button" className="btn btn-sm btn-outline-secondary"
                        onClick={() => this.dislike()}>
                  <i className="fa fa-thumbs-down"/></button>
              </div>
              <small className="text-muted"><i className="fa fa-thumbs-up"/> {this.state.photo.likes || 0}</small>
              <small className="text-muted"><i className="fa fa-thumbs-down"/> {this.state.photo.dislikes || 0}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
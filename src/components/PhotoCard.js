import React from 'react';
import PhotoService from "../services/PhotoService";

export const PhotoCard = ({src, alt, price, businessId}) => {

  const like = () => (
    PhotoService.instance.likePhoto(src, businessId)
  );

  const dislike = () => (
    PhotoService.instance.dislikePhoto(src, businessId)
  );

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" src={src} alt={alt}/>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => like()}>
                <i className="fa fa-thumbs-up"/></button>
              <button type="button" className="btn btn-sm btn-outline-secondary"
                onClick={() => dislike()}>
                <i className="fa fa-thumbs-down"/></button>
            </div>
            <small className="text-muted">{price}</small>
          </div>
        </div>
      </div>
  </div>
  )
}
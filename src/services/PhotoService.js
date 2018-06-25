import { YELPERHELPER_SPRING_ADDRESS } from "../environ/index";
import BusinessService from "./BusinessService";
let _singleton = Symbol();

export default class PhotoService {

  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new PhotoService(_singleton);
    return this[_singleton]
  }

  findPhotoBySrc(src) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo?src=' + src)
      .then(response => response.json())
  }

  _createIfNotExists(src, business) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo?src=' + src)
      .then(response => response.json())
      .then(photos => {
        // There is no photo in my db. I have to let my server know about it
        if (photos.length === 0) {

          return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + business.id + '/photo', {
            method: "POST",
            body: JSON.stringify({src: src}),
            credentials: "include",
            headers: {
              "content-type": "application/json"
            }
          }).then(response => {
            if(response.status === 400) {
              return BusinessService.instance._createIfNotExists(business)
                .then(() => this._createIfNotExists(src, business));  // Try again. Should be no recursion.
            } else {
              return response.json();
            }
          });
        }

        else {
          return photos[0];
        }
      });
  }

  likePhoto(src, business) {
    return this._createIfNotExists(src, business)
      .then(photo => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo/' + photo.id + '/like', {
          method: "POST",
          credentials: "include"
        })
        .then(response => {
          if(response.status === 401) {
            return response;
          }
          return response.json()
        });
      });
  }

  dislikePhoto(src, business) {
    return this._createIfNotExists(src, business)
      .then(photo => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo/' + photo.id + '/dislike', {
          method: "POST",
          credentials: "include"
        })
        .then(response => {
          if(response.status === 401) {
            return response;
          }
          return response.json()
        });
      });
  }

  findPopularPhotos() {
    return fetch(YELPERHELPER_SPRING_ADDRESS + "/api/photo/popular")
      .then(response => response.json());
  }

}
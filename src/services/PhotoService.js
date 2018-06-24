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

  _createIfNotExists(src, businessId) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo?src=' + src)
      .then(response => response.json())
      .then(photos => {
        // There is no photo in my db. I have to let my server know about it
        if (photos.length === 0) {

          return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + businessId + '/photo', {
            method: "POST",
            body: JSON.stringify({src: src}),
            credentials: "include",
            headers: {
              "content-type": "application/json"
            }
          }).then(response => {
            if(response.status === 400) {
              console.log("bad request in _createIfNotExists");
              console.log("creating business " + businessId);
              BusinessService.instance._createIfNotExists({id: businessId})
                .then(() => this._createIfNotExists(src, businessId));  // Try again. Should be no recursion.
            }
            return response.json()
          });
        }

        else {
          return photos[0];
        }
      });
  }

  likePhoto(src, businessId) {
    return this._createIfNotExists(src, businessId)
      .then(photo => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/photo/' + photo.id + '/like', {
          method: "POST",
          credentials: "include"
        });
      });
  }


  dislikePhoto(src, businessId) {
    console.log("disliking photo")
  }

}
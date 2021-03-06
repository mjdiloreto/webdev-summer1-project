import { YELPERHELPER_SPRING_ADDRESS } from "../environ/index";
import YelpService from "./YelpService";
let _singleton = Symbol();

export default class BusinessService {

  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new BusinessService(_singleton);
    return this[_singleton]
  }

  _createIfNotExists(business) {
    if(business.photos) {
      // Spring can't create photos from the urls.
      delete business.photos;
    }
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + business.id)
      .then(response => response.json())
      .then(businesses => {
        if(businesses.length === 0) {
          return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business', {
            method: "POST",
            body: JSON.stringify(business),
            headers: {
              "content-type": "application/json"
            }
          }).then(response => response.json());
        }

        else {
          return businesses[0];
        }
      });
  }

  findBusinessById(businessId) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + businessId)
      .then(response => response.json());
  }

  likeBusiness(business) {
    this._createIfNotExists(business)
      .then(business => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + "/api/business/" + business.id + '/like', {
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

  dislikeBusiness(business) {
    this._createIfNotExists(business)
      .then(business => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + "/api/business/" + business.id + '/dislike', {
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

  createReviewForBusiness(review, business) {
    return this._createIfNotExists(business)
      .then(business => {
        return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + business.id + '/review', {
          method: "POST",
          body: JSON.stringify(review),
          credentials: "include",
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => {
          if(response.status === 401) {
            return response;
          }
          return response.json()
        });
      })
  }

  findInDBOrFromYelp(businessId) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/business/' + businessId)
      .then(response => response.json())
      .then(businesses => {
        if(businesses.length === 0) {
          return YelpService.instance.searchBusinessById(businessId)
        } else {
          return businesses[0];
        }
      });
  }

}
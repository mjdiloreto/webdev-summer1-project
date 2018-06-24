import { YELPERHELPER_SPRING_ADDRESS } from "../environ/index";
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

  likeBusiness(id) {
    console.log("liking business")
  }

  dislikeBusiness(id) {
    console.log("disliking business")
  }

}
import { YELPERHELPER_SPRING_ADDRESS } from "../environ/index";
import YelpService from "./YelpService";
let _singleton = Symbol();

export default class ReviewService {

  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new ReviewService(_singleton);
    return this[_singleton]
  }

  findUserOfReview(review) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/review/' + review.id + '/user')
      .then(response => response.json());
  }

  findBusinessOfReview(review) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + '/api/review/' + review.id + '/business')
      .then(response => response.json());
  }
}
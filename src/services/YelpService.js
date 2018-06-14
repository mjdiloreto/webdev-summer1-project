import { YELPERHELPER_NODE_ADDRESS } from "../environ/index";
let _singleton = Symbol();

export default class YelpService {

  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new YelpService(_singleton);
    return this[_singleton]
  }

  searchBusinesses(term, location) {
    let url = new URL(YELPERHELPER_NODE_ADDRESS + '/api/search/?term=1&location=2');
    url.searchParams.set("term", term);
    url.searchParams.set("location", location);

    return fetch(url).then(response => response.json());
  }

  searchPhotosForBusiness(businessId) {
    let url = new URL(YELPERHELPER_NODE_ADDRESS
      + '/api/business/' + businessId + '/photos');

    return fetch(url).then(response => response.json());
  }
}
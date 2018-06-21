import { YELPERHELPER_SPRING_ADDRESS } from "../environ/index";
let _singleton = Symbol();

export default class UserService {

  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new UserService(_singleton);
    return this[_singleton]
  }

  register(user) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + "/api/user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(response => response.json());
  }

  findUserByUsername(username) {
    return fetch(YELPERHELPER_SPRING_ADDRESS + "/api/user?username=" + username)
      .then(response => response.json())
  }

}
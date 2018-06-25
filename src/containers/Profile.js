import React from 'react';
import UserService from "../services/UserService";
import ReviewCard from "../components/ReviewCard";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      reviews: []
    };
  }

  componentDidMount() {
    UserService.instance.profile().then(user => {
      if(user) {
        this.setState({user: user,
          username: user.username,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          reviews: user.reviews || []
        });

        this.props.userChanged(user);
      }
    });
  }

  update() {
    let user = {
      ...this.state.user,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
    };

    UserService.instance.update(user)
      .then(newUser => this.setState({user: newUser}))
      .catch(() => alert("There was a problem updating the profile information."));
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <div className="container-fluid">
        <label for="usernameField">Username</label>
        <input id="usernameField" className="form-control"
               onChange={(e) => this.updateForm({username: e.target.value})}
               placeholder={this.state.user.username}/>
        <label for="passwordField">Password</label>
        <input id="passwordField" className="form-control"
               onChange={(e) => this.updateForm({password: e.target.value})}
               placeholder={this.state.user.password}/>
        <label for="firstNameField">First Name</label>
        <input id="firstNameField" className="form-control"
               onChange={(e) => this.updateForm({firstName: e.target.value})}
               placeholder={this.state.user.firstName}/>
        <label for="lastNameField">Last Name</label>
        <input id="lastNameField" className="form-control"
               onChange={(e) => this.updateForm({lastName: e.target.value})}
               placeholder={this.state.user.lastName}/>
        <label for="phoneField">Phone Number</label>
        <input id="phoneField" className="form-control"
               onChange={(e) => this.updateForm({phone: e.target.value})}
               placeholder={this.state.user.phone}/>
        <label for="emailField">Email Address</label>
        <input id="emailField" className="form-control"
               onChange={(e) => this.updateForm({email: e.target.value})}
               placeholder={this.state.user.email}/>

        <button className="btn btn-primary btn-block" onClick={() => this.update()}>Update Information</button>

        <div className="container-fluid">
          <h1>Your Reviews</h1>
          <div className="row">
            {this.state.reviews.map((review, index) => {
              return (
                <ReviewCard key={index} review={review} business={true}/>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
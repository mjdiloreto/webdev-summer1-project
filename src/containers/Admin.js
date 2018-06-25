import React from 'react'
import BusinessService from "../services/BusinessService";
import UserService from "../services/UserService";
import PhotoService from "../services/PhotoService";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import ReviewService from "../services/ReviewService";
import ReviewCard from "../components/ReviewCard";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reviews: []
    };
  }

  componentDidMount() {
    UserService.instance.profile().then(user => {
      if(user) {
        this.setState({user: user});
        this.props.userChanged(user);
      }
    });

    UserService.instance.findAllUsers().then(users => this.setState({users: users}));
    ReviewService.instance.findAllReviews().then(reviews => this.setState({reviews: reviews}));
  }

  deleteUser(user) {
    UserService.instance.deleteUser(user).then(() => {
      this.setState({users: this.state.users.filter(u => u.id !== user.id)})
    });
  }

  deleteReview(review) {
    ReviewService.instance.deleteReview(review).then(() => {
      this.setState({reviews: this.state.reviews.filter(u => u.id !== review.id)})
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Users</h1>
        <ul className="list-group">
          {this.state.users.map((user, index) =>
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-sm">
                  <UserDropdown user={user}/>
                </div>
                <div className="col-sm">
                  <button className="btn btn-outline-danger float-right" onClick={() => this.deleteUser(user)}>
                    <i className="fa fa-times"/></button>
                </div>
               </div>
            </li>)}
        </ul>
        <h1>Reviews</h1>
        <ul className="list-group">
          {this.state.reviews.map((review, index) =>
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-sm">
                  <ReviewCard review={review} business={true}/>
                </div>
                <div className="col-sm">
                  <button className="btn btn-outline-danger float-right" onClick={() => this.deleteReview(review)}>
                    <i className="fa fa-times"/></button>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
    );
  }
}

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false
    }
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdown} toggle={() => this.setState({dropdown: !this.state.dropdown})}>
        <DropdownToggle caret>
          {this.props.user.username}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem disabled>password: <div className="float-right">{this.props.user.password}</div></DropdownItem>
          <DropdownItem disabled>First name: <div className="float-right">{this.props.user.firstName}</div></DropdownItem>
          <DropdownItem disabled>Last name: <div className="float-right">{this.props.user.lastName}</div></DropdownItem>
          <DropdownItem disabled>phone: <div className="float-right">{this.props.user.phone}</div></DropdownItem>
          <DropdownItem disabled>email: <div className="float-right">{this.props.user.email}</div></DropdownItem>

        </DropdownMenu>
      </Dropdown>
    );
  }
}
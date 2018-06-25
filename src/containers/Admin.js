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
      reviews: [],
      activeUser: {},
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
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

  createUser() {
    let user = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
    };

    UserService.instance.register(user).then((user) => {
      this.setState({
        users: [...this.state.users, user],
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      })
    });
  }

  updateUser() {
    let user = this.state.activeUser;

    user.username = this.state.username;
    user.password = this.state.password;
    user.firstName = this.state.firstName;
    user.lastName = this.state.lastName;
    user.phone = this.state.phone;
    user.email = this.state.email;

    UserService.instance.updateUser(user)
      .then(user => {
        this.setState({
          users: this.state.users.filter((u) => user.id === u.id ? user : u)
        })
      });
  }

  populateForm(user) {
    this.setState({activeUser: user,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
  }

  updateForm(newState) {
    this.setState(newState);
  }

  renderForm() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
        <tr>
          <th><input onChange={(e) => this.updateForm({username: e.target.value})}
            id="usernameFld" className="form-control" placeholder={this.state.username}/></th>
          <th><input onChange={(e) => this.updateForm({password: e.target.value})}
            id="passwordFld" className="form-control" type="password" placeholder={this.state.password}/></th>
          <th><input onChange={(e) => this.updateForm({firstName: e.target.value})}
            id="firstNameFld" className="form-control" placeholder={this.state.firstName}/></th>
          <th><input onChange={(e) => this.updateForm({lastName: e.target.value})}
            id="lastNameFld" className="form-control" placeholder={this.state.lastName}/></th>
          <th><input onChange={(e) => this.updateForm({phone: e.target.value})}
            id="phoneFld" className="form-control" placeholder={this.state.phone}/></th>
          <th><input onChange={(e) => this.updateForm({email: e.target.value})}
            id="emailFld" className="form-control" placeholder={this.state.email}/></th>
          <td nowrap>
            <i id="createUser" className="fa fa-plus" title="create user"
               style={{cursor: "pointer", fontSize: 30}}
               onClick={() => this.createUser()}/>
            <i id="saveUser" className="fa fa-check" title="save edit"
               style={{cursor: "pointer", fontSize: 30}}
               onClick={() => this.updateUser()}/></td>
        </tr>
        </thead>
      </table>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Users</h1>

        {this.renderForm()}

        <ul className="list-group">
          {this.state.users.map((user, index) =>
            <li key={index} className="list-group-item">
              <div className="row">
                <div className="col-sm">
                  <UserDropdown user={user} clicked={this.populateForm.bind(this)}/>
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
      <Dropdown onClick={() => this.props.clicked(this.props.user)}
                isOpen={this.state.dropdown} toggle={() => this.setState({dropdown: !this.state.dropdown})}>
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
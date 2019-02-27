import React, { Component } from "react";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearInputs = () => {
    this.setState({
      username: "",
      password: "",
      email: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(this.state));
    this.clearInputs();
  };

  render() {
    return (
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <h3>Log In</h3>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
            placeholder="password"
          />
          <input
            onChange={this.handleChange}
            value={this.state.email}
            name="email"
            type="email"
            placeholder="email"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

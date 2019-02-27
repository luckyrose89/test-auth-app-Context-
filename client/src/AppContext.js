import React, { Component } from "react";
import axios from "axios";

const AppContext = React.createContext();

export class AppContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      user: JSON.parse(localStorage.getItem("user")) || {},
      token: localStorage.getItem("token") || ""
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    return axios.get("http://localhost:5000/api/todo").then(response => {
      this.setState({ todos: response.data });
      return response;
    });
  };

  addTodo = newTodo => {
    return axios
      .post("http://localhost:5000/api/todo/", newTodo)
      .then(response => {
        this.setState(prevState => {
          return { todos: [...prevState.todos, response.data] };
        });
        return response;
      });
  };

  editTodo = (todoId, todo) => {
    return axios
      .put(`http://localhost:5000/api/todo/${todoId}`, todo)
      .then(response => {
        this.setState(prevState => {
          const updatedTodos = prevState.todos.map(todo => {
            return todo._id === response.data._id ? response.data : todo;
          });
          return { todos: updatedTodos };
        });
        return response;
      });
  };

  deleteTodo = todoId => {
    return axios
      .delete(`http://localhost:5000/api/todo/${todoId}`)
      .then(response => {
        this.setState(prevState => {
          const updatedTodos = prevState.todos.filter(todo => {
            return todo._id !== todoId;
          });
          return { todos: updatedTodos };
        });
        return response;
      });
  };

  // User Methods for signup & login
  signup = userInfo => {
    return axios
      .post("http://localhost:5000/auth/signup", userInfo)
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          user,
          token
        });
        return response;
      });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          getTodos: this.getTodos,
          addTodo: this.addTodo,
          editTodo: this.editTodo,
          deleteTodo: this.deleteTodo,
          signup: this.signup,
          ...this.state
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AppContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AppContext.Consumer>
    );
  };
};

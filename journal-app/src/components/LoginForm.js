import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    usernameChanged(event) {
        this.setState({username: event.target.value});
    }

    passwordChanged(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        // SUBMIT BUTTON EVENT HANDLER
        alert('A name was submitted: ' + this.state.username);
        alert('A password was submitted: ' + this.state.password);
        event.preventDefault();
    }
    
      render() {
        return (
            <div class="form">

            <div class="form-title">Log in</div>

            <form onSubmit={this.handleSubmit}>
                <label>
                    username:
                    <input type="text" value={this.state.username} onChange={this.usernameChanged} />
                </label>
                <label>
                    password:
                    <input type="text" value={this.state.password} onChange={this.passwordChanged} />
                </label>
                <input type="submit" value="GO" />
            </form>

            </div>
        );
      }
  }

export default LoginForm;
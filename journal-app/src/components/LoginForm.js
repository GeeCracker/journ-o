import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';
import firebase from '../firebase.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userid: ''
        };
    
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    emailChanged(event) {
        this.setState({email: event.target.value});
    }

    passwordChanged(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        // SUBMIT BUTTON EVENT HANDLER
        alert('A name was submitted: ' + this.state.email);
        alert('A password was submitted: ' + this.state.password);
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                alert("signed in");
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        event.preventDefault();
    }
    
      render() {
        return (
            <div class="form">

            <div class="form-title">Log in</div>

            <form onSubmit={this.handleSubmit}>
                <label>
                    email:
                    <input type="text" value={this.state.email} onChange={this.emailChanged} />
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
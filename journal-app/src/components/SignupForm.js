import React from 'react';

import { Link } from 'react-router-dom';
import firebase from '../firebase.js';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: ''
        };
    
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    usernameChanged(event) {
        this.setState({username: event.target.value});
    }

    passwordChanged(event) {
        this.setState({password: event.target.value});
    }

    emailChanged(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        // SUBMIT BUTTON EVENT HANDLER
        alert('A name was submitted: ' + this.state.username);
        alert('A password was submitted: ' + this.state.password);
        alert('A email was submitted: ' + this.state.email);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
                // ..
            });
        const itemsRef = firebase.database().ref('users');
        const item = {
            user: this.state.username,
            pass: this.state.password,
            email: this.state.email
        }
        itemsRef.push(item);
        this.setState({
            user: '',
            pass: '',
            email: ''
        });
        event.preventDefault();
    }
    
      render() {
        return (
            <>

            <form onSubmit={this.handleSubmit}>
                <label>
                    email:
                    <input type="text" value={this.state.email} onChange={this.emailChanged} />
                </label>
                <label>
                    username:
                    <input type="text" value={this.state.username} onChange={this.usernameChanged} />
                </label>
                <label>
                    password:
                    <input type="text" value={this.state.password} onChange={this.passwordChanged} />
                </label>
                <label>
                    confirm password:
                    <input type="text" value={this.state.password} onChange={this.passwordChanged} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            </>
        );
      }
  }

export default SignupForm;
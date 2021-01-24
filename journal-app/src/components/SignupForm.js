import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';
import firebase from '../firebase.js';
import { Redirect } from 'react-router';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            userid: '',
            loggedin: false
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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                var uid = user.uid;
                this.setState({userid: uid})
                firebase.database().ref('/users/'+this.state.userid).set({
                    logins: 1,
                    email: this.state.email,
                    user: this.state.username,
                    password: this.state.password
                })
                sessionStorage.setItem('uid',uid)
                this.setState({loggedin: true})
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
    
        event.preventDefault();
    }

    
      render() {

        if (this.state.loggedin === true) {
            return <Redirect to='/profile'/>
        }

        return (
            <div class="form">

            <div class="form-title">Sign up</div>

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

            </div>
        );
      }
  }

export default SignupForm;
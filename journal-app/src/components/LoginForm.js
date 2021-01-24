import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';
import firebase from '../firebase.js';
import { Redirect } from 'react-router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userid: '',
            loggedin: false
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
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                var uid = user.uid;
                this.setState({userid: uid})
                // add a login
                var logs = this.getLogins(this.state.userid)
                firebase.database().ref('/users/'+this.state.userid).update({
                    logins: logs+1
                })
                sessionStorage.setItem('uid',uid)
                this.setState({loggedin: true})
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        event.preventDefault();
        
    }

    getLogins(uid){
        var logins = 1;
        firebase.database().ref('/users/'+uid+'/logins').on("value", function(snapshot){
            logins = snapshot.val();
        })
        return logins

    }
    
      render() {
          
        if (this.state.loggedin === true) {
            return <Redirect to='/profile' />
        }

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
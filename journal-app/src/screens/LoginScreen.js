import React from 'react';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signup: false
        };
    }

    toLogin = () => {
        this.setState({signup: false});
    }

    toSignup = () => {
        this.setState({signup: true});
    }

    render() {
      return (
        <>

        <div class="login-left">
            <div class="login-title">journ-o</div>
        </div>
        <div class="login-right">
            {this.state.signup ? 
                <>
                    <SignupForm />
                    <button class="login-line-button" onClick={this.toLogin}>login</button>
                </>:
                <>
                    <LoginForm />
                    <button class="login-line-button" onClick={this.toSignup}>signup</button>
                </>
            }
        </div>

        </>
      );
    }
  }

export default Login;
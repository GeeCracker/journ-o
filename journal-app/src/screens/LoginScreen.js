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

        <Link to="/profile">clickme</Link>

        {this.state.signup ? 
            <>
                <h1>signup screen</h1> 
                <SignupForm />
            </>:
            <>
                <h1>login screen</h1>
                <LoginForm />
            </>
        }

        <button onClick={this.toLogin}>login</button>
        <button onClick={this.toSignup}>signup</button>

        </>
      );
    }
  }

export default Login;
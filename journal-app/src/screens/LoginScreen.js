import React from 'react';

import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
      return (
        <>

        <Link to="/profile">clickme</Link>

        <h1>login screen</h1>

        </>
      );
    }
  }

export default Login;
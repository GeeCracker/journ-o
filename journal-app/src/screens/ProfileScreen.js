import React from 'react';

import './styles.css';

import Topbar from '../components/Topbar';
import JournalList from '../components/JournalList';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Name Nameson'
        };
    }

    componentDidMount() {
      // Function will run on component load
      var uid = sessionStorage.getItem('uid')
      var user
      firebase.database().ref('/users/'+uid+'/user').on("value", function(snapshot){
        user = snapshot.val();
      })
      this.setState({username: user})
      

    }

    render() {
      
      return (
        <div style={{position:'absolute',overflow:'hidden',width:'100vw',height:'100vh'}}>

        <div class="profile-left">
          <div class="profile-circle"></div>
          <div class="profile-name">{this.state.username}</div>
        </div>
        <div class="profile-right">
          <Link to="/newjournal" style={{textDecoration: 'none'}}>
            <button class="full-button">New Journ-o</button>
          </Link>
          <JournalList />
        </div>

        <Topbar />

        </div>
      );
    }
  }

export default Profile;
import React from 'react';

import './styles.css';

import Topbar from '../components/Topbar';
import JournalList from '../components/JournalList';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Name Nameson'
        };
    }

    componentDidMount() {
      // Function will run on component load
      this.setState({username: "Name Nameson's Journ-o"})
    }

    newJournal = () => {
      alert("new journal button clicked")
    }

    render() {
      return (
        <>

        <Topbar />
        <div class="profile-left">
          <div class="profile-name">{this.state.username}</div>
        </div>
        <div class="profile-right">
          <div class="full-button" onClick={this.newJournal}>New Journ-o</div>
          <JournalList />
        </div>

        </>
      );
    }
  }

export default Profile;
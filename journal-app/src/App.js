import Login from './screens/LoginScreen';
import Profile from './screens/ProfileScreen';
import NewJournal from './screens/NewJournalScreen';
import firebase from './firebase.js';
import React from 'react';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
    return (
      <Router>
        <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/newjournal">
              <NewJournal />
            </Route>
          </Switch>
      </Router>
    );
}

export default App;

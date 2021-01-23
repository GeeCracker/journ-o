import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDzxHAM1zKE1lnObXSgvDVFeuIUgI45hSE",
    authDomain: "qhacks-2021.firebaseapp.com",
    databaseURL: "https://qhacks-2021-default-rtdb.firebaseio.com",
    projectId: "qhacks-2021",
    storageBucket: "qhacks-2021.appspot.com",
    messagingSenderId: "711111616717",
    appId: "1:711111616717:web:5683364818a940586b6184",
    measurementId: "G-RY1EDNBCT6"
}

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  }
   
  export default Firebase;
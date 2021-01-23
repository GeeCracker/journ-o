import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDzxHAM1zKE1lnObXSgvDVFeuIUgI45hSE",
    authDomain: "qhacks-2021.firebaseapp.com",
    databaseURL: "https://qhacks-2021-default-rtdb.firebaseio.com",
    projectId: "qhacks-2021",
    storageBucket: "qhacks-2021.appspot.com",
    messagingSenderId: "711111616717",
    appId: "1:711111616717:web:5683364818a940586b6184",
    measurementId: "G-RY1EDNBCT6"
};
firebase.initializeApp(config);
export default firebase;
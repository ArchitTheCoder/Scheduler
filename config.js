import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBgNJlmxiVBXfSjqdLpLBFNrTLD-vP4kYo",
  authDomain: "myapp-b8120.firebaseapp.com",
  databaseURL: "myapp-b8120.firebaseio.com",
  projectId: "myapp-b8120",
  storageBucket: "myapp-b8120.appspot.com",
  messagingSenderId: "890185439374",
  appId: "1:890185439374:web:e773f8da015d5ac4fbd1df"
};

// if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
// }

export default firebase.firestore();

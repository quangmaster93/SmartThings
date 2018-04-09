
import * as firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCd89-2IaIjZLDMKz8OD1UhOHZ-T0zA4Y4",
    authDomain: "smarthings-3a4af.firebaseapp.com",
    databaseURL: "https://smarthings-3a4af.firebaseio.com",
    projectId: "smarthings-3a4af",
    storageBucket: "smarthings-3a4af.appspot.com",
    messagingSenderId: "941115826223"
  };
 export const FirebaseApp= firebase.initializeApp(config);
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyC8MFp0eugW1ZJtqRB0wI5uZN1YOCVFTSI",
  authDomain: "faccbills.firebaseapp.com",
  databaseURL: "https://faccbills.firebaseio.com",
  projectId: "faccbills",
  storageBucket: "faccbills.appspot.com",
  messagingSenderId: "548744067053",
  appId: "1:548744067053:web:2081681b32a1c1d9d019e4"
};

export const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const db = app.database()
export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP

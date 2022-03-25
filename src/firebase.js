import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDl5Dl-5_qaXTvftm_m0hx7cF0ZFPq1ka4',
  authDomain: 'pvisite-e5e08.firebaseapp.com',
  projectId: 'pvisite-e5e08',
  storageBucket: 'pvisite-e5e08.appspot.com',
  messagingSenderId: '144382549460',
  appId: '1:144382549460:web:0058bbf4123d748a8a0a41',
  measurementId: 'G-W3F30JEMCC',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }

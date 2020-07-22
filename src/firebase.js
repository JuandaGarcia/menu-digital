import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
	apiKey: 'AIzaSyDobWGUvqg6xf8sKD2ytnILqMYwM5FYRPw',
	authDomain: 'menu-digital-bc77f.firebaseapp.com',
	databaseURL: 'https://menu-digital-bc77f.firebaseio.com',
	projectId: 'menu-digital-bc77f',
	storageBucket: 'menu-digital-bc77f.appspot.com',
	messagingSenderId: '285480922342',
	appId: '1:285480922342:web:49c78a95b40984d5c91f27',
	measurementId: 'G-95X8K43CRJ',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

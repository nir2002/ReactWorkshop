
import app from 'firebase/app';
import firebase from "firebase";
import "firebase/auth";
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDjtBRmEggG3-iYdeerEkA9RqcaTifVMjI",
    authDomain: "mike-fb-test.firebaseapp.com",
    databaseURL: "https://mike-fb-test.firebaseio.com",
    projectId: "mike-fb-test",
    storageBucket: "mike-fb-test.appspot.com",
    messagingSenderId: "216091534035",
    appId: "1:216091534035:web:2562d082c78dd46dc7aa26",
    measurementId: "G-VD85G978G8"
};



class Firebase {

    constructor() {
        console.log("CONSTR--------------------------------")
        if (!firebase.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
        this.db = app.database();

    }

    signUp(firstName, lastName, password, redirect) {
        const username = `${firstName} ${lastName}`;
        const email = `${firstName}_${lastName}@reactws.com`;
        console.log("SIGN IN ", firstName, lastName, password, redirect)
        return this.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log("AAAAA", authUser)
                return this.user(authUser.user.uid)
                    .set({
                        createdAt: firebase.database.ServerValue.TIMESTAMP,
                        lastOnline: firebase.database.ServerValue.TIMESTAMP,
                        username,
                        firstName,
                        lastName,
                        email
                    });
            })
            .then(() => { if (redirect) window.location.replace(redirect) })
            .catch(e => { throw (e.message.replaceAll("email", "user")) })
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);



    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

}


export default Firebase;


/*
groups{
    groupId:{
        messages:[{text:"" , user:uid }]
        users:[user-ids]
    }
}

groupId - 2 types of groups, 
    simple chat (id is concatenated user names sorted)
    real group - users+given name
*/
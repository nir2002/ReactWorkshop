
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

const userName = (first, last) => `${first}_${last}@reactws.com`

class Firebase {

    myGroups = [];
    currentUser = null;

    constructor() {
        if (!firebase.apps.length) {
            app.initializeApp(firebaseConfig);
        }

        this.auth = app.auth();
        this.db = app.database();
        this.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    this.user(authUser.uid).on('value', snapshot => {
                        const userData = snapshot.val();
                        this.currentUser = userData.username;
                        console.log("CURREN", this.currentUser)
                    })
                } else {
                    this.currentUser = null;
                }
            }
        )
    }


    currentUserId() {
        return firebase.auth().currentUser.uid;
    }

    signUp(firstName, lastName, password, redirect) {
        const username = `${firstName} ${lastName}`;
        const email = userName(firstName, lastName);
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
                        email,
                        groups: [],
                    });
            })
            .then(() => { if (redirect) window.location.replace(redirect) })
            .catch(e => { throw (e.message.replaceAll("email", "user")) })
    }

    signIn(firstName, lastName, password) {
        const email = userName(firstName, lastName);
        this.doSignInWithEmailAndPassword(email, password);
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);



    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    /**
     * 
     * @param {string} name group name
     * @param {string[]} users group users
     * @returns 
     */
    createGroup = (name, users) => {
        let currentUI = firebase.auth().currentUser.uid;
        if (!currentUI || users.length < 1)
            return;
        let uniqueUsers = new Set([...users, currentUI])
        console.log("N", name, "users:", [...uniqueUsers])
        let newGroupRef = this.groups().push();
        newGroupRef.set({
            messages: [],
            name,
            users: [...uniqueUsers],
            // lastSeen: firebase.database.ServerValue.TIMESTAMP
        }, (error) => {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                this.user(currentUI).update({ groups: [newGroupRef.key, ...this.myGroups] });
            }
        })
    }


    registerMyGroups = (onChange) => {
        let currentUI = firebase.auth().currentUser.uid;
        if (!currentUI) return;
        this.groups().on('value', snapshot => {
            const groupsData = snapshot.val(); console.log(":::", groupsData)
            let groupsDataList = Object.keys(groupsData).map(k => ({ id: k, ...groupsData[k] }))
            let myGroups = groupsDataList.filter(g => g.users?.some(id => id === currentUI))
            myGroups.forEach(group => {
                if (group && group.messages)
                    group.messages = Object.values(group.messages).sort((ga, gb) => gb.ts - ga.ts);
                else
                    group.messages = [];
            })
            onChange(myGroups);
        })
    }

    unRegisterMyGroups = () => {
        this.groups().off();
    }

    registerUsersList = (onChange) => {
        console.log("USER REQ", this.users())
        this.users().on('value', snapshot => {
            console.log("USER --- ")
            const users = snapshot.val();
            let uids = Object.keys(users);

            let userList = uids.map(id => ({ ...users[id], id }));
            let userCopy = {};
            userList.forEach(u => userCopy[u.id] = u);
            console.log("USER", userList)
            onChange(userCopy);
        })
    }

    unRegisterUsersList = () => {
        this.users().off();
    }

    sendMessage = (text, groupId) => {

        let currentUI = firebase.auth().currentUser.uid;
        if (!currentUI) return;
        let newMsgRef = this.messages(groupId).push();
        newMsgRef.set({
            ts: (new Date()).getTime(),//firebase.database.ServerValue.TIMESTAMP,
            text,
            user: currentUI,
            username: this.currentUser,

        })
        // this.group(groupId).update({
        //     messages: firebase.firestore.FieldValue.arrayUnion(
        //         {
        //             ts: (new Date()).getTime(),//firebase.database.ServerValue.TIMESTAMP,
        //             text,
        //             user: currentUI,
        //             username: this.currentUser,

        //         }
        //     )
        // })
    }

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    group = (gid) => this.db.ref(`groups/${gid}`)
    groups = () => this.db.ref(`groups`)
    messages = (gid) => this.db.ref(`groups/${gid}/messages`);

}


export default Firebase;


/*
user{
    myGroups: [gidA,gidB]
}
groups{
    groupId:{
        messages:{[ts:[{text:"" , user:uid }]
        users:[user-ids],
        name:string
    }
}

groupId - 2 types of groups,
    simple chat (id is concatenated user names sorted)
    real group - users+given name
*/
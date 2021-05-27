import React, { useContext } from 'react';
import Firebase from "./Firebase";

const FirebaseContext = React.createContext(null);
const firebase = new Firebase();

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export const useFirebaseContext = () => {
    return useContext(FirebaseContext);
}

export const FireBaseProvider = ({ children }) => (
    <FirebaseContext.Provider value={firebase} >
        {children}
    </FirebaseContext.Provider>)

export default FirebaseContext;

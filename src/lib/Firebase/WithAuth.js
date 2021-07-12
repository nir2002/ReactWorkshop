import React, { useEffect, useState, useRef } from 'react';
import { useFirebaseContext } from './context';
import { SIGN_IN_PAGE } from "../../lib/Routes";

const withAuth = Component => {

    function WithAuthHoc(props) {
        const [currentUser, setAuthUser] = useState(null)
        const listner = useRef(null)
        let firebase = useFirebaseContext();
        useEffect(() => {
            console.log("EFFECT !!")
            listner.current = firebase.auth.onAuthStateChanged(
                authUser => {
                    setAuthUser(authUser);
                    if (!authUser) {
                        window.location.href = SIGN_IN_PAGE;
                    }
                },
            );
            return () => {
                listner.current();
            }
        }, []);
        return (!!currentUser ? <Component uid={currentUser.uid} {...props} /> : <div className="loading">Loading ...</div>);
    }

    return WithAuthHoc;
};

export default withAuth;
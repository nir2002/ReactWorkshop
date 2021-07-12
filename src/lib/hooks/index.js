import { useState, useEffect } from 'react';
import { useFirebaseContext } from "../Firebase/context";

function useUsersList() {
    const [userList, setUserList] = useState([]);
    const firebase = useFirebaseContext();

    useEffect(() => {
        function handleUsersListUpdate(users) {
            setUserList(users);
        }
        firebase.registerUsersList(handleUsersListUpdate)
        return () => {
            firebase.unRegisterUsersList();
        };
    },[]);

    return userList;
}

function useGroupsList() {
    const [groupList, setGroupList] = useState([]);
    const firebase = useFirebaseContext();

    useEffect(() => {
        function handleGroupListUpdate(groups) {
            setGroupList(groups);
        }
        firebase.registerMyGroups(handleGroupListUpdate)
        return () => {
            firebase.unRegisterMyGroups();
        };
    },[]);

    return groupList;
}

export {useUsersList,useGroupsList}
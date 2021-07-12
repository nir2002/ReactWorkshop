import React, { useState } from 'react'
import { LabeledInput } from "../components/Input";
import { useFirebaseContext } from "../lib/Firebase/context";
import { SIGN_UP_PAGE } from "../lib/Routes"


function SignIn() {
    const [formState, setFormState] = useState({});
    let firebase = useFirebaseContext();
    const onChange = (e) => { setFormState(Object.assign({}, formState, { [e.target.name]: e.target.value })) };
    const onSubmit = ({ firstName, lastName, password }) => firebase.signIn(firstName, lastName, password);
    //Note that in real life we will avoid strings as name, use const / TS to verify correctness
    return (
        <Form title={"Sign in"} onSubmit={onSubmit} formState={formState} >
            <LabeledInput onChange={onChange} placeholder={"Enter first name"} label="First Name" name="firstName" />
            <LabeledInput onChange={onChange} placeholder={"Enter last name"} label="Last Name" name="lastName" />
            <LabeledInput onChange={onChange} placeholder={"Enter password"} label="Password" type="password" name="password" />
            <a href={SIGN_UP_PAGE}>Not registered ? Sign up now</a>
        </Form>
    )
}

function Form({ title, formState, children, onSubmit, formValidation }) {
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <form
            className="sign-in-up"
            onSubmit={(e) => {
                e.preventDefault();
                if (formValidation) {
                    let res = formValidation(formState);
                    setErrorMsg(res.message);
                    if (!res.isOk) return;
                }
                onSubmit(formState)?.catch(setErrorMsg);
            }}
        >
            <div>{title}</div>
            {children}
            <div>{errorMsg}</div>
            <button type="submit" >Submit</button>
        </form>
    );
}


export default SignIn

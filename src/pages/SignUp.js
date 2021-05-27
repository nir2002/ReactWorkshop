import React, { useState } from 'react'
import { LabeledInput } from "../components/Input";
import { useFirebaseContext } from "../lib/Firebase/context";
import { HOME_PAGE } from "../lib/Routes"
//Steps
// Learn about inputs , controlled inputs
// Learn about form and submision
// Learn form validation
// Learn Object.assign / destruction / double arrow function
// Extraction - use of children
// React context (create context, provide context, useContext);

const validateForm = (formState) => {
    const MIN_NAME_LEN = 3;
    const MIN_PASS_LEN = 6;
    const LEGAL_CHARS_RE = /^[a-zA-Z]+$/;
    const vStatus = (isOk = true, message = "") => ({ isOk, message });
    let { firstName, lastName, password, passwordConfirmation } = formState;
    formState = { firstName, lastName, password, passwordConfirmation };
    console.log(":", formState);
    // Check non empty
    if (Object.keys(formState).some(key => !formState[key]))
        return vStatus(false, "All fields are required please fill in the missing field/s");
    //Check length
    if (firstName?.length < MIN_NAME_LEN) return vStatus(false, `First name must be at least ${MIN_NAME_LEN} characters long`);
    if (lastName?.length < MIN_NAME_LEN) return vStatus(false, `Last name must be at least ${MIN_NAME_LEN} characters long`);
    if (password?.length < MIN_PASS_LEN || passwordConfirmation?.length < MIN_PASS_LEN) return vStatus(false, `Password must be at least ${MIN_PASS_LEN} characters long`);
    //check name legal chars
    if ((LEGAL_CHARS_RE.exec(firstName)) == null || (LEGAL_CHARS_RE.exec(lastName)) == null)
        return vStatus(false, `First/Last name can only contain letters (no spaces)`);
    //Check passwords match
    if (passwordConfirmation != password) return vStatus(false, `Passwords must match`);
    return vStatus();
}

function SignUp() {
    const [formState, setFormState] = useState({});
    let firebase = useFirebaseContext();
    const onChange = (e) => { setFormState(Object.assign({}, formState, { [e.target.name]: e.target.value })) };
    const onSubmit = ({ firstName, lastName, password }) => firebase.signUp(firstName, lastName, password, HOME_PAGE);
    //Note that in real life we will avoid strings as name, use const / TS to verify correctness
    return (
        <Form title={"Sign Up"} onSubmit={onSubmit} formState={formState} formValidation={validateForm} >
            <LabeledInput onChange={onChange} placeholder={"Enter first name"} label="First Name" name="firstName" />
            <LabeledInput onChange={onChange} placeholder={"Enter last name"} label="Last Name" name="lastName" />
            <LabeledInput onChange={onChange} placeholder={"Enter password"} label="Password" type="password" name="password" />
            <LabeledInput onChange={onChange} placeholder={"Confirm password"} label="Confirm Password" type="password" name="passwordConfirmation" />
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


export default SignUp

import React, { useState } from 'react'
import { LabeledInput } from "../components/Input";


const validateForm = (formState) => {
    const MIN_NAME_LEN = 3;
    const MIN_PASS_LEN = 4;
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
    if (password?.length < MIN_PASS_LEN || passwordConfirmation?.length < MIN_PASS_LEN) return vStatus(false, `Password must be at least ${MIN_NAME_LEN} characters long`);
    //check name legal chars
    if ((LEGAL_CHARS_RE.exec(firstName)) == null || (LEGAL_CHARS_RE.exec(lastName)) == null)
        return vStatus(false, `First/Last name can only contain letters (no spaces)`);
    //Check passwords match
    if (passwordConfirmation != password) return vStatus(false, `Passwords must match`);
    return vStatus();
}


function SignUp() {
    const [formState, setFormState] = useState({});
    // const [errorMsg, setErrorMsg] = useState("")
    return (
        <form className="sign-in-up" onSubmit={(e) => { e.preventDefault(); setErrorMsg(validateForm(formState).message) }}>
            <div>Sign Up</div>
            <LabeledInput onChange={(value) => { setFormState(Object.assign({}, formState, { firstName: value })) }} placeholder={"Enter first name"} label="First Name" />
            <LabeledInput onChange={(value) => { setFormState(Object.assign({}, formState, { lastName: value })) }} placeholder={"Enter last name"} label="Last Name" />
            <LabeledInput onChange={(value) => { setFormState(Object.assign({}, formState, { password: value })) }} placeholder={"Enter password"} label="Password" type="password" />
            <LabeledInput onChange={(value) => { setFormState(Object.assign({}, formState, { passwordConfirmation: value })) }} placeholder={"Confirm password"} label="Confirm Password" type="password" />
            <div>{errorMsg}</div>
            <button type="submit" >Submit</button>
        </form>

    )
}


export default SignUp

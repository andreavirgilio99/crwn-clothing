import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SIgnupContainer } from "./sign-up-form.styles";

const SignUpForm = () => {

    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if ((password !== confirmPassword) || password.length < 6) return;

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, displayName)
        } catch (error) {
            console.log('errore', error)
        }

        resetFormFields();
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    return (
        <SIgnupContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput label={'Display Name'} type="text" required name="displayName" value={displayName} onChange={onChangeHandler} />
                <FormInput label={'Email'} type="email" required name="email" value={email} onChange={onChangeHandler} />
                <FormInput label={'Password'} type="password" required name="password" value={password} onChange={onChangeHandler} />
                <FormInput label={'Confirm Password'} type="password" required name="confirmPassword" value={confirmPassword} onChange={onChangeHandler} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SIgnupContainer>
    )
}

export default SignUpForm
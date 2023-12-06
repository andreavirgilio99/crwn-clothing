import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { ButtonsContainer, SignupContainer } from "./sign-in-form.styles";

const SignInForm = () => {

    const defaultFormFields = {
        email: '',
        password: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup()
            await createUserDocumentFromAuth(user)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/wrong-password') {
                alert('Incorrect Password')
            }
            if (error.code === 'auth/invalid-login-credentials') {
                alert('Incorrect Credentials')
            }
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
        <SignupContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput label={'Email'} type="email" required name="email" value={email} onChange={onChangeHandler} />
                <FormInput label={'Password'} type="password" required name="password" value={password} onChange={onChangeHandler} />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type={'button'} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignupContainer>
    )
}

export default SignInForm
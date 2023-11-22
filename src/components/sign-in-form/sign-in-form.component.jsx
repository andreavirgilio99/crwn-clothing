import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

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
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput label={'Email'} type="email" required name="email" value={email} onChange={onChangeHandler} />
                <FormInput label={'Password'} type="password" required name="password" value={password} onChange={onChangeHandler} />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type={'button'} buttonType={'google'} onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
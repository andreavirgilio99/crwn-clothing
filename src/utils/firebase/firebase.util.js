import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOLEsxGZA7wRUXNCMO0z9xQnt0tfc0mk4",
    authDomain: "crwn-clothing-db-8f5a7.firebaseapp.com",
    projectId: "crwn-clothing-db-8f5a7",
    storageBucket: "crwn-clothing-db-8f5a7.appspot.com",
    messagingSenderId: "721527697520",
    appId: "1:721527697520:web:987d19846d53e05797c4b5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

//auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//storage
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error during user creation', error);
        }
    }

    return userDocRef;
}
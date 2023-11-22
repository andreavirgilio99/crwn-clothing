import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
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
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

//auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//storage
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, dispName) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName: dispName ? dispName : displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error during user creation', error);
        }
    }

    return userDocRef;
}
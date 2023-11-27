import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'


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

//params: table name   //records     //field whose value is to be used as id
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, fieldOfTitle) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object[fieldOfTitle].toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('Done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

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
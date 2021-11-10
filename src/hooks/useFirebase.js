import { useState, useEffect } from 'react';
import initializeAuthentication from '../Pages/Login/Firebase/Firebase.init';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    getIdToken,
} from "firebase/auth";


// initialize firebase app
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState('');


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();



// Google popup Sign in system
    const googleSignIn = (location, history) => {
        setLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                setAuthError('')
                const user = result.user
                saveUser("PUT", user.email, user.displayName, null)
                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {
                setAuthError(error.message);
            }).finally( () => setLoading(false) );
    }



// Register user using email password;
    const createUser = (name, email, password, history) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('')
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to the database
                saveUser('POST', email, name, password)
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/');
            })
            .catch((error) => {
                setAuthError(error.message);
            }).finally( () => setLoading(false) )
    }



// LogOut user;
    const logOut = () => {
        setLoading(true)
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        }).finally(() => setLoading(false));
    };



// Login user
    const loginUser = (email, password, location, history) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            }).finally( () => setLoading(false) )
    }



// save user data on data base
    const saveUser = (method, email, displayName, password) => {
        const user = { email, displayName, password };
        fetch('https://doctors-portal-95794.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }



// The recommended way to get the current user is by setting an observer on the Auth object:
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken)
                    })
            } else {
                setUser({})
            }
            setLoading(false);
        });
        return () => unSubscribe;
    }, [auth])

// load real ADMIN data
    useEffect(() => {
        fetch(`https://doctors-portal-95794.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(true))
    }, [user.email])






    return {
        user,
        token,
        admin,
        loading,
        authError,
        createUser,
        logOut,
        loginUser,
        googleSignIn,
    }
};

export default useFirebase;

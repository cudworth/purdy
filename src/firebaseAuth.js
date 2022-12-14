// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-key";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

function firebaseAuth(props) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  function addAuthStateListener(fn) {
    onAuthStateChanged(auth, (user) => {
      fn(user);
    });
  }

  function createUser(args) {
    const { email, password, displayName } = { ...args };
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`User ID: ${user.uid}`);
        updateProfile(auth.currentUser, { displayName });
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  }

  function signUserIn(args) {
    const { email, password } = { ...args };
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`User ID: ${user.uid}`);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function signUserOut() {
    signOut(auth)
      .then(() => {
        console.log("Signed user out");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return {
    createUser,
    signUserIn,
    signUserOut,
    addAuthStateListener,
  };
}

export { firebaseAuth };

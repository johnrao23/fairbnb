import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useAuthStore } from "../store/store";

const signUp = async ({ email, password }) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add user to Firestore
    const newUser = {
      email: userCredential.user.email,
      date: Timestamp.fromDate(new Date()),
    };
    setDoc(doc(db, `users/${userCredential.user.uid}`), {
      newUser,
    });

    // Get user object from userCredential
    const user = userCredential.user;
    console.log("Registered with uid: ", user.uid);

    // Update global state
     useAuthStore.setState({
      user: {
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
      },
      isSignedIn: true,
    });

    // Return the user object
    return { user };
  } catch (error) {
    return { error };
  }
};

const signIn = async ({ email, password }) => {
  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get user object from userCredential
    const user = userCredential.user;

    // Update global state
     useAuthStore.setState({
      user: { id: user?.uid, email: user?.email, name: user.displayName },
      isSignedIn: true,
    });

    // Return the user object
    return { user };
  } catch (error) {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);

    // Return null to indicate sign-in failed
    return { error };
  }
};

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    useAuthStore.setState({
      user: { id: user?.uid, email: user?.email, name: user.displayName },
      isSignedIn: true,
    });
    return { user };  // return user object for further use if needed
  } catch (error) {
    console.error("An error occurred during Google sign-in", error);
    return { error };  // return error object for error handling if needed
  }
}

const twitterSignIn = async () => {
  const provider = new TwitterAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    useAuthStore.setState({
      user: { id: user?.uid, email: user?.email, name: user.displayName },
      isSignedIn: true,
    });
    return { user };  // return user object for further use if needed
  } catch (error) {
    console.error("An error occurred during Google sign-in", error);
    return { error };  // return error object for error handling if needed
  }
}

const githubSignIn = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    useAuthStore.setState({
      user: { id: user?.uid, email: user?.email, name: user.displayName },
      isSignedIn: true,
    });
    return { user };  // return user object for further use if needed
  } catch (error) {
    console.error("An error occurred during Google sign-in", error);
    return { error };  // return error object for error handling if needed
  }
}


const logOut = async () => {
  try {
    signOut(auth);
    await useAuthStore.setState({ isSignedIn: false, user: null });
  } catch (error) {
    console.log("error", error);
  }
};

export { signUp, signIn, logOut, googleSignIn, twitterSignIn, githubSignIn };


// const user = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };
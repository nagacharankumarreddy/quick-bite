import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FirebaseContext = createContext(null);
export const firebaseConfig = {
  apiKey: "AIzaSyD_V2Roidf3ZOwOtCObp6AODT8praMY-wQ",
  authDomain: "quick-bite-a926c.firebaseapp.com",
  projectId: "quick-bite-a926c",
  storageBucket: "quick-bite-a926c.appspot.com",
  messagingSenderId: "508976986685",
  appId: "1:508976986685:web:78f253540e3e4f63e60854",
  measurementId: "G-KWDF0115CW",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [firebaseAuth]);

  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw new Error("Error signing up user: " + error.message);
    }
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      throw new Error("Error signing in user: " + error.message);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      toast.success("Google Sign In Success:", user);
      navigate("./");
    } catch (error) {
      console.error("Google Sign In Error:", error);
    }
  };

  const signOutUser = async () => {
    return firebaseAuth.signOut();
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (error) {
      throw new Error("Error sending password reset email: " + error.message);
    }
  };
  const logOut = async () => {
    try {
      await firebaseAuth.signOut();
      navigate("/login");
    } catch (error) {
      throw new Error("Error while logging out: " + error.message);
    }
  };

  const getData = async (url) => {
    try {
      // Access and log  restaurants
      const snapshot = await get(ref(db, `${url}`));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return;
      }
    } catch (error) {
      console.error(
        "Error accessing data from Realtime Database:",
        error.message
      );
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        sendPasswordReset,
        currentUser,
        firebaseAuth,
        logOut,
        signInWithGoogle,
        signOutUser,
        getData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default useFirebase;

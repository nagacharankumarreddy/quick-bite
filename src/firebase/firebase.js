import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { firebaseConfig } from "../firebase";

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();

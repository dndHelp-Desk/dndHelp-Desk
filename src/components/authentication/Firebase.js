import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

//Config Firebase =======
const firebaseConfig = {
  apiKey: "AIzaSyA62ZCv7_0Ktz4y-gU2EvHIpKTn3WFXM3U",
  authDomain: "dial-n-dine-help-desk.firebaseapp.com",
  projectId: "dial-n-dine-help-desk",
  storageBucket: "dial-n-dine-help-desk.appspot.com",
  messagingSenderId: "143621322408",
  appId: "1:143621322408:web:14f3e35a0529b1f5dc749d",
  measurementId: "G-GZCS9SQW3Z",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Custom Hook / React Component ====================
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  alert("Uploaded file!");
}

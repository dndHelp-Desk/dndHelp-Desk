import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const auth = getAuth();
const storage = getStorage();

// Custom Hook / React Component ====================
export function useAuth() {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, [dispatch]);
  return currentUser;
}

// Storage
export async function upload(file, currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  return true;
}

export async function addRecording(file, ticket_id) {
  const fileRef = ref(storage, ticket_id + ".wav");
  await uploadBytes(fileRef, file);
  return true;
}
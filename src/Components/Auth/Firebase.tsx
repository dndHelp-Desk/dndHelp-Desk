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
    const unsub = onAuthStateChanged(auth, (user:any) => setCurrentUser(user));
    return unsub;
  }, [dispatch]);
  return currentUser;
}

// Storage
export async function upload(file:any, currentUser:any) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL });
  return true;
}

export async function addRecording(file:any, nameRef:any) {
  const fileRef = ref(storage, nameRef);
  await uploadBytes(fileRef, file);
  return (console.log("done"));
}
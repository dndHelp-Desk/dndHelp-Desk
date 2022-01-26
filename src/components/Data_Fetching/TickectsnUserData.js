import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { updateUser, addAllMembers } from "./../../store/UserSlice";
import { addAllTickects } from "../../store/TicketsSlice";
//Firestore ===================
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

// collection ref
let membersRef = collection(db, "members");
let tickectsRef = collection(db, "tickects");

const TickectsnUserData = () => {
  const dispatch = useDispatch();
  const currentUser = getAuth().currentUser;

  //User/Members Data =====================================
  useEffect(() => {
    return (
      //Members Data Fetching
      onSnapshot(membersRef, (snapshot) => {
        dispatch(
          addAllMembers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //Add User Details ==============
      onSnapshot(membersRef, (snapshot) => {
        dispatch(
          updateUser(
            snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .filter(
                (member) =>
                  member.email.toLowerCase().trim() ===
                  currentUser.email.toLowerCase().trim()
              )
          )
        );
      })
    );
  }, [dispatch, currentUser.email]);

  //Tickets Data =====================================
  useEffect(() => {
    return (
      //Tickects Data Fetching
      onSnapshot(tickectsRef, (snapshot) => {
        dispatch(
          addAllTickects(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      })
    );
  }, [dispatch]);
  return <></>;
};

export default TickectsnUserData;

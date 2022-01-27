import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { updateUser, addAllMembers } from "../../store/UserSlice";
import {
  addAllTickets,
  setContacts,
  loadSettings,
} from "../../store/TicketsSlice";
//Firestore ===================
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

// collection ref
let membersRef = collection(db, "members");
let ticketsRef = collection(db, "tickects");
let contactsRef = collection(db, "contacts");
let settingsRef = collection(db, "settings");


// New Tickects ==============================
export const addTicket = (
  recipient_name,
  recipient_email,
  agent,
  priority,
  category,
  branch_company,
  message,
  state,date
) => {
  addDoc(ticketsRef, {
    recipient_name: recipient_name,
    recipient_email: recipient_email,
    message_position: 1,
    priority: priority,
    agent_name: agent,
    date: new Date().toISOString(),
    category: category,
    branch_company: branch_company,
    message: message,
    time: `${new Date().getHours() + 1}:${new Date().getMinutes() + 1}`,
    tickect_id: Date.now() - Math.random(),
    status: state,
    due_date: date,
  }).then(() => {
    console.log("done");
  });
};

const TicketsnUserData = () => {
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
      }),
      //Tickects Data Fetching ======================
      onSnapshot(ticketsRef, (snapshot) => {
        dispatch(
          addAllTickets(
            snapshot.docs
              .map((doc) => ({ ...doc.data(), id: doc.id }))
              .sort(
                (a, b) =>
                  new Date(a.date).toISOString() >
                  new Date(b.date).toISOString()
              )
          )
        );
      }),
      //Contacts Data Fetching ======================
      onSnapshot(contactsRef, (snapshot) => {
        dispatch(
          setContacts(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //Tickets Settings Data Fetching ======================
      onSnapshot(settingsRef, (snapshot) => {
        dispatch(
          loadSettings(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      })
    );
  }, [dispatch, currentUser.email]);
  return <></>;
};

export default TicketsnUserData;

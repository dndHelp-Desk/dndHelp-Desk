import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { updateUser, addAllMembers, setToDo } from "../../store/UserSlice";
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
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

// collection ref
let membersRef = collection(db, "members");
let ticketsRef = collection(db, "tickects");
let contactsRef = collection(db, "contacts");
let settingsRef = collection(db, "settings");

// deleting Tickets
export const deleteTicket = (id) => {
  const docRef = doc(db, "tickects", id);
  deleteDoc(docRef);
};

// Assign Different Agent ================
export const assignAgent = (id, agent) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    agent_name: agent,
  });
};

// Change Priority ================
export const changePriority = (id, selected) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    priority: selected,
  });
};

// Change User Name ================
export const changeName = (id, name) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    name: name,
  });
};

// Change Status ================
export const changeStatus = (id, state) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    status: state,
  });
};

//Add Reply or Send Reply ============
export const addReply = (message, message_position, ticket_id) => {
  addDoc(ticketsRef, {
    date: new Date().toISOString(),
    from: "agent",
    message: message,
    message_position: message_position,
    ticket_id: ticket_id,
  });
};

// New Tickects ==============================
export const addTicket = (
  recipient_name,
  recipient_email,
  agent,
  priority,
  category,
  branch_company,
  message,
  state,
  date,
  ticket_id
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
    ticket_id: ticket_id,
    status: state,
    due_date: date,
    from: "agent",
  });
};

const TicketsnUserData = () => {
  const dispatch = useDispatch();
  const currentUser = getAuth().currentUser;
  const member_details = useSelector((state) => state.UserInfo.member_details);

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
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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

  //Todo CollectionRef ====================
  useEffect(() => {
    let toDoRef = collection(db, `members/${member_details[0].id}/to-do`);
    return onSnapshot(toDoRef, (snapshot) => {
      member_details[0].id &&
        dispatch(
          setToDo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    });
  }, [dispatch, member_details]);
  return <></>;
};

export default TicketsnUserData;

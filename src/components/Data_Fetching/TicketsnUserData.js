import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { updateUser, addAllMembers, setToDo } from "../../store/UserSlice";
import {
  addAllTickets,
  setContacts,
  loadSettings,
  loadTemplates,
  loadAccounts,
  setCategories,
  setCompanyDetails,
} from "../../store/Tickets_n_Settings_Slice";
import { setMessages } from "../../store/NotificationsSlice";

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
let emailAccountsRef = collection(db, "email_accounts");
let email_TemplatesRef = collection(
  db,
  "settings/all_settings/email_templates"
);
let categoriesRef = collection(db, "settings/all_settings/categories");
let companyDetailsRef = collection(db, "settings/all_settings/company_details");

//===================================USER===========================================
// Update User Details ================
export const updateUserDetails = (id, name, dept, bio) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    name: name,
    dept: dept,
    bio: bio,
  });
};

// Update Agent Online Status ================
export const updateUserStatus = (id, status) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    status: status,
  });
};

// Update Agent profileUrl on FireBase Doc ================
export const updateProfileUrl = (id, photoUrl) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    photoUrl: photoUrl,
  });
};

// Update User Uid ================
export const updateUID = (id, uid) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    uid: uid,
  });
};

// change user active status ================
export const activateUser = (id, state) => {
  let docRef = doc(db, "members", id);
  updateDoc(docRef, {
    active: state,
  });
};

// Delete User ================
export const deleteUser = (id) => {
  let docRef = doc(db, "members", id);
  deleteDoc(docRef);
};

// New User =================================
export const createUser = (name, dept, email, access, bio, active) => {
  addDoc(membersRef, {
    name: name,
    dept: dept,
    email: email,
    access: access,
    bio: bio,
    active: active,
    status: "unavailable",
    photoUrl: "",
  });
};

//===================================NOTIFICATIONS===========================================
// Add Notifications =================================
export const addNotification = (id, title, message) => {
  addDoc(collection(db, `members/${id}/notifications`), {
    title: title,
    message: message,
    date: new Date().toLocaleString(),
  });
};

//Delete notification ============================
export const deleteNotification = (id, user_id) => {
  let docRef = doc(db, `members/${user_id}/notifications`, id);
  deleteDoc(docRef);
};

//===================================CONTACTS MANAGEMENT===========================================
// New Contact =================================
export const newContact = (name, email, phone, company) => {
  addDoc(contactsRef, {
    name: name,
    email: email,
    phone: phone,
    branch_company: company,
  });
};

//Edit Contact ========================
export const editContact = (id, name, phone) => {
  let docRef = doc(db, "contacts", id);
  updateDoc(docRef, {
    name: name,
    phone: phone,
  });
};

// Delete Contact ================
export const deleteContact = (id) => {
  let docRef = doc(db, "contacts", id);
  deleteDoc(docRef);
};

//===================================EMAIL ACCOUNTS MANAGEMENT===========================================
// Update Email Account =================================
export const updateEmailAccount = (id, email, password, host, port) => {
  let docRef = doc(db, "email_accounts", id);
  updateDoc(docRef, {
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

//New Account ==========================
export const newEmailAccount = (name, email, password, host, port) => {
  addDoc(emailAccountsRef, {
    name: name,
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

// Delete Contact ================
export const deleteEmailAccount = (id) => {
  let docRef = doc(db, "email_accounts", id);
  deleteDoc(docRef);
};

//===================================TICKETS===========================================
// Change Ticket Priority ================
export const changePriority = (id, selected) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    priority: selected,
  });
};
// Resolve Ticket Ticket  ================
export const resolveTicket = (id, solution) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    status: "solved",
    solution: solution,
    closed_time: new Date().toLocaleString(),
  });
};

// Change Reopen Ticket ================
export const reOpenTicket = (id) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    status: "reopened",
    reopened: true,
  });
};

// Change Ticket Status ================
export const changeStatus = (id, state) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    status: state,
  });
};

// deleting Tickets
export const deleteTicket = (id) => {
  const docRef = doc(db, "tickects", id);
  deleteDoc(docRef);
};

// Assign Different Agent ================
export const assignAgent = (id, agent, email, assigner) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    agent_name: agent,
    agent_email: email,
    assigned: true,
    assignee: agent,
    assigner: assigner,
  });
};

//Add Reply or Send Reply ============
export const addReply = (
  message,
  message_position,
  ticket_id,
  user,
  email,
  from,
  r_name,
  r_email,
  team
) => {
  addDoc(ticketsRef, {
    date: new Date().toLocaleString(),
    from: from,
    user: user,
    user_email: email,
    recipient_name: r_name,
    recipient_email: r_email,
    message: message,
    message_position: message_position,
    ticket_id: ticket_id,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    readStatus: "delivered",
    team: team,
  });
};

//Mark Message as Seen ============
export const markAsSeen = (id, readStatus) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    readStatus: readStatus,
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
  ticket_id,
  agent_email,
  c_name,
  c_email,
  c_number,
  team
) => {
  addDoc(ticketsRef, {
    recipient_name: recipient_name,
    recipient_email: recipient_email,
    message_position: 1,
    priority: priority,
    agent_name: agent,
    date: new Date().toLocaleString(),
    category: category,
    branch_company: branch_company,
    message: message,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    ticket_id: ticket_id,
    status: state,
    due_date: date,
    from: "agent",
    agent_email: agent_email,
    readStatus: "delivered",
    complainant_name: c_name,
    complainant_email: c_email,
    complainant_number: c_number,
    closed_time: state === "solved" ? new Date().toLocaleString() : "",
    fcr: state === "solved" ? "yes" : "no",
    solution: state === "solved" ? message : "",
    reopened: false,
    assigned: false,
    assignee: "",
    assigner: "",
    team: team,
  });
};

//Component ==================================
const TicketsnUserData = () => {
  const dispatch = useDispatch();
  const currentUser = getAuth().currentUser;
  const member_details = useSelector((state) => state.UserInfo.member_details);

  //Data Loading =====================================
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
      //Settings Data Fetching ======================
      onSnapshot(settingsRef, (snapshot) => {
        dispatch(
          loadSettings(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //Email Tenplates Data Fetching ======================
      onSnapshot(email_TemplatesRef, (snapshot) => {
        dispatch(
          loadTemplates(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //Categories Data Fetching ======================
      onSnapshot(categoriesRef, (snapshot) => {
        dispatch(
          setCategories(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
              .categories
          )
        );
      }),
      //Company Details Data Fetching ======================
      onSnapshot(companyDetailsRef, (snapshot) => {
        dispatch(
          setCompanyDetails(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
          )
        );
      })
    );
  }, [dispatch, currentUser.email]);

  //Load Email_Accounts ====================
  useEffect(() => {
    return onSnapshot(emailAccountsRef, (snapshot) => {
      member_details[0].id &&
        dispatch(
          loadAccounts(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
    });
  }, [dispatch, member_details]);

  //Todo CollectionRef and Notifications ====================
  useEffect(() => {
    let toDoRef = collection(db, `members/${member_details[0].id}/to-do`);
    let notificationsRef = collection(
      db,
      `members/${member_details[0].id}/notifications`
    );
    return (
      onSnapshot(toDoRef, (snapshot) => {
        member_details[0].id &&
          dispatch(
            setToDo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          );
      }),
      onSnapshot(notificationsRef, (snapshot) => {
        member_details[0].id &&
          dispatch(
            setMessages(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
          );
      })
    );
  }, [dispatch, member_details]);
  return <></>;
};

export default TicketsnUserData;

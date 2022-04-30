import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { getAuth } from "firebase/auth";
import {
  updateUser,
  addAllMembers,
  setToDo,
} from "../../Redux/Slices/UserSlice";
import {
  addAllTickets,
  setContacts,
  loadSettings,
  loadTemplates,
  loadAccounts,
  setCategories,
  setCompanyDetails,
} from "../../Redux/Slices/Tickets_n_Settings_Slice";
import { setMessages } from "../../Redux/Slices/NotificationsSlice";
import { store } from "../../Redux/store";

//Firestore ===================
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

// Subsequent queries will use persistence, if it was enabled successfully
enableIndexedDbPersistence(db);
let org = store.getState().UserInfo.company_name;

// collection ref
let membersRef: any = org && collection(db, `companies/${org}/members`);
let ticketsRef: any = org && collection(db, `companies/${org}/tickets`);
let contactsRef: any = org && collection(db, `companies/${org}/contacts`);
let settingsRef: any = org && collection(db, `companies/${org}/settings`);
let emailAccountsRef: any =
  org && collection(db, `companies/${org}/email_accounts`);
let email_TemplatesRef: any =
  org &&
  collection(db, `companies/${org}/settings/all_settings/email_templates`);
let categoriesRef: any =
  org && collection(db, `companies/${org}/settings/all_settings/categories`);
let companyDetailsRef: any =
  org &&
  collection(db, `companies/${org}/settings/all_settings/company_details`);

//===================================USER===========================================
// Update User Details ================
export const updateUserDetails = (
  id: string,
  name: string,
  dept: string,
  bio: string
) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    name: name,
    dept: dept,
    bio: bio,
  });
};

// Update Agent Online Status ================
export const updateUserStatus = (id: string, status: string) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    status: status,
  });
};

// Update Agent profileUrl on FireBase Doc ================
export const updateProfileUrl = (id: string, photoUrl: any) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    photoUrl: photoUrl,
  });
};

// Update User Uid ================
export const updateUID = (id: string, uid: any) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    uid: uid,
  });
};

// change user active status ================
export const activateUser = (id: string, state: boolean) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    active: state,
  });
};

// Delete User ================
export const deleteUser = (id: string) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  deleteDoc(docRef);
};

// New User =================================
export const createUser = (
  name: string,
  dept: string,
  email: string,
  access: string,
  bio: string,
  active: boolean,
  companies: string
) => {
  addDoc(membersRef, {
    name: name,
    dept: dept,
    email: email,
    access: access,
    bio: bio,
    active: active,
    status: "unavailable",
    photoUrl: "",
    companies: companies,
    uid: "",
  });
};

//===================================NOTIFICATIONS===========================================
// Add Notifications =================================
export const addNotification = (id: any, title: string, message: string) => {
  addDoc(collection(db, `companies/${org}/members/${id}/notifications`), {
    title: title,
    message: message,
    date: new Date().toLocaleString(),
  });
};

//Delete notification ============================
export const deleteNotification = (id: string, user_id: any) => {
  let docRef = doc(db, `companies/${org}/members/${user_id}/notifications`, id);
  deleteDoc(docRef);
};

//===================================CONTACTS MANAGEMENT===========================================
// New Contact =================================
export const newContact = (
  name: string,
  email: string,
  phone: string,
  company: string
) => {
  addDoc(contactsRef, {
    name: name,
    email: email,
    phone: phone,
    branch_company: company,
  });
};

//Edit Contact ========================
export const editContact = (
  id: string,
  name: string,
  phone: string,
  email: string
) => {
  let docRef = doc(db, `companies/${org}/contacts`, id);
  updateDoc(docRef, {
    name: name,
    phone: phone,
    email: email,
  });
};

// Delete Contact ================
export const deleteContact = (id: string) => {
  let docRef = doc(db, `companies/${org}/contacts`, id);
  deleteDoc(docRef);
};

//===================================EMAIL ACCOUNTS MANAGEMENT===========================================
// Update Email Account =================================
export const updateEmailAccount = (
  id: string,
  email: string,
  password: string,
  host: string,
  port: string | number
) => {
  let docRef = doc(db, `companies/${org}/email_accounts`, id);
  updateDoc(docRef, {
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

//New Account ==========================
export const newEmailAccount = (
  name: string,
  email: string,
  password: string,
  host: string,
  port: string | number
) => {
  addDoc(emailAccountsRef, {
    name: name,
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

// Delete Contact ================
export const deleteEmailAccount = (id: string) => {
  let docRef = doc(db, `companies/${org}/email_accounts`, id);
  deleteDoc(docRef);
};

//===================================Templates || Canned Responses===========================================
//New Template ==========================
export const newTemplate = (name: string, message: string) => {
  addDoc(email_TemplatesRef, {
    name: name,
    message: message,
  });
};

// Delete Template ================
export const deleteTemplate = (id: string) => {
  let docRef = doc(
    db,
    `companies/${org}/settings/all_settings/email_templates`,
    id
  );
  deleteDoc(docRef);
};

//===================================TICKETS===========================================
// Resolve Ticket Ticket  ================
export const resolveTicket = (
  id: string,
  solution: string,
  hasRecording: boolean
) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: "solved",
    solution: solution,
    closed_time: new Date().toLocaleString(),
    hasRecording: hasRecording,
  });
};

// Change Reopen Ticket ================
export const reOpenTicket = (id: string) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: "reopened",
    reopened: true,
  });
};

// Change Ticket Status ================
export const changeStatus = (id: string, state: any) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: state,
  });
};

// deleting Tickets
export const deleteTicket = (id: string) => {
  const docRef = doc(db, `companies/${org}/tickets`, id);
  deleteDoc(docRef);
};

// Assign Different Agent ================
export const assignAgent = (
  id: string,
  agent: any,
  email: any,
  assigner: any
) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
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
  message: string,
  message_position: any,
  ticket_id: any,
  user: any,
  email: any,
  from: any,
  r_name: any,
  r_email: any,
  team: any
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
export const markAsSeen = (id: string, readStatus: string) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    readStatus: readStatus,
  });
};

// New Tickects ==============================
export const addTicket = (
  recipient_name: any,
  recipient_email: any,
  agent: any,
  priority: any,
  category: any,
  branch_company: any,
  message: any,
  state: string,
  date: any,
  ticket_id: any,
  agent_email: any,
  c_name: any,
  c_email: any,
  c_number: any,
  team: any,
  hasRecording: string
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
    complainant_email:
      c_email === "" || c_email === undefined || !c_email ? "none" : c_email,
    complainant_number: c_number,
    closed_time: state === "solved" ? new Date().toLocaleString() : "",
    fcr: state === "solved" ? "yes" : "no",
    hasRecording: hasRecording,
    solution: state === "solved" ? message : "",
    reopened: false,
    assigned: false,
    assignee: "",
    assigner: "",
    team: team,
  });
};

//Component ==================================
const TicketsnUserData: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser: any | null = getAuth().currentUser;
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );

  //Data Loading =====================================
  useEffect((): any => {
    return (
      //Members Data Fetching
      org &&
        onSnapshot(membersRef, (snapshot: { docs: any[] }) => {
          dispatch(
            addAllMembers(
              snapshot.docs
                .map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                .sort(
                  (
                    a: { name: string | number },
                    b: { name: string | number }
                  ) => (a.name < b.name ? -1 : 1)
                )
            )
          );
        }),
      //Add User Details ==============
      org &&
        onSnapshot(membersRef, (snapshot: any) => {
          dispatch(
            updateUser(
              snapshot.docs
                .map((doc: any) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                .filter(
                  (member: { email: string }) =>
                    currentUser.email &&
                    member.email.toLowerCase().replace(/\s/g, "") ===
                      currentUser.email.toLowerCase().replace(/\s/g, "")
                )
            )
          );
        }),
      //Tickects Data Fetching ======================
      org &&
        onSnapshot(ticketsRef, (snapshot: { docs: any[] }) => {
          dispatch(
            addAllTickets(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }),
      //Contacts Data Fetching ======================
      org &&
        onSnapshot(contactsRef, (snapshot: { docs: any[] }) => {
          dispatch(
            setContacts(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }),
      //Settings Data Fetching ======================
      org &&
        onSnapshot(settingsRef, (snapshot: { docs: any[] }) => {
          dispatch(
            loadSettings(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }),
      //Email Tenplates Data Fetching ======================
      org &&
        onSnapshot(email_TemplatesRef, (snapshot: { docs: any[] }) => {
          dispatch(
            loadTemplates(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }),
      //Categories Data Fetching ======================
      org &&
        onSnapshot(categoriesRef, (snapshot: { docs: any[] }) => {
          dispatch(
            setCategories(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))[0]?.categories || []
            )
          );
        }),
      //Company Details Data Fetching ======================
      org &&
        onSnapshot(companyDetailsRef, (snapshot: { docs: any[] }) => {
          dispatch(
            setCompanyDetails(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))[0]
            )
          );
        })
    );
  }, [dispatch, currentUser?.email]);

  //Load Email_Accounts ====================
  useEffect(() => {
    return member_details.length >= 1
      ? member_details[0].id &&
          onSnapshot(emailAccountsRef, (snapshot: { docs: any[] }) => {
            member_details[0].id &&
              dispatch(
                loadAccounts(
                  snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                    ...doc.data(),
                    id: doc.id,
                  }))
                )
              );
          })
      : "";
  }, [dispatch, member_details]);

  //Todo CollectionRef and Notifications ====================
  useEffect(() => {
    let toDoRef: any | null =
      org &&
      member_details.length >= 1 &&
      collection(db, `companies/${org}/members/${member_details[0].id}/to-do`);
    let notificationsRef: any | null =
      org &&
      member_details.length >= 1 &&
      collection(
        db,
        `companies/${org}/members/${member_details[0].id}/notifications`
      );
    return member_details.length >= 1
      ? member_details[0].id &&
          (onSnapshot(toDoRef, (snapshot: { docs: any[] }) => {
            dispatch(
              setToDo(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }),
          onSnapshot(notificationsRef, (snapshot: { docs: any[] }) => {
            dispatch(
              setMessages(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }))
      : "";
  }, [dispatch, member_details]);
  return <></>;
};

export default TicketsnUserData;

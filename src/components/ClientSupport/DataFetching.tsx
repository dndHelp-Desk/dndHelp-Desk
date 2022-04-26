import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addAllTickets,
  loadFrequentlyAsked,
} from "../../Redux/Slices/Tickets_n_Settings_Slice";
//Firestore ===================
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { AppDispatch } from "../../Redux/store";

// init services for firestore =========================
const db = getFirestore();
let org = window.location.search?.split(/[=&]/)[1];
let ticketId = "#"+window.location.search?.split(/[=&]/)[1];

// collection ref
let ticketsRef = query(collection(db, `companies/${org}/tickets`), where("ticket_id", "==", ticketId))
let frequentlyAskedRef = collection(
  db,
  `companies/${org}/settings/all_settings/frequently_asked`
);

//Add Reply or Send Reply ============
export const addClientReply = (
  user: any,
  email: any,
  r_name: any,
  r_email: any,
  message: string,
  message_position: any,
  team: any
) => {
  addDoc(collection(db, `companies/${org}/tickets`), {
    date: new Date().toLocaleDateString(),
    from: "client",
    user: user,
    user_email: email,
    recipient_name: r_name,
    recipient_email: r_email,
    message: message,
    message_position: message_position,
    ticket_id: ticketId,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    readStatus: "delivered",
    team: team,
  });
};

//Mark Message as Seen ============
export const markAsSeen = (id:any,readStatus: any) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    readStatus: readStatus,
  });
};

const DataFetching: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  //User/Members Data =====================================
  useEffect(() => {
    return (
      //Tickects Data Fetching ======================
      onSnapshot(ticketsRef, (snapshot) => {
        dispatch(
          addAllTickets(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //frequentlyAsked Data Fetching ======================
      onSnapshot(frequentlyAskedRef, (snapshot) => {
        dispatch(
          loadFrequentlyAsked(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      })
    );
  }, [dispatch]);
  return <></>;
};

export default DataFetching;

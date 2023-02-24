import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const handleSubmit = (name, data) => {
  const ref = collection(firestore, name); // Firebase creates this automatically
  try {
    addDoc(ref, data);
  } catch (err) {
    throw err;
  }
};

export default handleSubmit;
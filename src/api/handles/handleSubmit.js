import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const handleSubmit = (data, name) => {
  const ref = collection(firestore, name); // Firebase creates this automatically
  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
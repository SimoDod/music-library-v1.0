import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const handleUpdate = (name, data, id) => {
    const ref = doc(firestore, "songs", id); // Firebase creates this automatically
    try {
      setDoc(ref, data);
    } catch (err) {
      throw err;
    }
  };
  
  export default handleUpdate;
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "firebaseBackend";

const getAllDocuments = async (collectionName, orderOptions) => {
  const q = query(
    collection(db, collectionName),
    orderBy(orderOptions.name, orderOptions.value)
  );

  const querySnapshot = await getDocs(q);

  let stripeOrders = [];

  querySnapshot.forEach(doc => {
    stripeOrders.push({ ...doc.data(), id: doc.id });
  });

  return stripeOrders;
};

export default getAllDocuments;

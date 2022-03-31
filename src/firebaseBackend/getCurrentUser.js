import { auth } from "firebaseBackend";

const getCurrentUser = () => {
  const user = auth.currentUser;

  if (user) return user;
};

export default getCurrentUser;

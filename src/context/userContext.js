import axios from "../axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchAccount();
  }, []);
  const fetchAccount = async () => {
    await axios
      .get("/account")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(console.error);
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

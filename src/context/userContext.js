import { useLocation } from "react-router-dom";
import axios from "../axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);

    location.pathname !== "/login" &&
      location.pathname !== "/SomethingWrong" &&
      fetchAccount();
  }, []);

  const fetchAccount = async () => {
    console.log("fetchAccount");
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

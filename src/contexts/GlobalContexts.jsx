/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

const context = createContext(null);

const GlobalContexts = ({ children }) => {
  const [test] = useState(0);
  const [jwt, setJwt] = useState(
    Cookies.get("token") ? Cookies.get("token") : null
  );

  const logout = () => {
    Cookies.remove("token");
    console.log(jwt);
    setJwt(null);
  };

  return (
    <context.Provider value={{ test, jwt, setJwt, logout }}>
      {children}
    </context.Provider>
  );
};

export const CTX = () => useContext(context);

export default GlobalContexts;

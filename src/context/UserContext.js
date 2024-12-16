import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const addData = data => setUserData(data);

  return (
    <UserContext.Provider value={{ userData, addData }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };

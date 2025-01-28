import React, { createContext, useState } from "react";

// Tworzę nowy kontekst
const UserContext = createContext();

// własny komponent, żeby dodać logikę do providera
const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const addData = data => setUserData(data);

  return (
    // udostępniam wszystkim dzieciom (app.js) dane z kontekstu za pomocą providera
    <UserContext.Provider value={{ userData, addData }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider };

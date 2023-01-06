import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  const value = {
    loginWithRedirect,
    logout,
    currUser,
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext);
}

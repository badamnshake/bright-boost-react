import React, { createContext, useContext, useState } from 'react';

const SessionIDContext = createContext();

export const useSessionID = () => {
  return useContext(SessionIDContext);
};

export const SessionIDProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);

  return (
    <SessionIDContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </SessionIDContext.Provider>
  );
};
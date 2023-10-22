// SessionIDProvider.js
import React, { createContext, useContext, useState } from 'react';

const SessionIDContext = createContext();

export function SessionIDProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [sessionName, setSessionName] = useState(''); // Example session name
  const [sessionDate, setSessionDate] = useState(''); // Example session date

  return (
    <SessionIDContext.Provider value={{ sessionId, setSessionId, sessionName, sessionDate, setSessionName, setSessionDate }}>
      {children}
    </SessionIDContext.Provider>
  );
}

export function useSessionID() {
  const context = useContext(SessionIDContext);
  if (!context) {
    throw new Error('useSessionID must be used within a SessionIDProvider');
  }
  return context;
}
import { createContext, useState } from 'react';
// actual context which holds some default value
export const SuccessContext = createContext({
  success: 'no-show',
  successMessage: 'generic message',
  setSuccess: () => 'no-show',
  setSuccessMessage: () => null,
});

// provider-component
export const SuccessProvider = ({ children }) => {
  const [success, setSuccess] = useState('no-show');
  const [successMessage, setSuccessMessage] = useState('generic-messagesdg');
  const value = { success, setSuccess, successMessage, setSuccessMessage };
  return (
    <SuccessContext.Provider value={value}>{children}</SuccessContext.Provider>
  );
};

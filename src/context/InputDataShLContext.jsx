import React, { createContext, useState } from 'react';

export const InputDataShLContext = createContext(null)

export const ParentShLComponent = ({children}) => {

  const [inputFirstNameShL, setInputFirstNameShL] = useState('');
  const [inputLastNameShL, setInputLastNameShL] = useState('');
  const [inputDateShL, setInputDateShL] = useState('');
  const [inputScheduleShL, setInputScheduleShL] = useState('');

  const handleInputFirstNameShL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputFirstNameShL(texto);
  };

  const handleInputLastNameShL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputLastNameShL(texto);
  };

  const handleInputDateShL = (e) => {
    setInputDateShL(e);
  };

  const handleInputScheduleShL = (e) => {
    setInputScheduleShL(e);
  };

  return (
    <InputDataShLContext.Provider value={{ inputFirstNameShL, inputLastNameShL, inputDateShL, inputScheduleShL, handleInputFirstNameShL, handleInputLastNameShL, handleInputDateShL, handleInputScheduleShL }}>
      {children}
    </InputDataShLContext.Provider>
  );
}
import React, { createContext, useState } from 'react';

export const InputDataPaLContext = createContext(null)

export const ParentPaLComponent = ({children}) => {

  const [inputFirstNamePaL, setInputFirstNamePaL] = useState('');
  const [inputLastNamePaL, setInputLastNamePaL] = useState('');
  const [inputDniPaL, setInputDniPaL] = useState('');
  const [inputPhonePaL, setInputPhonePaL] = useState('');
  const [inputEmailPaL, setInputEmailPaL] = useState('');

  const handleInputFirstNamePaL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputFirstNamePaL(texto);
  };

  const handleInputLastNamePaL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputLastNamePaL(texto);
  };

  const handleInputDniPaL = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,8}$/.test(inputValue)) {
        setInputDniPaL(inputValue)
    }
  };

  const handleInputPhonePaL = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,13}$/.test(inputValue)) {
        setInputPhonePaL(inputValue);
    }
  };

  const handleInputEmailPaL = (e) => {
    const inputValue = e.target.value;
    setInputEmailPaL(inputValue);
  };
  
  return (
    <InputDataPaLContext.Provider value={{ inputFirstNamePaL, inputLastNamePaL, inputDniPaL, inputPhonePaL, inputEmailPaL, handleInputFirstNamePaL, handleInputLastNamePaL, handleInputDniPaL, handleInputPhonePaL, handleInputEmailPaL }}>
      {children}
    </InputDataPaLContext.Provider>
  );
}
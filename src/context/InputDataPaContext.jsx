import React, { createContext, useState } from 'react';

export const InputDataPaContext = createContext(null)

export const ParentPaComponent = ({children}) => {

  const [inputFirstNamePa, setInputFirstNamePa] = useState('');
  const [inputLastNamePa, setInputLastNamePa] = useState('');
  const [inputDniPa, setInputDniPa] = useState('');
  const [inputPhonePa, setInputPhonePa] = useState('');
  const [inputEmailPa, setInputEmailPa] = useState('');

  const handleInputFirstNamePa = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputFirstNamePa(texto);
  };

  const handleInputLastNamePa = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputLastNamePa(texto);
  };

  const handleInputDniPa = (e) => {
    const inputValue = e.target.value;
    if (/^\d{0,8}$/.test(inputValue)) {
      setInputDniPa(inputValue)
    }
  };

  const handleInputPhonePa = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,13}$/.test(inputValue)) {
      setInputPhonePa(inputValue);
    }
  };

  const handleInputEmailPa = (e) => {
    const inputValue = e.target.value;
    setInputEmailPa(inputValue);
  };

  return (
    <InputDataPaContext.Provider value={{ inputFirstNamePa, inputLastNamePa, inputDniPa, inputPhonePa, inputEmailPa, handleInputFirstNamePa, handleInputLastNamePa, handleInputDniPa, handleInputPhonePa, handleInputEmailPa }}>
      {children}
    </InputDataPaContext.Provider>
  );
}
import React, { createContext, useState } from 'react';

export const InputDataPaContext = createContext(null)

export const ParentPaComponent = ({children}) => {

  const [inputFirstNamePa, setInputFirstNamePa] = useState('');
  const [inputLastNamePa, setInputLastNamePa] = useState('');
  const [inputDniPa, setInputDniPa] = useState('');
  const [inputPhonePa, setInputPhonePa] = useState('');
  const [inputEmailPa, setInputEmailPa] = useState('');

  const handleInputFirstNamePa = (e) => {
    setInputFirstNamePa(e);
  };

  const handleInputLastNamePa = (e) => {
    setInputLastNamePa(e);
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
    setInputEmailPa(e);
  };

  return (
    <InputDataPaContext.Provider value={{ inputFirstNamePa, inputLastNamePa, inputDniPa, inputPhonePa, inputEmailPa, handleInputFirstNamePa, handleInputLastNamePa, handleInputDniPa, handleInputPhonePa, handleInputEmailPa }}>
      {children}
    </InputDataPaContext.Provider>
  );
}
import React, { createContext, useState } from 'react';

export const InputDataPrContext = createContext(null)

export const ParentPrComponent = ({children}) => {

  const [inputBusinessNamePr, setInputBusinessNamePr] = useState('');
  const [inputCuitCuilPr, setInputCuitCuilPr] = useState('');
  const [inputPhonePr, setInputPhonePr] = useState('');
  const [inputEmailPr, setInputEmailPr] = useState('');

  const handleInputBusinessNamePr = (e) => {
    setInputBusinessNamePr(e);
  };

  const handleInputCuitCuilPr = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,11}$/.test(inputValue)) {
      setInputCuitCuilPr(inputValue);
    }
  };

  const handleInputPhonePr = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,13}$/.test(inputValue)) {
      setInputPhonePr(inputValue);
    }
  };

  const handleInputEmailPr = (e) => {
    setInputEmailPr(e);
  };

  return (
    <InputDataPrContext.Provider value={{ inputBusinessNamePr, inputCuitCuilPr, inputPhonePr, inputEmailPr, handleInputBusinessNamePr, handleInputCuitCuilPr, handleInputPhonePr, handleInputEmailPr }}>
      {children}
    </InputDataPrContext.Provider>
  );
}
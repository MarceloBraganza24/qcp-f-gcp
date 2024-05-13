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
    setInputCuitCuilPr(e);
  };

  const handleInputPhonePr = (e) => {
    setInputPhonePr(e);
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
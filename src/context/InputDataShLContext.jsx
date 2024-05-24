import React, { createContext, useState } from 'react';

export const InputDataShLContext = createContext(null)

export const ParentShLComponent = ({children}) => {

  const [inputFirstNameShL, setInputFirstNameShL] = useState('');
  const [inputLastNameShL, setInputLastNameShL] = useState('');
  const [inputDateShL, setInputDateShL] = useState('');
  const [inputScheduleHShL, setInputScheduleHShL] = useState('');
  const [inputScheduleMShL, setInputScheduleMShL] = useState('');

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

  const handleOnBlurInputScheduleHShL = (inputValue) => {
    inputValue.length===1&&setInputScheduleHShL(`0${inputValue}`);
    inputValue===0&&setInputScheduleHShL(`0${inputValue}`);
  };

  const handleOnBlurInputScheduleMShL = (inputValue) => {
    inputValue.length===1&&setInputScheduleMShL(`0${inputValue}`);
    inputValue===0&&setInputScheduleMShL(`0${inputValue}`);
  };

  const handleInputScheduleHShL = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 23 || inputValue==='') {
      setInputScheduleHShL(inputValue);
    }
  };

  const handleInputScheduleMShL = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 59 || inputValue==='') {
      setInputScheduleMShL(inputValue);
    }
  };

  return (
    <InputDataShLContext.Provider value={{ inputFirstNameShL, inputLastNameShL, inputDateShL, inputScheduleHShL, inputScheduleMShL, handleInputFirstNameShL, handleInputLastNameShL, handleInputDateShL, handleInputScheduleHShL, handleInputScheduleMShL, handleOnBlurInputScheduleHShL, handleOnBlurInputScheduleMShL }}>
      {children}
    </InputDataShLContext.Provider>
  );
}
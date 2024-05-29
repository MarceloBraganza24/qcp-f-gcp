import React, { createContext, useState } from 'react';

export const InputDataShContext = createContext(null)

export const ParentComponent = ({children}) => {

  const [inputFirstNameSh, setInputFirstNameSh] = useState('');
  const [inputLastNameSh, setInputLastNameSh] = useState('');
  const [inputDateSh, setInputDateSh] = useState('');
  const [inputScheduleHSh, setInputScheduleHSh] = useState('');
  const [inputScheduleMSh, setInputScheduleMSh] = useState('');
  const [inputOptionSh, setInputOptionSh] = useState('');
  const [inputPriceSh, setInputPriceSh] = useState('');

  const handleInputFirstNameSh = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputFirstNameSh(texto);
  };

  const handleInputLastNameSh = (e) => {
    const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
    setInputLastNameSh(texto);
  };

  const handleInputDateSh = (e) => {
    setInputDateSh(e);
  };

  const handleOnBlurInputScheduleHSh = (inputValue) => {
    inputValue.length===1&&setInputScheduleHSh(`0${inputValue}`);
    inputValue===0&&setInputScheduleHSh(`0${inputValue}`);
  };

  const handleOnBlurInputScheduleMSh = (inputValue) => {
    inputValue.length===1&&setInputScheduleMSh(`0${inputValue}`);
    inputValue===0&&setInputScheduleMSh(`0${inputValue}`);
  };

  const handleInputScheduleHSh = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 23 || inputValue==='') {
      setInputScheduleHSh(inputValue);
    }
  };

  const handleInputScheduleMSh = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 59 || inputValue==='') {
      setInputScheduleMSh(inputValue);
    }
  };

  const handleInputOptionSh = (e) => {
    setInputOptionSh(e);
    handleInputPriceSh(e)
  };

  const handleInputPriceSh = (e) => {
    if(e === 'Caballeros') {
        setInputPriceSh('3000')
    } else if(e === 'Damas') {
        setInputPriceSh('5000')
    } else if(e === 'Niños') {
        setInputPriceSh('2000')
    } else {
        setInputPriceSh('')
    }
  };

  return (
    <InputDataShContext.Provider value={{ inputFirstNameSh, inputLastNameSh, inputDateSh, inputScheduleHSh, inputScheduleMSh, inputOptionSh, inputPriceSh, handleInputFirstNameSh, handleInputLastNameSh, handleInputDateSh, handleInputScheduleHSh, handleInputScheduleMSh, handleInputOptionSh, handleOnBlurInputScheduleHSh, handleOnBlurInputScheduleMSh }}>
      {children}
    </InputDataShContext.Provider>
  );
}
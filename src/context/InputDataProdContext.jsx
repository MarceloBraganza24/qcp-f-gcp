import React, { createContext, useState } from 'react';

export const InputDataProdContext = createContext(null)

export const ParentProdComponent = ({children}) => {

  const [inputTitleProd, setInputTitleProd] = useState('');
  const [inputDescriptionProd, setInputDescriptionProd] = useState('');
  const [inputPriceProd, setInputPriceProd] = useState('');
  const [inputStockProd, setInputStockProd] = useState('');
  const [inputCategoryProd, setInputCategoryProd] = useState('');

  const handleInputTitleProd = (e) => {
    setInputTitleProd(e);
  };

  const handleInputDescriptionProd = (e) => {
    setInputDescriptionProd(e);
  };

  const handleInputPriceProd = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,10}$/.test(inputValue)) {
      setInputPriceProd(inputValue);
      setInputChanges(true);
    } 
  };

  const handleInputStockProd = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,10}$/.test(inputValue)) {
      setInputStockProd(inputValue);
      setInputChanges(true);
    } 
  };

  const handleInputCategoryProd = (e) => {
    setInputCategoryProd(e);
  };

  return (
    <InputDataProdContext.Provider value={{ inputTitleProd, inputDescriptionProd, inputPriceProd, inputStockProd, inputCategoryProd, handleInputTitleProd, handleInputDescriptionProd, handleInputPriceProd, handleInputStockProd, handleInputCategoryProd }}>
      {children}
    </InputDataProdContext.Provider>
  );
}
import React, { useState, useContext } from 'react'
import { toast } from "react-toastify";
import ProductsListModal from './ProductsListModal';
import {InputChangesContext} from '../context/InputChangesContext'; 

const ItemProduct = ({id,title,description,price,stock,category}) => {
    const [inputTitleIProd, setInputTitleIProd] = useState('');
    const [inputDescriptionIProd, setinputDescriptionIProd] = useState('');
    const [inputPriceIProd, setInputPriceIProd] = useState('');
    const [inputStockIProd, setInputStockIProd] = useState('');
    const [inputCategoryIProd, setInputCategoryIProd] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const {inputChanges, handleInputChanges} = useContext(InputChangesContext);

    const handleInputTitleIProd = (e) => {
        setInputTitleIProd(e.target.value);
        handleInputChanges();
    };

    const handleInputDescriptionIProd = (e) => {
        setinputDescriptionIProd(e.target.value);
        handleInputChanges();
    };

    const handleInputPriceIProd = (e) => {
        setInputPriceIProd(e.target.value);
        handleInputChanges();
    };

    const handleInputStockIProd = (e) => {
        setInputStockIProd(e.target.value);
        handleInputChanges();
    };

    const handleInputCategoryIProd = (e) => {
        setInputCategoryIProd(e.target.value);
        handleInputChanges();
    };

    const handleOnBlurInputTitleIProd = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputDescrIProd = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputPriceIProd = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputStockIProd = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputCategIProd = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleFocusInputTitleIProd = () => {
        setModalOpen(false);
    };

    const handleFocusInputDescrIProd = () => {
        setModalOpen(false);
    };

    const handleFocusInputPriceIProd = () => {
        setModalOpen(false);
    };

    const handleFocusInputStockIProd = () => {
        setModalOpen(false);
    };

    const handleFocusInputCategIProd = () => {
        setModalOpen(false);
    };

    const handleBtnDelProduct = async() => {
        const response = await fetch(`http://localhost:8081/api/products/${id}`, {
            method: 'DELETE',         
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.ok) {
            toast('Has eliminado el producto correctamente!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const handleBtnUpdProduct = async() => {
        if(inputTitleIProd === '' && inputDescriptionIProd === '' && inputPriceIProd === '' && inputStockIProd === '' && inputCategoryIProd === '') {
            toast('No tienes cambios para actualizar!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            const productToUpdate = {
                title: inputTitleIProd?inputTitleIProd:title,
                description: inputDescriptionIProd?inputDescriptionIProd:description,
                price: inputPriceIProd?inputPriceIProd:price,
                stock: inputStockIProd?inputStockIProd:stock,
                category: inputCategoryIProd?inputCategoryIProd:category
            }
            const response = await fetch(`http://localhost:8081/api/products/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToUpdate)
            })
            if(response.ok) {
                toast('Has actualizado el producto correctamente!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        }
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };
 
  return (
    <>
        <div className='itemProduct'>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputTitleIProd?title:inputTitleIProd} onFocus={handleFocusInputTitleIProd} onBlur={handleOnBlurInputTitleIProd} onChange={handleInputTitleIProd}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputDescriptionIProd?description:inputDescriptionIProd} onFocus={handleFocusInputDescrIProd} onBlur={handleOnBlurInputDescrIProd} onChange={handleInputDescriptionIProd}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' value={!inputPriceIProd?price:inputPriceIProd} onFocus={handleFocusInputPriceIProd} onBlur={handleOnBlurInputPriceIProd} onChange={handleInputPriceIProd}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' value={!inputStockIProd?stock:inputStockIProd} onFocus={handleFocusInputStockIProd} onBlur={handleOnBlurInputStockIProd} onChange={handleInputStockIProd}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputCategoryIProd?category:inputCategoryIProd} onFocus={handleFocusInputCategIProd} onBlur={handleOnBlurInputCategIProd} onChange={handleInputCategoryIProd}/>
            </div>
            {
                !inputChanges?
                <div className='itemProduct__btns'>
                    <button className='itemProduct__btns__btn' onClick={handleBtnDelProduct}>Borrar</button>
                    <button className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
                </div>
                :
                <div className='itemProduct__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemProduct__btns__btn' onClick={handleBtnDelProduct}>Borrar</button>
                    <button disabled style={buttonDisabledStyle} className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
                </div>
            }
        </div>
        {
            modalOpen && 
            <ProductsListModal
            id={id}
            title={title}
            description={description}
            price={price}
            stock={stock}
            category={category}
            inputTitleIProd={inputTitleIProd}
            inputDescriptionIProd={inputDescriptionIProd}
            inputPriceIProd={inputPriceIProd}
            inputStockIProd={inputStockIProd}
            inputCategoryIProd={inputCategoryIProd}
            />
        }
    </>
  )
}

export default ItemProduct
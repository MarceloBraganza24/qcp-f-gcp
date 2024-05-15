import React, { useState } from 'react'
import { toast } from "react-toastify";
import ProductsListModal from './ProductsListModal';

const ItemProduct = ({id,title,description,price,stock,category}) => {
    const [inputTitleIProd, setInputTitleIProd] = useState('');
    const [inputDescriptionIProd, setinputDescriptionIProd] = useState('');
    const [inputPriceIProd, setInputPriceIProd] = useState('');
    const [inputStockIProd, setInputStockIProd] = useState('');
    const [inputCategoryIProd, setInputCategoryIProd] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const handleOnBlurInputTitleIProd = () => {
        inputTitleIProd!==''?setModalOpen(true):inputDescriptionIProd!==''?setModalOpen(true):inputPriceIProd!==''?setModalOpen(true):inputStockIProd!==''?setModalOpen(true):inputCategoryIProd!==''&&setModalOpen(true)
    }

    const handleOnBlurInputDescrIProd = () => {
        inputTitleIProd!==''?setModalOpen(true):inputDescriptionIProd!==''?setModalOpen(true):inputPriceIProd!==''?setModalOpen(true):inputStockIProd!==''?setModalOpen(true):inputCategoryIProd!==''&&setModalOpen(true)
    }

    const handleOnBlurInputPriceIProd = () => {
        inputTitleIProd!==''?setModalOpen(true):inputDescriptionIProd!==''?setModalOpen(true):inputPriceIProd!==''?setModalOpen(true):inputStockIProd!==''?setModalOpen(true):inputCategoryIProd!==''&&setModalOpen(true)
    }

    const handleOnBlurInputStockIProd = () => {
        inputTitleIProd!==''?setModalOpen(true):inputDescriptionIProd!==''?setModalOpen(true):inputPriceIProd!==''?setModalOpen(true):inputStockIProd!==''?setModalOpen(true):inputCategoryIProd!==''&&setModalOpen(true)
    }

    const handleOnBlurInputCategIProd = () => {
        inputTitleIProd!==''?setModalOpen(true):inputDescriptionIProd!==''?setModalOpen(true):inputPriceIProd!==''?setModalOpen(true):inputStockIProd!==''?setModalOpen(true):inputCategoryIProd!==''&&setModalOpen(true)
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
 
  return (
    <>
        <div className='itemProduct'>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputTitleIProd?title:inputTitleIProd} onFocus={handleFocusInputTitleIProd} onBlur={handleOnBlurInputTitleIProd} onChange={(e) => {setInputTitleIProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputDescriptionIProd?description:inputDescriptionIProd} onFocus={handleFocusInputDescrIProd} onBlur={handleOnBlurInputDescrIProd} onChange={(e) => {setinputDescriptionIProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' value={!inputPriceIProd?price:inputPriceIProd} onFocus={handleFocusInputPriceIProd} onBlur={handleOnBlurInputPriceIProd} onChange={(e) => {setInputPriceIProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' value={!inputStockIProd?stock:inputStockIProd} onFocus={handleFocusInputStockIProd} onBlur={handleOnBlurInputStockIProd} onChange={(e) => {setInputStockIProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' value={!inputCategoryIProd?category:inputCategoryIProd} onFocus={handleFocusInputCategIProd} onBlur={handleOnBlurInputCategIProd} onChange={(e) => {setInputCategoryIProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__btns'>
                <button className='itemProduct__btns__btn' onClick={handleBtnDelProduct}>Borrar</button>
                <button className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
            </div>
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
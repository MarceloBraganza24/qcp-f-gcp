import React, { useState } from 'react'
import { toast } from "react-toastify";

const ItemProduct = ({id,title,description,price,stock,category}) => {
    const [inputTitleProd, setInputTitleProd] = useState('');
    const [inputDescriptionProd, setinputDescriptionProd] = useState('');
    const [inputPriceProd, setInputPriceProd] = useState('');
    const [inputStockProd, setInputStockProd] = useState('');
    const [inputCategoryProd, setInputCategoryProd] = useState('');

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
        if(inputTitleProd === '' && inputDescriptionProd === '' && inputPriceProd === '' && inputStockProd === '' && inputCategoryProd === '') {
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
                title: inputTitleProd?inputTitleProd:title,
                description: inputDescriptionProd?inputDescriptionProd:description,
                price: inputPriceProd?inputPriceProd:price,
                stock: inputStockProd?inputStockProd:stock,
                category: inputCategoryProd?inputCategoryProd:category
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
                <input className='itemProduct__input__prop' placeholder={title} value={inputTitleProd} onChange={(e) => {setInputTitleProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' placeholder={description} value={inputDescriptionProd} onChange={(e) => {setinputDescriptionProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' placeholder={price} value={inputPriceProd} onChange={(e) => {setInputPriceProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' type='number' placeholder={stock} value={inputStockProd} onChange={(e) => {setInputStockProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__input'>
                <input className='itemProduct__input__prop' placeholder={category} value={inputCategoryProd} onChange={(e) => {setInputCategoryProd(e.target.value)}}/>
            </div>
            <div className='itemProduct__btns'>
                <button className='itemProduct__btns__btn' onClick={handleBtnDelProduct}>Borrar</button>
                <button className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
            </div>
        </div>
    </>
  )
}

export default ItemProduct
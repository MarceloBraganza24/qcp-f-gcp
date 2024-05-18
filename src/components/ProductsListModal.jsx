import React, {useState} from 'react'
import { toast } from "react-toastify";

const ProductsListModal = ({id,title,description,price,stock,category}) => {
    const [inputChanges, setInputChanges] = useState(false);

    const [inputTitleIProd, setInputTitleIProd] = useState('');
    const [inputDescriptionIProd, setinputDescriptionIProd] = useState('');
    const [inputPriceIProd, setInputPriceIProd] = useState('');
    const [inputStockIProd, setInputStockIProd] = useState('');
    const [inputCategoryIProd, setInputCategoryIProd] = useState('');

    const handleInputTitleIProd = (e) => {
        const texto = e.target.value;
        setInputTitleIProd(texto);
        setInputChanges(true);
    };

    const handleInputDescriptionIProd = (e) => {
        const texto = e.target.value;
        setinputDescriptionIProd(texto);
        setInputChanges(true);
    };

    const handleInputPriceIProd = (e) => {
        const inputValue = e.target.value;
        if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,10}$/.test(inputValue)) {
            setInputPriceIProd(inputValue);
            setInputChanges(true);
        }
    };

    const handleInputStockIProd = (e) => {
        const inputValue = e.target.value;
        if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,10}$/.test(inputValue)) {
            setInputStockIProd(inputValue);
            setInputChanges(true);
        }
    };

    const handleInputCategoryIProd = (e) => {
        const texto = e.target.value;
        setInputCategoryIProd(texto);
        setInputChanges(true);
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

    return (
    <>
        <div className='productsModalContainer'>
            <div className='productsModalContainer__btnCloseModal'>
                {
                    !inputChanges?
                    <a className='productsModalContainer__btnCloseModal__prop' href="/productsList">cerrar</a>
                    :
                    <div className='productsModalContainer__btnCloseModal__prop'>cerrar</div>
                }
            </div>
            <div className='productsModalContainer__header'>
                <div>Titulo</div>
                <div>Descripción</div>
                <div>Precio</div>
                <div>Stock</div>
                <div>Categoría</div>
            </div>
            <div className='productsModalContainer__itemProduct'>
                <div className='productsModalContainer__itemProduct__input'>
                    <input className='productsModalContainer__itemProduct__input__prop' value={!inputTitleIProd?title:inputTitleIProd} onChange={handleInputTitleIProd}/>
                </div>
                <div className='productsModalContainer__itemProduct__input'>
                    <input className='productsModalContainer__itemProduct__input__prop' value={!inputDescriptionIProd?description:inputDescriptionIProd} onChange={handleInputDescriptionIProd}/>
                </div>
                <div className='productsModalContainer__itemProduct__input'>
                    <input className='productsModalContainer__itemProduct__input__prop' value={!inputPriceIProd?price:inputPriceIProd} onChange={handleInputPriceIProd}/>
                </div>
                <div className='productsModalContainer__itemProduct__input'>
                    <input className='productsModalContainer__itemProduct__input__prop' value={!inputStockIProd?stock:inputStockIProd} onChange={handleInputStockIProd}/>
                </div>
                <div className='productsModalContainer__itemProduct__input'>
                    <input className='productsModalContainer__itemProduct__input__prop' value={!inputCategoryIProd?category:inputCategoryIProd} onChange={handleInputCategoryIProd}/>
                </div>
                <div className='productsModalContainer__itemProduct__btns'>
                    <button className='productsModalContainer__itemProduct__btns__btn' onClick={handleBtnDelProduct}>Borrar</button>
                    <button className='productsModalContainer__itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default ProductsListModal
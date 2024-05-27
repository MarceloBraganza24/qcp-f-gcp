import React, {useState} from 'react'
import { toast } from "react-toastify";

const ProductsListModal = ({id,title,description,price,stock,category}) => {
    const [inputChanges, setInputChanges] = useState(false);

    const [inputTitleIProd, setInputTitleIProd] = useState('');
    const [inputDescriptionIProd, setinputDescriptionIProd] = useState('');
    const [inputPriceIProd, setInputPriceIProd] = useState('');
    const [inputStockIProd, setInputStockIProd] = useState('');
    const [inputCategoryIProd, setInputCategoryIProd] = useState('');

    const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false);

    const handleInputTitleIProd = (e) => {
        const inputValue = e.target.value;
        setInputTitleIProd(inputValue);
        setInputChanges(true);
    };

    const handleInputDescriptionIProd = (e) => {
        const inputValue = e.target.value;
        setinputDescriptionIProd(inputValue);
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
        const inputValue = e.target.value;
        setInputCategoryIProd(inputValue);
        setInputChanges(true);
    };

    const handleBtnDelProduct = async() => {
        setConfirmationDeleteModal(true)
    };

    const handleBtnUpdProduct = async() => {
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
        const data = await response.json();
        if(response.ok) {
            document.getElementById('btnCreateProduct').style.display = 'none';
            document.getElementById('spinnerBtnCreateProduct').style.display = 'block';
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
        if(data.error === 'There is already a product with that title') {
            toast('Ya existe un producto con ese título!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }  else if(data.error === 'There is already a product with that data') {
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
            setInputChanges(false);
        }
    };

    const ConfirmationDeleteModal = () => {

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
            } else {
                toast('Has ocurrido un error al querer eliminar el producto!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        };

        const handleBtnConfirmationDeleteBtnNo = () => {
            setConfirmationDeleteModal(false)
        }

        return (
            <>
                <div className='confirmationDeleteBtnModalContainer'>
                    <div className='confirmationDeleteBtnModalContainer__ask'>¿Estás seguro que deseas borrar el producto?</div>
                    <div className='confirmationDeleteBtnModalContainer__btns'>
                        <button onClick={handleBtnDelProduct} className='confirmationDeleteBtnModalContainer__btns__prop'>Si</button>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnModalContainer__btns__prop'>No</button>
                    </div>
                </div>
            </>
        )
    }

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
                <div className='productsModalContainer__header__label'>Titulo</div>
                <div className='productsModalContainer__header__label'>Descripción</div>
                <div className='productsModalContainer__header__label'>Precio</div>
                <div className='productsModalContainer__header__label'>Stock</div>
                <div className='productsModalContainer__header__label'>Categoría</div>
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
                    <button id='btnCreateProduct' className='productsModalContainer__itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Actualizar</button>
                    <div id='spinnerBtnCreateProduct' className='spinner'></div>
                </div>
            </div>
            {
                confirmationDeleteModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default ProductsListModal
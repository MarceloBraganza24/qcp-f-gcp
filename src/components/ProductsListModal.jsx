import React from 'react'
import { toast } from "react-toastify";

const ProductsListModal = ({id,title,description,price,stock,category,inputTitleIProd,inputDescriptionIProd,inputPriceIProd,inputStockIProd,inputCategoryIProd}) => {

    const handleBtnCloseModal = () => {
        window.location.href = '/productsList'
    }

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
        <div className='modalContainer'>
            <div className='modalContainer__ask'>¿ Deseas guardar los datos modificados del producto</div>
            <div className='modalContainer__name'>{title}{' '}{description} ?</div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnUpdProduct}>Guardar</button>
            </div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnCloseModal}>Salir</button>
            </div>
        </div>
    </>
    )
}

export default ProductsListModal
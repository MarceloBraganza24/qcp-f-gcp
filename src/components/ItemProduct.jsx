import React, { useState, useContext } from 'react'
import ProductsListModal from './ProductsListModal';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ItemProduct = ({id,title,description,price,stock,category}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const {isOpen, handleModal} = useContext(OpenModalContext);

    const handleBtnUpdProduct = async() => {
        setModalOpen(true);
        handleModal(true);
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };
 
  return (
    <>
        <div className='itemProduct'>
            <div className='itemProduct__input'>
                <div className='itemShift__input__prop'>{title}</div>
            </div>
            <div className='itemProduct__input'>
                <div className='itemShift__input__prop'>{description}</div>
            </div>
            <div className='itemProduct__input'>
                <div className='itemShift__input__prop'>{price}</div>
            </div>
            <div className='itemProduct__input'>
                <div className='itemShift__input__prop'>{stock}</div>
            </div>
            <div className='itemProduct__input'>
                <div className='itemShift__input__prop'>{category}</div>
            </div>
            {
                !modalOpen&&!isOpen?
                <div className='itemProduct__btns'>
                    <button className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Editar</button>
                </div>
                :
                <div className='itemProduct__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemProduct__btns__btn' onClick={handleBtnUpdProduct}>Editar</button>
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
            />
        }
    </>
  )
}

export default ItemProduct
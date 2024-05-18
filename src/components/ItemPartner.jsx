import React, { useState, useContext } from 'react'
import PartnersListModal from './PartnersListModal';
import {OpenModalContext} from '../context/OpenModalContext';

const ItemPartner = ({id, first_name,last_name,dni,phone,email}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const {isOpen, handleModal} = useContext(OpenModalContext);

    const handleBtnUpdPartner = async() => {
        setModalOpen(true);
        handleModal(true);
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };
 
  return (
    <>
        <div className='itemPartner'>
            <div className='itemPartner__input'>
                <div className='itemShift__input__prop'>{first_name}</div>
            </div>
            <div className='itemPartner__input'>
                <div className='itemShift__input__prop'>{last_name}</div>
            </div>
            <div className='itemPartner__input'>
                <div className='itemShift__input__prop'>{dni}</div>
            </div>
            <div className='itemPartner__input'>
                <div className='itemShift__input__prop'>{phone}</div>
            </div>
            <div className='itemPartner__input'>
                <div className='itemShift__input__prop'>{email}</div>
            </div>
            {
                !modalOpen&&!isOpen?
                <div className='itemShift__btns'>
                    <button className='itemShift__btns__btn' onClick={handleBtnUpdPartner}>Editar</button>
                </div>
                :
                <div className='itemShift__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemShift__btns__btn' onClick={handleBtnUpdPartner}>Editar</button>
                </div>
            }
        </div>
        {
            modalOpen && 
            <PartnersListModal
            id={id}
            first_name={first_name}
            last_name={last_name}
            dni={dni}
            phone={phone}
            email={email}
            />
        }
    </>
  )
}

export default ItemPartner
import React, { useState, useContext } from 'react'
import ProvidersListModal from './ProvidersListModal';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ItemProvider = ({id,businessName,cuitCuil,phone,email}) => {
    
    const [modalOpen, setModalOpen] = useState(false);
    const {isOpen, handleModal} = useContext(OpenModalContext);

    const handleBtnUpdProvider = async() => {
        setModalOpen(true);
        handleModal(true);
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };
 
  return (
    <>
    
        <div className='itemProvider'>
            <div className='itemProvider__input'>
                <div className='itemProvider__input__prop'>{businessName}</div>
            </div>
            <div className='itemProvider__input'>
                <div className='itemProvider__input__prop'>{cuitCuil}</div>
            </div>
            <div className='itemProvider__input'>
                <div className='itemProvider__input__prop'>{phone}</div>
            </div>
            <div className='itemProvider__input'>
                <div className='itemProvider__input__prop'>{email}</div>
            </div>
            {
                !modalOpen&&!isOpen?
                <div className='itemProvider__btns'>
                    <button className='itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Editar</button>
                </div>
                :
                <div className='itemProvider__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Editar</button>
                </div>
            }
        </div>
        {
            modalOpen && 
            <ProvidersListModal
            id={id}
            businessName={businessName}
            cuitCuil={cuitCuil}
            phone={phone}
            email={email}
            />
        }
    </>
  )
}

export default ItemProvider
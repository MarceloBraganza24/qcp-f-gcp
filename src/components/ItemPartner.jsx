import React, { useState, useContext } from 'react'
import { toast } from "react-toastify";
import PartnersListModal from './PartnersListModal';
import {InputChangesContext} from '../context/InputChangesContext';

const ItemPartner = ({id, first_name,last_name,dni,phone,email}) => {
    const [inputFirstNameIPa, setInputFirstNameIPa] = useState('');
    const [inputLastNameIPa, setInputLastNameIPa] = useState('');
    const [inputDniIPa, setInputDniIPa] = useState('');
    const [inputPhoneIPa, setInputPhoneIPa] = useState('');
    const [inputEmailIPa, setInputEmailIPa] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const {inputChanges, handleInputChanges} = useContext(InputChangesContext);

    const handleInputFirstNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputFirstNameIPa(texto);
        handleInputChanges();
    };

    const handleInputLastNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputLastNameIPa(texto);
        handleInputChanges();
    };

    const handleInputDniIPa = (e) => {
        setInputDniIPa(e.target.value);
        handleInputChanges();
    };

    const handleInputPhoneIPa = (e) => {
        setInputPhoneIPa(e.target.value);
        handleInputChanges();
    };

    const handleInputEmailIPa = (e) => {
        setInputEmailIPa(e.target.value);
        handleInputChanges();
    };

    const handleBtnDelPartner = async() => {
        const response = await fetch(`http://localhost:8081/api/partners/${id}`, {
            method: 'DELETE',         
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.ok) {
            toast('Has eliminado el socio correctamente!', {
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

    const handleBtnUpdPartner = async() => {
        if(inputFirstNameIPa === '' && inputLastNameIPa === '' && inputDniIPa === '' && inputPhoneIPa === '' && inputEmailIPa === '') {
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
            const partnerToUpdate = {
                first_name: inputFirstNameIPa?inputFirstNameIPa:first_name,
                last_name: inputLastNameIPa?inputLastNameIPa:last_name,
                dni: inputDniIPa?inputDniIPa:dni,
                phone: inputPhoneIPa?inputPhoneIPa:phone,
                email: inputEmailIPa?inputEmailIPa:email
            }
            const response = await fetch(`http://localhost:8081/api/partners/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partnerToUpdate)
            })
            if(response.ok) {
                toast('Has actualizado el socio correctamente!', {
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

    const handleOnBlurInputFNIPa = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputLNIPa = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputDniIPa = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputPhoIPa = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleOnBlurInputEmailIPa = () => {
        inputChanges&&setModalOpen(true);
    }

    const handleFocusInputFNIPa = () => {
        setModalOpen(false);
    };

    const handleFocusInputLNIPa = () => {
        setModalOpen(false);
    };

    const handleFocusInputDniIPa = () => {
        setModalOpen(false);
    };

    const handleFocusInputPhoIPa = () => {
        setModalOpen(false);
    };

    const handleFocusInputEmailIPa = () => {
        setModalOpen(false);
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };
 
  return (
    <>
        <div className='itemPartner'>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' value={!inputFirstNameIPa?first_name:inputFirstNameIPa} onFocus={handleFocusInputFNIPa} onBlur={handleOnBlurInputFNIPa} onChange={handleInputFirstNameIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' value={!inputLastNameIPa?last_name:inputLastNameIPa} onFocus={handleFocusInputLNIPa} onBlur={handleOnBlurInputLNIPa} onChange={handleInputLastNameIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' type='number' value={!inputDniIPa?dni:inputDniIPa} onFocus={handleFocusInputDniIPa} onBlur={handleOnBlurInputDniIPa} onChange={handleInputDniIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' type='number' value={!inputPhoneIPa?phone:inputPhoneIPa} onFocus={handleFocusInputPhoIPa} onBlur={handleOnBlurInputPhoIPa} onChange={handleInputPhoneIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onFocus={handleFocusInputEmailIPa} onBlur={handleOnBlurInputEmailIPa} onChange={handleInputEmailIPa}/>
            </div>
            {
                !inputChanges?
                <div className='itemShift__btns'>
                    <button className='itemShift__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                    <button className='itemShift__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
                </div>
                :
                <div className='itemShift__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemShift__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                    <button disabled style={buttonDisabledStyle} className='itemShift__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
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
            inputFirstNameIPa={inputFirstNameIPa}
            inputLastNameIPa={inputLastNameIPa}
            inputDniIPa={inputDniIPa}
            inputPhoneIPa={inputPhoneIPa}
            inputEmailIPa={inputEmailIPa}
            />
        }
    </>
  )
}

export default ItemPartner
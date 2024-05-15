import React, { useState } from 'react'
import { toast } from "react-toastify";
import ProvidersListModal from './ProvidersListModal';

const ItemProvider = ({id,businessName,cuitCuil,phone,email}) => {
    const [inputBusinessNameIPr, setInputBusinessNameIPr] = useState('');
    const [inputCuitCuilIPr, setInputCuitCuilIPr] = useState('');
    const [inputPhoneIPr, setInputPhoneIPr] = useState('');
    const [inputEmailIPr, setInputEmailIPr] = useState('');

    const [modalOpen, setModalOpen] = useState(false);

    const handleOnBlurInputBNIPr = () => {
        inputBusinessNameIPr!==''?setModalOpen(true):inputCuitCuilIPr!==''?setModalOpen(true):inputPhoneIPr!==''?setModalOpen(true):inputEmailIPr!==''&&setModalOpen(true)
    }

    const handleOnBlurInputCCIPr = () => {
        inputBusinessNameIPr!==''?setModalOpen(true):inputCuitCuilIPr!==''?setModalOpen(true):inputPhoneIPr!==''?setModalOpen(true):inputEmailIPr!==''&&setModalOpen(true)
    }

    const handleOnBlurInputPhoIPr = () => {
        inputBusinessNameIPr!==''?setModalOpen(true):inputCuitCuilIPr!==''?setModalOpen(true):inputPhoneIPr!==''?setModalOpen(true):inputEmailIPr!==''&&setModalOpen(true)
    }

    const handleOnBlurInputEmailIPr = () => {
        inputBusinessNameIPr!==''?setModalOpen(true):inputCuitCuilIPr!==''?setModalOpen(true):inputPhoneIPr!==''?setModalOpen(true):inputEmailIPr!==''&&setModalOpen(true)
    }

    const handleFocusInputBNIPr = () => {
        setModalOpen(false);
    };

    const handleFocusInputCCIPr = () => {
        setModalOpen(false);
    };

    const handleFocusInputPhoIPr = () => {
        setModalOpen(false);
    };

    const handleFocusInputEmailIPr = () => {
        setModalOpen(false);
    };

    const handleBtnDelProvider = async() => {
        const response = await fetch(`http://localhost:8081/api/providers/${id}`, {
            method: 'DELETE',         
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.ok) {
            toast('Has eliminado el proveedor correctamente!', {
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

    const handleBtnUpdProvider = async() => {
        if(inputBusinessNameIPr === '' && inputCuitCuilIPr === '' && inputPhoneIPr === '' && inputEmailIPr === '') {
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
            const providerToUpdate = {
                business_name: inputBusinessNameIPr?inputBusinessNameIPr:businessName,
                cuit_cuil: inputCuitCuilIPr?inputCuitCuilIPr:cuitCuil,
                phone: inputPhoneIPr?inputPhoneIPr:phone,
                email: inputEmailIPr?inputEmailIPr:email
            }
            const response = await fetch(`http://localhost:8081/api/providers/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(providerToUpdate)
            })
            if(response.ok) {
                toast('Has actualizado el proveedor correctamente!', {
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
    
        <div className='itemProvider'>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' value={!inputBusinessNameIPr?businessName:inputBusinessNameIPr} onFocus={handleFocusInputBNIPr} onBlur={handleOnBlurInputBNIPr} onChange={(e) => {setInputBusinessNameIPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' type='number' value={!inputCuitCuilIPr?cuitCuil:inputCuitCuilIPr} onFocus={handleFocusInputCCIPr} onBlur={handleOnBlurInputCCIPr}  onChange={(e) => {setInputCuitCuilIPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' type='number' value={!inputPhoneIPr?phone:inputPhoneIPr} onFocus={handleFocusInputPhoIPr} onBlur={handleOnBlurInputPhoIPr}  onChange={(e) => {setInputPhoneIPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' value={!inputEmailIPr?email:inputEmailIPr} onFocus={handleFocusInputEmailIPr} onBlur={handleOnBlurInputEmailIPr}  onChange={(e) => {setInputEmailIPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__btns'>
                <button className='itemProvider__btns__btn' onClick={handleBtnDelProvider}>Borrar</button>
                <button className='itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Actualizar</button>
            </div>
        </div>
        {
            modalOpen && 
            <ProvidersListModal
            id={id}
            businessName={businessName}
            cuitCuil={cuitCuil}
            phone={phone}
            email={email}
            inputBusinessNameIPr={inputBusinessNameIPr}
            inputCuitCuilIPr={inputCuitCuilIPr}
            inputPhoneIPr={inputPhoneIPr}
            inputEmailIPr={inputEmailIPr}
            />
        }
    </>
  )
}

export default ItemProvider
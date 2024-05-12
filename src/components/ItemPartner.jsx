import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";

const ItemPartner = ({id, first_name,last_name,dni,phone,email}) => {
    const [inputFirstNameIPa, setInputFirstNameIPa] = useState('');
    const [inputLastNameIPa, setInputLastNameIPa] = useState('');
    const [inputDniIPa, setInputDniIPa] = useState('');
    const [inputPhoneIPa, setInputPhoneIPa] = useState('');
    const [inputEmailIPa, setInputEmailIPa] = useState('');

    const handleInputFirstNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputFirstNameIPa(texto);
    };

    const handleInputLastNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputLastNameIPa(texto);
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
 
  return (
    <>
        <div className='itemPartner'>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' placeholder={first_name} value={inputFirstNameIPa} onChange={handleInputFirstNameIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' placeholder={last_name} value={inputLastNameIPa} onChange={handleInputLastNameIPa}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' placeholder={dni} value={inputDniIPa} onChange={(e) => {setInputDniIPa(e.target.value)}}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' placeholder={phone} value={inputPhoneIPa} onChange={(e) => {setInputPhoneIPa(e.target.value)}}/>
            </div>
            <div className='itemPartner__input'>
                <input className='itemPartner__input__prop' placeholder={email} value={inputEmailIPa} onChange={(e) => {setInputEmailIPa(e.target.value)}}/>
            </div>
            <div className='itemShift__btns'>
                <button className='itemShift__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                <button className='itemShift__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
            </div>
        </div>
    </>
  )
}

export default ItemPartner
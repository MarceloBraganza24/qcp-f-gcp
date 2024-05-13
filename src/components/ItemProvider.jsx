import React, { useState } from 'react'
import { toast } from "react-toastify";

const ItemProvider = ({id,businessName,cuitCuil,phone,email}) => {
    const [inputBusinessNamePr, setInputBusinessNamePr] = useState('');
    const [inputCuitCuilPr, setInputCuitCuilPr] = useState('');
    const [inputPhonePr, setInputPhonePr] = useState('');
    const [inputEmailPr, setInputEmailPr] = useState('');

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
        if(inputBusinessNamePr === '' && inputCuitCuilPr === '' && inputPhonePr === '' && inputEmailPr === '') {
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
                business_name: inputBusinessNamePr?inputBusinessNamePr:businessName,
                cuit_cuil: inputCuitCuilPr?inputCuitCuilPr:cuitCuil,
                phone: inputPhonePr?inputPhonePr:phone,
                email: inputEmailPr?inputEmailPr:email
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
                <input className='itemProvider__input__prop' placeholder={businessName} value={inputBusinessNamePr} onChange={(e) => {setInputBusinessNamePr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' type='number' placeholder={cuitCuil} value={inputCuitCuilPr} onChange={(e) => {setInputCuitCuilPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' type='number' placeholder={phone} value={inputPhonePr} onChange={(e) => {setInputPhonePr(e.target.value)}}/>
            </div>
            <div className='itemProvider__input'>
                <input className='itemProvider__input__prop' placeholder={email} value={inputEmailPr} onChange={(e) => {setInputEmailPr(e.target.value)}}/>
            </div>
            <div className='itemProvider__btns'>
                <button className='itemProvider__btns__btn' onClick={handleBtnDelProvider}>Borrar</button>
                <button className='itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Actualizar</button>
            </div>
        </div>
    </>
  )
}

export default ItemProvider
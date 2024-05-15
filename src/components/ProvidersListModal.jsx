import React from 'react'
import { toast } from "react-toastify";

const ProvidersListModal = ({id,businessName,cuitCuil,phone,email,inputBusinessNameIPr,inputCuitCuilIPr,inputPhoneIPr,inputEmailIPr,}) => {

    const handleBtnCloseModal = () => {
        window.location.href = '/providersList'
    }

    const handleBtnUpdProvider = async() => {
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
    };

    return (
    <>
        <div className='modalContainer'>
            <div className='modalContainer__ask'>¿ Deseas guardar los datos modificados del proveedor</div>
            <div className='modalContainer__name'>{businessName} ?</div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnUpdProvider}>Guardar</button>
            </div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnCloseModal}>Salir</button>
            </div>
        </div>
    </>
    )
}

export default ProvidersListModal
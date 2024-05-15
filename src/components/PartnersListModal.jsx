import React from 'react'
import { toast } from "react-toastify";

const PartnersListModal = ({id,first_name,last_name,dni,phone,email,inputFirstNameIPa,inputLastNameIPa,inputDniIPa,inputPhoneIPa,inputEmailIPa}) => {

    const handleBtnCloseModal = () => {
        window.location.href = '/partnersList'
    }

    const handleBtnUpdPartner = async() => {
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
    };

    return (
    <>
        <div className='modalContainer'>
            <div className='modalContainer__ask'>¿ Deseas guardar los datos modificados del socio</div>
            <div className='modalContainer__name'>{first_name}{' '}{last_name} ?</div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnUpdPartner}>Guardar</button>
            </div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnCloseModal}>Salir</button>
            </div>
        </div>
    </>
    )
}

export default PartnersListModal
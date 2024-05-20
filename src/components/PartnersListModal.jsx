import React, {useState} from 'react'
import { toast } from "react-toastify";

const PartnersListModal = ({id,first_name,last_name,dni,phone,email}) => {
    const [inputChanges, setInputChanges] = useState(false);

    const [inputFirstNameIPa, setInputFirstNameIPa] = useState('');
    const [inputLastNameIPa, setInputLastNameIPa] = useState('');
    const [inputDniIPa, setInputDniIPa] = useState('');
    const [inputPhoneIPa, setInputPhoneIPa] = useState('');
    const [inputEmailIPa, setInputEmailIPa] = useState('');

    const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false);

    const handleInputFirstNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputFirstNameIPa(texto);
        setInputChanges(true);
    };

    const handleInputLastNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputLastNameIPa(texto);
        setInputChanges(true);
    };

    const handleInputDniIPa = (e) => {
        const inputValue = e.target.value;
        if (/^\d{0,8}$/.test(inputValue)) {
            setInputDniIPa(inputValue)
            setInputChanges(true);
        }
    };

    const handleInputPhoneIPa = (e) => {
        const inputValue = e.target.value;
        if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,13}$/.test(inputValue)) {
            setInputPhoneIPa(inputValue);
            setInputChanges(true);
        }
    };

    const handleInputEmailIPa = (e) => {
        const texto = e.target.value;
        setInputEmailIPa(texto);
        setInputChanges(true);
    };

    const handleBtnDelPartner = async() => {
        setConfirmationDeleteModal(true)
    };

    /* const handleBtnDelPartner = async() => {
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
    }; */

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
        const data = await response.json();
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
        if(data.error === 'There is already a partner with that DNI and email') {
            toast('Ya existe un socio con ese dni y email!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(data.error === 'There is already a partner with that DNI') {
            toast('Ya existe un socio con ese DNI!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(data.error === 'There is already a partner with that email') {
            toast('Ya existe un socio con ese email!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(data.error === 'There is already a partner with that data') {
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
        }
    };

    const ConfirmationDeleteModal = () => {

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
            } else {
                toast('Has ocurrido un error al querer eliminar el turno!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        };

        const handleBtnConfirmationDeleteBtnNo = () => {
            setConfirmationDeleteModal(false)
        }

        return (
            <>
                <div className='confirmationDeleteBtnModalContainer'>
                    <div className='confirmationDeleteBtnModalContainer__ask'>¿Estás seguro que deseas borrar el turno?</div>
                    <div className='confirmationDeleteBtnModalContainer__btns'>
                        <button onClick={handleBtnDelPartner} className='confirmationDeleteBtnModalContainer__btns__prop'>Si</button>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnModalContainer__btns__prop'>No</button>
                    </div>
                </div>
            </>
        )
    }

    return (
    <>
        
        <div className='partnersModalContainer'>
            <div className='partnersModalContainer__btnCloseModal'>
                {
                    !inputChanges?
                    <a className='partnersModalContainer__btnCloseModal__prop' href="/partnersList">cerrar</a>
                    :
                    <div className='partnersModalContainer__btnCloseModal__prop'>cerrar</div>
                }
            </div>
            <div className='partnersModalContainer__header'>
                <div>Nombre</div>
                <div>Apellido</div>
                <div>Dni</div>
                <div>Teléfono</div>
                <div>Email</div>
            </div>
            <div className='partnersModalContainer__itemPartner'>
                <div className='partnersModalContainer__itemPartner__input'>
                    <input className='partnersModalContainer__itemPartner__input__prop' value={!inputFirstNameIPa?first_name:inputFirstNameIPa} onChange={handleInputFirstNameIPa}/>
                </div>
                <div className='partnersModalContainer__itemPartner__input'>
                    <input className='partnersModalContainer__itemPartner__input__prop' value={!inputLastNameIPa?last_name:inputLastNameIPa} onChange={handleInputLastNameIPa}/>
                </div>
                <div className='partnersModalContainer__itemPartner__input'>
                    <input className='partnersModalContainer__itemPartner__input__prop' value={!inputDniIPa?dni:inputDniIPa} onChange={handleInputDniIPa}/>
                </div>
                <div className='partnersModalContainer__itemPartner__input'>
                    <input className='partnersModalContainer__itemPartner__input__prop' value={!inputPhoneIPa?phone:inputPhoneIPa} onChange={handleInputPhoneIPa}/>
                </div>
                <div className='partnersModalContainer__itemPartner__input'>
                    <input className='partnersModalContainer__itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onChange={handleInputEmailIPa}/>
                </div>
                <div className='partnersModalContainer__itemPartner__btns'>
                    <button className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                    <button className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
                </div>
            </div>
            {
                confirmationDeleteModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default PartnersListModal
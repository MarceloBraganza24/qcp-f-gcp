import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const PartnersListModal = ({id,first_name,last_name,dni,phone,email}) => {
    const [inputFirstNameIPa, setInputFirstNameIPa] = useState('');
    const [inputLastNameIPa, setInputLastNameIPa] = useState('');
    const [inputDniIPa, setInputDniIPa] = useState('');
    const [inputPhoneIPa, setInputPhoneIPa] = useState('');
    const [inputEmailIPa, setInputEmailIPa] = useState('');

    const [confirmationDelPartnersModal, handleConfirmationDelPartnersModal] = useState(false);

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
        handleConfirmationDelPartnersModal(true);
        setInputChanges(true);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnUpdPartner = async() => {
        if (!validateEmail(inputEmailIPa?inputEmailIPa:email)) {
            toast('El email no es válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(inputFirstNameIPa !== first_name || inputLastNameIPa !== last_name || inputDniIPa !== dni || inputPhoneIPa !== phone || inputEmailIPa !== email) {
            const partnerToUpdate = {
                first_name: inputFirstNameIPa?inputFirstNameIPa:first_name,
                last_name: inputLastNameIPa?inputLastNameIPa:last_name,
                dni: inputDniIPa?inputDniIPa:dni,
                phone: inputPhoneIPa?inputPhoneIPa:phone,
                email: inputEmailIPa?inputEmailIPa:email
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partnerToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                document.getElementById('btnCreatePartner').style.display = 'none';
                document.getElementById('spinnerBtnCreatePartner').style.display = 'block';
                toast('Has actualizado el turno correctamente!', {
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
                    window.location.href = '/partnersList';
                }, 1500);
            } else if (response.status === 409) {
                toast('Ya existe un socio con ese email!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
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
                setInputChanges(false);
            }
        }
    };

    const ConfirmationDeleteModal = () => {
        const handleBtnDelPartner = async() => {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners/${id}`, {
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
            handleConfirmationDelPartnersModal(false);
        }

        return (
            <>
                <div className='confirmationDeleteBtnPartnersListModalContainer'>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__ask'>¿Estás seguro que deseas borrar el socio?</div>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile__ask'>borrar el socio?</div>
                    </div>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__btns'>
                        <button onClick={handleBtnDelPartner} className='confirmationDeleteBtnPartnersListModalContainer__btns__prop'>Si</button>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnPartnersListModalContainer__btns__prop'>No</button>
                    </div>
                </div>
            </>
        )
    }

    const closeM = () => {
        window.reload();
    }

    const buttonDisabledStyle = {
        color: 'white',
        cursor: 'pointer'
    };

    return (
    <>
        
        <div className='partnersModalContainer'>
            <div className='partnersModalContainer__btnCloseModal'>
                {
                    !confirmationDelPartnersModal?
                    <Link onClick={closeM} to={"/partnersList"} className='partnersModalContainer__btnCloseModal__prop'>
                        Cerrar
                    </Link>
                    :
                    <div className='partnersModalContainer__btnCloseModal__prop'>Cerrar</div>
                }
            </div>
            <div className='partnersModalContainer__header'>
                <div className='partnersModalContainer__header__label'>Nombre</div>
                <div className='partnersModalContainer__header__label'>Apellido</div>
                <div className='partnersModalContainer__header__label'>Dni</div>
                <div className='partnersModalContainer__header__label'>Teléfono</div>
                <div className='partnersModalContainer__header__label'>Email</div>
            </div>
            <div className='partnersModalContainer__itemPartner'>
                {
                    !confirmationDelPartnersModal?
                    <>
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
                            <input type='email' className='partnersModalContainer__itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onChange={handleInputEmailIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__btns'>
                            <button className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                            {
                                !confirmationDelPartnersModal?
                                <button id='btnCreatePartner' className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
                                :
                                <button disabled id='btnUpdateShift' style={buttonDisabledStyle} className='partnersModalContainer__itemPartner__btns__btn'>Actualizar</button>
                            }
                            <div id='spinnerBtnCreatePartner' className='spinner'></div>
                        </div>
                    </>
                    :
                    <>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputFirstNameIPa?first_name:inputFirstNameIPa} onChange={handleInputFirstNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputLastNameIPa?last_name:inputLastNameIPa} onChange={handleInputLastNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputDniIPa?dni:inputDniIPa} onChange={handleInputDniIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputPhoneIPa?phone:inputPhoneIPa} onChange={handleInputPhoneIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled type='email' className='partnersModalContainer__itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onChange={handleInputEmailIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__btns'>
                            <button className='partnersModalContainer__itemPartner__btns__btn'>Borrar</button>
                            <button disabled id='btnUpdateShift' style={buttonDisabledStyle} className='partnersModalContainer__itemPartner__btns__btn'>Actualizar</button>
                        </div>
                    </>
                }
            </div>
            {
                confirmationDelPartnersModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default PartnersListModal
import React, {useState} from 'react'
import { toast } from "react-toastify";

const ProvidersListModal = ({id,businessName,cuitCuil,phone,email}) => {
    const [inputChanges, setInputChanges] = useState(false);

    const [inputBusinessNameIPr, setInputBusinessNameIPr] = useState('');
    const [inputCuitCuilIPr, setInputCuitCuilIPr] = useState('');
    const [inputPhoneIPr, setInputPhoneIPr] = useState('');
    const [inputEmailIPr, setInputEmailIPr] = useState('');

    const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false);

    const handleInputBusinessNameIPr = (e) => {
        const texto = e.target.value;
            setInputBusinessNameIPr(texto);
            setInputChanges(true);
    };

    const handleInputCuitCuilIIPr = (e) => {
        const inputValue = e.target.value;
        if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,11}$/.test(inputValue)) {
            setInputCuitCuilIPr(inputValue);
            setInputChanges(true);
        }
    };

    const handleInputPhoneIPr = (e) => {
        const inputValue = e.target.value;
        if (/^[0-9-+() ]*$/.test(inputValue) && /^\d{0,13}$/.test(inputValue)) {
            setInputPhoneIPr(inputValue);
            setInputChanges(true);
        }
    };

    const handleInputEmailIPr = (e) => {
        const inputValue = e.target.value;
        setInputEmailIPr(inputValue);
        setInputChanges(true);
    };

    const handleBtnDelProvider = async() => {
        setConfirmationDeleteModal(true)
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnUpdProvider = async() => {
        if (!validateEmail(inputEmailIPr?inputEmailIPr:email)) {
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
        } else {
            const providerToUpdate = {
                business_name: inputBusinessNameIPr?inputBusinessNameIPr:businessName,
                cuit_cuil: inputCuitCuilIPr?inputCuitCuilIPr:cuitCuil,
                phone: inputPhoneIPr?inputPhoneIPr:phone,
                email: inputEmailIPr?inputEmailIPr:email
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/providers/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(providerToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                document.getElementById('btnCreateProvider').style.display = 'none';
                document.getElementById('spinnerBtnCreateProvider').style.display = 'block';
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
            } else if (response.status === 409) {
                toast('Ya existe un proveedor con ese email!', {
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
            if(data.error === 'There is already a provider with that CUIT-CUIL') {
                toast('Ya existe un proveedor con ese CUIT-CUIL!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a provider with that email') {
                toast('Ya existe un proveedor con ese email!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a provider with that business name') {
                toast('Ya existe un proveedor con esa razón social!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a provider with that data') {
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

        const handleBtnDelProvider = async() => {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/providers/${id}`, {
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
            } else {
                toast('Has ocurrido un error al querer eliminar el proveeedor!', {
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
                    <div className='confirmationDeleteBtnModalContainer__ask'>¿Estás seguro que deseas borrar el proveedor?</div>
                    <div className='confirmationDeleteBtnModalContainer__btns'>
                        <button onClick={handleBtnDelProvider} className='confirmationDeleteBtnModalContainer__btns__prop'>Si</button>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnModalContainer__btns__prop'>No</button>
                    </div>
                </div>
            </>
        )
    }

    return (
    <>
        <div className='providersModalContainer'>
            <div className='providersModalContainer__btnCloseModal'>
                {
                    !inputChanges?
                    <a className='providersModalContainer__btnCloseModal__prop' href="/providersList">cerrar</a>
                    :
                    <div className='providersModalContainer__btnCloseModal__prop'>cerrar</div>
                }
            </div>
            <div className='providersModalContainer__header'>
                <div className='providersModalContainer__header__label'>Razón social</div>
                <div className='providersModalContainer__header__label'>CUIT-CUIL</div>
                <div className='providersModalContainer__header__label'>Teléfono</div>
                <div className='providersModalContainer__header__label'>Email</div>
            </div>
            <div className='providersModalContainer__itemProvider'>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputBusinessNameIPr?businessName:inputBusinessNameIPr} onChange={handleInputBusinessNameIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputCuitCuilIPr?cuitCuil:inputCuitCuilIPr} onChange={handleInputCuitCuilIIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputPhoneIPr?phone:inputPhoneIPr} onChange={handleInputPhoneIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputEmailIPr?email:inputEmailIPr} onChange={handleInputEmailIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__btns'>
                    <button className='providersModalContainer__itemProvider__btns__btn' onClick={handleBtnDelProvider}>Borrar</button>
                    <button id='btnCreateProvider' className='providersModalContainer__itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Actualizar</button>
                    <div id='spinnerBtnCreateProvider' className='spinner'></div>
                </div>
            </div>
            {
                confirmationDeleteModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default ProvidersListModal
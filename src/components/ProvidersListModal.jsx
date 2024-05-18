import React, {useState} from 'react'
import { toast } from "react-toastify";

const ProvidersListModal = ({id,businessName,cuitCuil,phone,email}) => {
    const [inputChanges, setInputChanges] = useState(false);

    const [inputBusinessNameIPr, setInputBusinessNameIPr] = useState('');
    const [inputCuitCuilIPr, setInputCuitCuilIPr] = useState('');
    const [inputPhoneIPr, setInputPhoneIPr] = useState('');
    const [inputEmailIPr, setInputEmailIPr] = useState('');

    const handleInputBusinessNameIPr = (e) => {
        const texto = e.target.value;
        setInputBusinessNameIPr(texto);
        setInputChanges(true);
    };

    const handleInputCuitCuilIIPr = (e) => {
        const texto = e.target.value;
        setInputCuitCuilIPr(texto);
        setInputChanges(true);
    };

    const handleInputPhoneIPr = (e) => {
        const texto = e.target.value;
        setInputPhoneIPr(texto);
        setInputChanges(true);
    };

    const handleInputEmailIPr = (e) => {
        const texto = e.target.value;
        setInputEmailIPr(texto);
        setInputChanges(true);
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
                <div>Razón social</div>
                <div>CUIT-CUIL</div>
                <div>Teléfono</div>
                <div>Email</div>
            </div>
            <div className='providersModalContainer__itemProvider'>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputBusinessNameIPr?businessName:inputBusinessNameIPr} onChange={handleInputBusinessNameIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' type='number' value={!inputCuitCuilIPr?cuitCuil:inputCuitCuilIPr} onChange={handleInputCuitCuilIIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' type='number' value={!inputPhoneIPr?phone:inputPhoneIPr} onChange={handleInputPhoneIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__input'>
                    <input className='providersModalContainer__itemProvider__input__prop' value={!inputEmailIPr?email:inputEmailIPr} onChange={handleInputEmailIPr}/>
                </div>
                <div className='providersModalContainer__itemProvider__btns'>
                    <button className='providersModalContainer__itemProvider__btns__btn' onClick={handleBtnDelProvider}>Borrar</button>
                    <button className='providersModalContainer__itemProvider__btns__btn' onClick={handleBtnUpdProvider}>Actualizar</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default ProvidersListModal
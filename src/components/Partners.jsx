import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataPaContext} from '../context/InputDataPaContext';
import HMenu from './HMenu';

const Partners = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const { inputFirstNamePa, handleInputFirstNamePa, inputLastNamePa, handleInputLastNamePa, inputDniPa, handleInputDniPa, inputPhonePa, handleInputPhonePa, inputEmailPa, handleInputEmailPa } = useContext(InputDataPaContext);
    initMercadoPago('APP_USR-c6a80bf1-6064-4d38-85c2-873ae24113ef', {
        locale: 'es-AR'
    });
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const pagarCuotaSocioBtn = document.getElementById('pagarCuotaSocioBtn');

    useEffect(() => {
        const getCookie = (name) => {
            const cookieName = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
            }
            return "";
        };
        const cookieValue = getCookie('TokenJWT');
        const fetchData = async () => {
            try {
              const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/sessions/current?cookie=${cookieValue}`)
              const data = await response.json();
              if(data.error === 'jwt expired') {
                logout()
              } else {
                const user = data.data
                setRole(user.role)
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
        fetchData();
        if(cookieValue) {
            login()
        } else {
            logout()
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const pagarCuotaSocio = async () => {
        try {
            const order = {
                title: 'Cuota socio',
                quantity: 1,
                unit_price: 500,
                first_name: inputFirstNamePa,
                last_name: inputLastNamePa,
                dni: inputDniPa,
                phone: inputPhonePa,
                email: inputEmailPa
            }
            if(!inputFirstNamePa || !inputLastNamePa || !inputDniPa || !inputPhonePa || !inputEmailPa) {
                toast('Debes completar todos los campos', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (!validateEmail(inputEmailPa)) {
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
                const response = await fetch('https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners')
                const res = await response.json();
                const partners = res.data;
                const partnerByDniExists = partners.find(item => item.dni === Number(inputDniPa))
                const partnerByEmailExists = partners.find(item => item.email === inputEmailPa)
                if(partnerByDniExists) {
                    toast('Ya existe un socio con ese DNI!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else if(partnerByEmailExists) {
                    toast('Ya existe un socio con ese email!', {
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
                    pagarCuotaSocioBtn.style.display = 'none';
                    const preference = await fetch('https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/create-preference-partner', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(order)
                    })
                    const responsePref = await preference.json();
                    if(responsePref.id) {
                        const id = responsePref.id;
                        return id;
                    } else {
                        toast('Ha ocurrido un error al intentar pagar el turno, intente nuevamente', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });                    
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handlePartnerPay = async (evt) => {
        evt.preventDefault();
        const id = await pagarCuotaSocio();
        if(id) setPreferenceId(id);
    };

    const loginToast = (event) => {
        event.preventDefault();
        toast('Debes iniciar sesión para registrarte como socio', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

  return (
      <>
            <NavBar/>
            {
                isLoggedIn && role==='admin'?
                <>
                    <HMenu/>
                    <div className='partnersContainerIsLoggedIn'>
                        <div className='partnersContainerIsLoggedIn__form'>
                            <h2 className='partnersContainerIsLoggedIn__form__phrase'>Registrate aquí mismo</h2>
                            <div className='partnersContainerIsLoggedIn__form__credentials'>
                                <form>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNamePa} onChange={handleInputFirstNamePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Apellido' value={inputLastNamePa} onChange={handleInputLastNamePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Dni:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Dni' value={inputDniPa} onChange={handleInputDniPa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Teléfono:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Teléfono' value={inputPhonePa} onChange={handleInputPhonePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Email:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='email' placeholder='Email' value={inputEmailPa} onChange={handleInputEmailPa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__btn'>
                                        <button id='pagarCuotaSocioBtn' className='partnersContainerIsLoggedIn__form__credentials__btn__prop' onClick={handlePartnerPay}>Registrarse</button>
                                    </div> 
                                </form>
                            </div>
                            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                        </div>
                    </div>
                    <LogOut/> 
                </>
                : isLoggedIn?
                <>
                    <div className='partnersContainerIsLoggedIn'>
                        <div className='partnersContainerIsLoggedIn__form'>
                            <h2 className='partnersContainerIsLoggedIn__form__phrase'>Registrate aquí mismo</h2>
                            <div className='partnersContainerIsLoggedIn__form__credentials'>
                                <form>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNamePa} onChange={handleInputFirstNamePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Apellido' value={inputLastNamePa} onChange={handleInputLastNamePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Dni:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Dni' value={inputDniPa} onChange={handleInputDniPa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Teléfono:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Teléfono' value={inputPhonePa} onChange={handleInputPhonePa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                        <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Email:</h2>
                                        <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='email' placeholder='Email' value={inputEmailPa} onChange={handleInputEmailPa}/>
                                    </div>
                                    <div className='partnersContainerIsLoggedIn__form__credentials__btn'>
                                        <button id='pagarCuotaSocioBtn' className='partnersContainerIsLoggedIn__form__credentials__btn__prop' onClick={handlePartnerPay}>Registrarse</button>
                                    </div> 
                                </form>
                            </div>
                            {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                        </div>
                    </div>
                    <LogOut/> 
                </>
                :
                <>
                    <div className='warningLogin'>
                    <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
                    </div>
                    <div className='partnersContainer'>
                        <div className='partnersContainer__form'>
                            <h2 className='partnersContainer__form__phrase'>Registrate aquí mismo</h2>
                            <div className='partnersContainer__form__credentials'>
                                <form>
                                    <div className='partnersContainer__form__credentials__label-input'>
                                        <h2 className='partnersContainer__form__credentials__label-input__label'>Nombre:</h2>
                                        <input className='partnersContainer__form__credentials__label-input__input' disabled placeholder='Nombre' onChange={(e) => {setFirstName(e.target.value)}}/>
                                    </div>
                                    <div className='partnersContainer__form__credentials__label-input'>
                                        <h2 className='partnersContainer__form__credentials__label-input__label'>Apellido:</h2>
                                        <input className='partnersContainer__form__credentials__label-input__input' disabled placeholder='Apellido' onChange={(e) => {setLastName(e.target.value)}}/>
                                    </div>
                                    <div className='partnersContainer__form__credentials__label-input'>
                                        <h2 className='partnersContainer__form__credentials__label-input__label'>Dni:</h2>
                                        <input className='partnersContainer__form__credentials__label-input__input' disabled type='number' placeholder='Dni' onChange={(e) => {setDni(e.target.value)}}/>
                                    </div>
                                    <div className='partnersContainer__form__credentials__label-input'>
                                        <h2 className='partnersContainer__form__credentials__label-input__label'>Teléfono:</h2>
                                        <input className='partnersContainer__form__credentials__label-input__input' disabled type='number' placeholder='Teléfono' onChange={(e) => {setPhone(e.target.value)}}/>
                                    </div>
                                    <div className='partnersContainer__form__credentials__label-input'>
                                        <h2 className='partnersContainer__form__credentials__label-input__label'>Email:</h2>
                                        <input className='partnersContainer__form__credentials__label-input__input' disabled type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                                    </div>
                                    <div className='partnersContainer__form__credentials__btn'>
                                        <button className='partnersContainer__form__credentials__btn__prop' onClick={loginToast}>Registrarse</button>
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        <Footer/>
    </>
  )
}

export default Partners
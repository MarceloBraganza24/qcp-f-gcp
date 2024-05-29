import React, { useState, useEffect, useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataShContext} from '../context/InputDataShContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import HMenu from './HMenu';

const Shifts = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const { inputFirstNameSh, handleInputFirstNameSh, inputLastNameSh, handleInputLastNameSh, inputDateSh, handleInputDateSh, inputScheduleHSh, inputScheduleMSh, handleInputScheduleHSh, handleInputScheduleMSh, inputOptionSh, handleInputOptionSh, inputPriceSh, handleOnBlurInputScheduleHSh, handleOnBlurInputScheduleMSh } = useContext(InputDataShContext);
    const options = ["Elije tu turno","Caballeros", "Damas", "Niños"];
    initMercadoPago('APP_USR-c6a80bf1-6064-4d38-85c2-873ae24113ef', {
        locale: 'es-AR'
    });
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const pagarTurnoBtn = document.getElementById('pagarTurnoBtn');

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

    const pagarTurno = async () => {
        
        try {
            const scheduleConcat = inputScheduleHSh + ':' + inputScheduleMSh
            const order = {
                title: inputOptionSh,
                quantity: 1,
                unit_price: inputPriceSh,
                first_name: inputFirstNameSh,
                last_name: inputLastNameSh,
                date: inputDateSh,
                schedule: scheduleConcat
            }
            if(!inputFirstNameSh || !inputLastNameSh || !inputDateSh || !inputScheduleHSh || !inputScheduleMSh || !inputPriceSh) {
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
            } else {
                const year = inputDateSh.getFullYear();
                const month = String(inputDateSh.getMonth() + 1).padStart(2, '0');
                const day = String(inputDateSh.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                const response = await fetch('https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/shifts')
                const res = await response.json();
                const shifts = res.data;
                const partnerByDateScheduleExists = shifts.find(item => item.date === formattedDate && item.schedule === scheduleConcat)
                if(partnerByDateScheduleExists) {
                    toast('Ya existe un turno con esa fecha y horario!', {
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
                    pagarTurnoBtn.style.display = 'none';
                    const preference = await fetch('https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/payments/create-preference-shift', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(order)
                    })
                    const response = await preference.json();
                    if(response.id) {
                        const id = response.id;
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

    const handleBuy = async (evt) => {
        evt.preventDefault();
        const id = await pagarTurno();
        if(id) setPreferenceId(id);
    };

    const handleDateChange = date => {
        handleInputDateSh(date);
    };

    const handleOnBlurInputScheduleH = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0 && inputValue < 10) {
            handleOnBlurInputScheduleHSh(inputValue);
        }
    }

    const handleOnBlurInputScheduleM = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0 && inputValue < 10) {
            handleOnBlurInputScheduleMSh(inputValue);
        }
    }
    
    const loginToast = async (evt) => {
        evt.preventDefault();
        toast('Debes iniciar sesión para registrar un turno', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
  return (
    <>
        <NavBar/>
        {
            isLoggedIn && role==='admin'?
            <>
                <HMenu/>
                <div className='shiftsContainerIsLoggedIn'>
                    <div className='shiftsContainerIsLoggedIn__form'>
                        <h2 className='shiftsContainerIsLoggedIn__form__phrase'>Registrá tu turno</h2>
                        <div className='shiftsContainerIsLoggedIn__form__credentials'>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNameSh} onChange={handleInputFirstNameSh}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__inputSchedule' placeholder='Apellido' value={inputLastNameSh} onChange={handleInputLastNameSh}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Fecha:</h2>
                                <DatePicker className='datePiker'
                                    selected={inputDateSh}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Seleccione una fecha"
                                />
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Horario:</h2>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__input' value={inputScheduleHSh} onBlur={handleOnBlurInputScheduleH} onChange={handleInputScheduleHSh}/>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__mid'>:</div>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__input' value={inputScheduleMSh} onBlur={handleOnBlurInputScheduleM} onChange={handleInputScheduleMSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Turno:</h2>
                                <select value={inputOptionSh} onChange={(e) => {handleInputOptionSh(e.target.value)}}>
                                    {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Precio:</h2>
                                <div id='priceShift' className='shiftsContainerIsLoggedIn__form__credentials__label-input__precio'>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__precio__prop'>{inputPriceSh}</div>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleBuy}>Pagar</button>
                            </div>
                        </div>
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                    </div>
                </div>
                <LogOut/> 
            </>
            : isLoggedIn?
            <>
                <div className='shiftsContainerIsLoggedIn'>
                    <div className='shiftsContainerIsLoggedIn__form'>
                        <h2 className='shiftsContainerIsLoggedIn__form__phrase'>Registrá tu turno</h2>
                        <div className='shiftsContainerIsLoggedIn__form__credentials'>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNameSh} onChange={handleInputFirstNameSh}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__inputSchedule' placeholder='Apellido' value={inputLastNameSh} onChange={handleInputLastNameSh}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Fecha:</h2>
                                <DatePicker className='datePiker'
                                    selected={inputDateSh}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Seleccione una fecha"
                                />
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Horario:</h2>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__input' value={inputScheduleHSh} onBlur={handleOnBlurInputScheduleH} onChange={handleInputScheduleHSh}/>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__mid'>:</div>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__schedule__input' value={inputScheduleMSh} onBlur={handleOnBlurInputScheduleM} onChange={handleInputScheduleMSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Turno:</h2>
                                <select value={inputOptionSh} onChange={(e) => {handleInputOptionSh(e.target.value)}}>
                                    {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Precio:</h2>
                                <div id='priceShift' className='shiftsContainerIsLoggedIn__form__credentials__label-input__precio'>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__precio__prop'>{inputPriceSh}</div>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleBuy}>Pagar</button>
                            </div>
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
                <div className='shiftsContainer'>
                    <div className='shiftsContainer__form'>
                        <h2 className='shiftsContainer__form__phrase'>Registrá tu turno</h2>
                        <div className='shiftsContainer__form__credentials'>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Nombre:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled placeholder='Nombre' onChange={(e) => {handleInputFirstNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Apellido:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled placeholder='Apellido' onChange={(e) => {handleInputLastNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Fecha:</h2>
                                <DatePicker className='datePiker'
                                    disabled
                                    selected={inputDateSh}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Seleccione una fecha"
                                />
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Horario:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled type='time' placeholder='Horario' onChange={(e) => {handleInputScheduleSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Turno:</h2>
                                <select disabled value={inputOptionSh} onChange={handleInputOptionSh}>
                                </select>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Precio:</h2>
                                <input id='priceShift' className='shiftsContainer__form__credentials__label-input__input__precio' disabled value={inputPriceSh}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainer__form__credentials__btn__prop' onClick={loginToast}>Pagar</button>
                            </div>
                        </div>
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                    </div>
                </div>
            </>
        }
        <Footer/>
    </>
  )
}

export default Shifts
import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataShLContext} from '../context/InputDataShLContext';
import HMenu from './HMenu';
import ItemShift from './ItemShift';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ShiftsList = () => {
    const currentDate = new Date();
    const { inputFirstNameShL, handleInputFirstNameShL, inputLastNameShL, handleInputLastNameShL, inputDateShL, handleInputDateShL, inputScheduleHShL, inputScheduleMShL, handleInputScheduleHShL, handleInputScheduleMShL, handleOnBlurInputScheduleHShL, handleOnBlurInputScheduleMShL } = useContext(InputDataShLContext);
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const [shifts, setShifts] = useState([]);
    const {updateShiftModal} = useContext(OpenModalContext);
    
    const [selectedYearValue, setSelectedYearsValue] = useState(`${new Date().getFullYear()}`);
    
    let currentMonth = currentDate.getMonth();
    currentMonth += 1;
    const [selectedMonthValue, setSelectedMonthsValue] = useState(`${currentMonth}`);
    
    const currentDay = currentDate.getDate();
    const [selectedDayValue, setSelectedDayValue] = useState(`${currentDay}`);
    
    function compararFechas(objeto1, objeto2) {
        var fechaHora1 = new Date(objeto1.date + " " + objeto1.schedule);
        var fechaHora2 = new Date(objeto2.date + " " + objeto2.schedule);
        return fechaHora1 - fechaHora2;
    }
    const shiftsOrganized = shifts.sort(compararFechas);
    
    function filtrarPorFecha(shiftsOrganized, fecha) {
        return shiftsOrganized.filter(objeto => objeto.date === fecha);
    }
    
    const dateDesired = selectedYearValue + '-' + (selectedMonthValue==='1'?'01':selectedMonthValue==='2'?'02':selectedMonthValue==='3'?'03':selectedMonthValue==='4'?'04':selectedMonthValue==='5'?'05':selectedMonthValue==='6'?'06':selectedMonthValue==='7'?'07':selectedMonthValue==='8'?'08':selectedMonthValue==='9'?'09':selectedMonthValue==='10'?'10':selectedMonthValue==='11'?'11':selectedMonthValue==='12'?'12':selectedMonthValue==='') + '-' + (selectedDayValue==='1'?'01':selectedDayValue==='2'?'02':selectedDayValue==='3'?'03':selectedDayValue==='4'?'04':selectedDayValue==='5'?'05':selectedDayValue==='6'?'06':selectedDayValue==='7'?'07':selectedDayValue==='8'?'08':selectedDayValue==='9'?'09':selectedDayValue)
    const fechaDeseada = dateDesired;
    const objetosFiltrados = filtrarPorFecha(shiftsOrganized, fechaDeseada);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/shifts`)
            const shiftsAll = await response.json();
            setShifts(shiftsAll.data)
        }
        fetchData();

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
        const fetchUser = async () => {
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
        fetchUser();
        if(cookieValue) {
            login()
        } else {
            logout()
        }
    }, []);

    const handleSelectYears = (event) => {
        setSelectedYearsValue(event.target.value);
    };

    const handleSelectMonths = (event) => {
        setSelectedMonthsValue(event.target.value);
    };

    const handleSelectDay = (event) => {
        setSelectedDayValue(event.target.value);
    };

    const handleDateChange = date => {
        handleInputDateShL(date);
    };

    const handleBtnCreateShift = async() => {
        if(!inputFirstNameShL || !inputLastNameShL || !inputDateShL || !inputScheduleHShL || !inputScheduleMShL) {
            toast('Debes completar todos los campos!', {
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
            document.getElementById('btnCreateShift').style.display = 'none';
            document.getElementById('spinnerBtnCreateShift').style.display = 'block';
            const schedule = inputScheduleHShL + ':' + inputScheduleMShL
            const shiftToCreate = {
                first_name: inputFirstNameShL,
                last_name: inputLastNameShL,
                date: inputDateShL,
                schedule: schedule,
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/shifts/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToCreate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has creado el turno correctamente!', {
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
            if(data.error === 'There is already a shift with that date and time') {
                toast('Ya existe un turno con esa fecha y horario!', {
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
        }
    };
    
    const handleOnBlurInputScheduleH = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0 && inputValue < 10) {
            handleOnBlurInputScheduleHShL(inputValue);
        }
    }

    const handleOnBlurInputScheduleM = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0 && inputValue < 10) {
            handleOnBlurInputScheduleMShL(inputValue);
        }
    }

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };

  return (
    <>
        <NavBar/>
        {
            isLoggedIn && role==='admin'?
            <>
                <HMenu/>
                <div className='shiftsListContainer'>
                    <div className='shiftsListContainer__title'>- Turnos -</div>
                    <div className='shiftsListContainer__selects'>
                        <div className='shiftsListContainer__selects__labelSelect'>
                            <div className='shiftsListContainer__selects__labelSelect__label'>Año:</div>
                            {       
                                !updateShiftModal?
                                <select value={selectedYearValue} className='shiftsListContainer__selects__labelSelect__select' onChange={handleSelectYears}>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                                :
                                <select disabled style={buttonDisabledStyle} value={selectedYearValue} className='shiftsListContainer__selects__labelSelect__select' onChange={handleSelectYears}>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            }
                        </div>
                        <div className='shiftsListContainer__selects__labelSelect'>
                            <div className='shiftsListContainer__selects__labelSelect__label'>Mes:</div>
                            {       
                                !updateShiftModal?
                                <select value={selectedMonthValue} className='shiftsListContainer__selects__labelSelect__selectDays' onChange={handleSelectMonths}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                :
                                <select disabled style={buttonDisabledStyle} value={selectedMonthValue} className='shiftsListContainer__selects__labelSelect__selectDays' onChange={handleSelectMonths}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            }
                        </div>
                        <div className='shiftsListContainer__selects__labelSelect'>
                            <div className='shiftsListContainer__selects__labelSelect__label'>Día:</div>
                            {       
                                !updateShiftModal?
                                <select className='shiftsListContainer__selects__labelSelect__selectDays' onChange={handleSelectDay} value={selectedDayValue}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option id='day29' value="29">29</option>
                                    <option id='day30' value="30">30</option>
                                    <option id='day31' value="31">31</option>
                                </select>
                                :
                                <select disabled style={buttonDisabledStyle} className='shiftsListContainer__selects__labelSelect__selectDays' onChange={handleSelectDay} value={selectedDayValue}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option id='day29' value="29">29</option>
                                    <option id='day30' value="30">30</option>
                                    <option id='day31' value="31">31</option>
                                </select>
                            }
                        </div>
                    </div>
                    <div className='shiftsListContainer__shiftsList'>
                        <div className='shiftsListContainer__shiftsList__header'>
                            <div className='shiftsListContainer__shiftsList__header__label'>Nombre</div>
                            <div className='shiftsListContainer__shiftsList__header__label'>Apellido</div>
                            <div className='shiftsListContainer__shiftsList__header__label'>Fecha</div>
                            <div className='shiftsListContainer__shiftsList__header__label'>Horario</div>
                        </div>
                        <div className='itemCreateShift'>
                            {
                                !updateShiftModal?
                                <>
                                    <div className='itemCreateShift__input'>
                                        <input type='text' className='itemCreateShift__input__prop' placeholder='-' value={inputFirstNameShL} onChange={handleInputFirstNameShL}/>
                                    </div>
                                    <div className='itemCreateShift__input'>
                                        <input type='text' className='itemCreateShift__input__prop' placeholder='-' value={inputLastNameShL} onChange={handleInputLastNameShL}/>
                                    </div>
                                    <div className='itemCreateShift__input'>
                                        <DatePicker className='datePikerCreateShift'
                                            selected={inputDateShL}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText='-'
                                        />
                                    </div>
                                    <div className='itemCreateShift__inputSchedule'>
                                        <input className='itemCreateShift__inputSchedule__prop' placeholder='-' maxLength={2} value={inputScheduleHShL} onBlur={handleOnBlurInputScheduleH} onChange={handleInputScheduleHShL}/>
                                        <div>:</div>
                                        <input className='itemCreateShift__inputSchedule__prop' placeholder='-' maxLength={2} value={inputScheduleMShL} onBlur={handleOnBlurInputScheduleM} onChange={handleInputScheduleMShL}/>
                                    </div>
                                    <div className='itemCreateShift__btns'>
                                        <button id='btnCreateShift' className='itemCreateShift__btns__btn' onClick={handleBtnCreateShift}>Crear turno</button>
                                        <div id='spinnerBtnCreateShift' className='spinner'></div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='itemCreateShift__input'>
                                        <input disabled type='text' className='itemCreateShift__input__prop' placeholder='-' value={inputFirstNameShL} onChange={handleInputFirstNameShL}/>
                                    </div>
                                    <div className='itemCreateShift__input'>
                                        <input disabled type='text' className='itemCreateShift__input__prop' placeholder='-' value={inputLastNameShL} onChange={handleInputLastNameShL}/>
                                    </div>
                                    <div className='itemCreateShift__input'>
                                        <DatePicker className='datePikerCreateShift'
                                            selected={inputDateShL}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText='-'
                                            disabled
                                        />
                                    </div>
                                    <div className='itemCreateShift__inputSchedule'>
                                        <input disabled className='itemCreateShift__inputSchedule__prop' placeholder='-' maxLength={2} value={inputScheduleHShL} onBlur={handleOnBlurInputScheduleH} onChange={handleInputScheduleHShL}/>
                                        <div>:</div>
                                        <input disabled className='itemCreateShift__inputSchedule__prop' placeholder='-' maxLength={2} value={inputScheduleMShL} onBlur={handleOnBlurInputScheduleM} onChange={handleInputScheduleMShL}/>
                                    </div>
                                    <div className='itemCreateShift__btns'>
                                        <button disabled style={buttonDisabledStyle} id='btnCreateShift' className='itemCreateShift__btns__btn' onClick={handleBtnCreateShift}>Crear turno</button>
                                        <div id='spinnerBtnCreateShift' className='spinner'></div>
                                    </div>
                                </>
                            }
                        </div>
                    {
                        objetosFiltrados.map((shift) => {
                            return(
                                <ItemShift
                                id={shift._id}
                                first_name={shift.first_name}
                                last_name={shift.last_name}
                                date={shift.date}
                                schedule={shift.schedule}
                                />
                            )
                        })
                    }
                    </div>
                </div>
                <LogOut/>
            </>
            :
            <>
                <div className='warningLogin'>
                    <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
                </div>
                <div className='blackDiv'></div> 
            </>
        }
        <Footer/>
    </>
  )
}

export default ShiftsList
import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';
//import {OpenModalContext} from '../context/OpenModalContext'; 

const ShiftsListModal = ({id,first_name,last_name,date,schedule}) => {
    const [confirmationDelShiftsModal, handleConfirmationDelShiftsModal] = useState(false);
    //const {confirmationDelShiftsModal, handleConfirmationDelShiftsModal} = useContext(OpenModalContext);

    const fechaUTC = toZonedTime(date, 'UTC');
    const dateFormated = format(fechaUTC, "yyyy/MM/dd");

    const scheduleArray = schedule.split(':');
    const scheduleH = scheduleArray[0];
    const scheduleM = scheduleArray[1];

    const [inputFirstNameISh, setInputFirstNameISh] = useState('');
    const [inputLastNameISh, setInputLastNameISh] = useState('');
    const [inputDateISh, handleInputDateISh] = useState('');
    const [inputScheduleHISh, handleInputScheduleHISh] = useState('');
    const [inputScheduleMISh, handleInputScheduleMISh] = useState('');
    const [scheduleHData, setScheduleHData] = useState('');
    const [scheduleMData, setScheduleMData] = useState('');

    useEffect(() => {
        setScheduleHData(scheduleH);
        setScheduleMData(scheduleM);
    },[])

    const handleInputFirstNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputFirstNameISh(texto);
        texto!==first_name?setInputChanges(true):setInputChanges(false);
    };

    const handleInputLastNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-z\s]/gi, '');
        setInputLastNameISh(texto);
        texto!==last_name?setInputChanges(true):setInputChanges(false);
    };

    const handleInputScheduleH = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 23) {
            handleInputScheduleHISh(inputValue);
            inputValue!==scheduleH?setInputChanges(true):setInputChanges(false);
        }
    };

    const handleInputScheduleM = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 59) {
            handleInputScheduleMISh(inputValue);
            inputValue!==scheduleM?setInputChanges(true):setInputChanges(false);
        }
    };

    const handleKeyDownH = (event) => {
        if (event.keyCode === 8) {
            handleInputScheduleHISh('');
            setScheduleHData('')
        }
    };

    const handleKeyDownM = (event) => {
        if (event.keyCode === 8) {
            handleInputScheduleMISh('');
            setScheduleMData('')
        }
    };
    
    const handleDateChange = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        handleInputDateISh(formattedDate);
        formattedDate!==dateFormated?setInputChanges(true):setInputChanges(false);
    };

    const handleBtnDelShift = async() => {
        handleConfirmationDelShiftsModal(true);
    };

    const handleBtnUpdShift = async() => {
        if(inputFirstNameISh !== first_name || inputLastNameISh !== last_name || inputDateISh !== dateFormated || inputScheduleHISh !== scheduleH || inputScheduleMISh !== scheduleM) {
            const scheduleConcat = (inputScheduleHISh?inputScheduleHISh:scheduleH) + ':' + (inputScheduleMISh?inputScheduleMISh:scheduleM)
            const shiftToUpdate = {
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                date: inputDateISh?inputDateISh:dateFormated,
                schedule: scheduleConcat
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                document.getElementById('btnUpdateShift').style.display = 'none';
                document.getElementById('spinnerBtnUpdateShift').style.display = 'block';
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
                    window.location.href = '/shiftsList';
                }, 1500);
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
            } else if(data.error === 'There is already a shift with that data') {
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
                setInputChanges(false)
            }   
        }
    };

    const handleOnBlurInputScheduleH = () => {
        inputScheduleHISh===''&&setScheduleHData(scheduleH)
        inputScheduleHISh===''&&setInputChanges(false);
        inputScheduleMISh!==''&&setInputChanges(true);
        if(inputScheduleHISh.length===1 && inputScheduleHISh<10) {
            handleInputScheduleHISh("0"+inputScheduleHISh)
        } else if(inputScheduleHISh==='00') {
            handleInputScheduleHISh(inputScheduleHISh)
        } 
    }

    const handleOnBlurInputScheduleM = () => {
        inputScheduleMISh===''&&setScheduleMData(scheduleM);
        inputScheduleMISh===''&&setInputChanges(false);
        inputScheduleHISh!==''&&setInputChanges(true);
        if(inputScheduleMISh.length===1 && inputScheduleMISh<10) {
            handleInputScheduleMISh("0"+inputScheduleMISh)
        } else if(inputScheduleMISh==='00') {
            handleInputScheduleMISh(inputScheduleMISh)
        } 
    }

    const ConfirmationDeleteModal = () => {

        const handleBtnDelShift = async() => {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/shifts/${id}`, {
                method: 'DELETE',         
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response.ok) {
                toast('Has eliminado el turno correctamente!', {
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
            handleConfirmationDelShiftsModal(false)
        }

        return (
            <>
                <div className='confirmationDeleteBtnShiftListModalContainer'>
                    <div className='confirmationDeleteBtnShiftListModalContainer__ask'>¿Estás seguro que deseas borrar el turno?</div>
                    <div className='confirmationDeleteBtnShiftListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnShiftListModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                        <div className='confirmationDeleteBtnShiftListModalContainer__askMobile__ask'>borrar el turno?</div>
                    </div>
                    <div className='confirmationDeleteBtnShiftListModalContainer__btns'>
                        <button onClick={handleBtnDelShift} className='confirmationDeleteBtnShiftListModalContainer__btns__prop'>Si</button>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnShiftListModalContainer__btns__prop'>No</button>
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
        <div className='shiftModalContainer'>
            <div className='shiftModalContainer__btnCloseModal'>
                {
                    !confirmationDelShiftsModal?
                    <>
                        <Link onClick={closeM} to={"/shiftsList"} className='shiftModalContainer__btnCloseModal__prop'>
                            Cerrar
                        </Link>
                    </>
                        :
                    <>
                        <div className='shiftModalContainer__btnCloseModal__prop'>Cerrar</div>
                    </>
                }
            </div> 
            <div className='shiftModalContainer__header'>
                <div className='shiftModalContainer__header__label'>- Nombre -</div>
                <div className='shiftModalContainer__header__label'>- Apellido -</div>
                <div className='shiftModalContainer__header__label'>- Fecha -</div>
                <div className='shiftModalContainer__header__label'>- Horario -</div>
            </div>
            <div className='shiftModalContainer__itemShift'>
                {
                    !confirmationDelShiftsModal?
                    <>
                        <div className='shiftModalContainer__itemShift__input'>
                            <input className='shiftModalContainer__itemShift__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__input'>
                            <input className='shiftModalContainer__itemShift__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__input'>
                            <DatePicker className='datePikerShiftsList'
                                selected={!inputDateISh?dateFormated:inputDateISh}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className='shiftModalContainer__itemShift__inputSchedule'>
                            <input className='shiftModalContainer__itemShift__inputSchedule__prop' maxLength={2} value={!inputScheduleHISh?scheduleHData:inputScheduleHISh} onChange={handleInputScheduleH} onBlur={handleOnBlurInputScheduleH} onKeyDown={handleKeyDownH}/>
                            <div>:</div>
                            <input className='shiftModalContainer__itemShift__inputSchedule__prop' maxLength={2} value={!inputScheduleMISh?scheduleMData:inputScheduleMISh} onChange={handleInputScheduleM} onBlur={handleOnBlurInputScheduleM} onKeyDown={handleKeyDownM}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__btns'>
                            <button className='shiftModalContainer__itemShift__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                            <button id='btnUpdateShift' className='shiftModalContainer__itemShift__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
                            <div id='spinnerBtnUpdateShift' className='spinner'></div>
                        </div>
                    </>
                    :
                    <>
                        <div className='shiftModalContainer__itemShift__input'>
                            <input disabled className='shiftModalContainer__itemShift__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__input'>
                            <input disabled className='shiftModalContainer__itemShift__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__input'>
                            <DatePicker className='datePikerShiftsList'
                                selected={!inputDateISh?dateFormated:inputDateISh}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                disabled
                            />
                        </div>
                        <div className='shiftModalContainer__itemShift__inputSchedule'>
                            <input disabled className='shiftModalContainer__itemShift__inputSchedule__prop' maxLength={2} value={!inputScheduleHISh?scheduleHData:inputScheduleHISh} onChange={handleInputScheduleH} onBlur={handleOnBlurInputScheduleH} onKeyDown={handleKeyDownH}/>
                            <div>:</div>
                            <input disabled className='shiftModalContainer__itemShift__inputSchedule__prop' maxLength={2} value={!inputScheduleMISh?scheduleMData:inputScheduleMISh} onChange={handleInputScheduleM} onBlur={handleOnBlurInputScheduleM} onKeyDown={handleKeyDownM}/>
                        </div>
                        <div className='shiftModalContainer__itemShift__btns'>
                            <button className='shiftModalContainer__itemShift__btns__btn'>Borrar</button>
                            <button disabled id='btnUpdateShift' style={buttonDisabledStyle} className='shiftModalContainer__itemShift__btns__btn'>Actualizar</button>
                        </div>
                    </>
                }
            </div>
            {
                confirmationDelShiftsModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default ShiftsListModal
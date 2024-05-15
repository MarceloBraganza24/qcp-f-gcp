import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import ShiftsListModal from './ShiftsListModal';

const ItemShift = ({id, first_name,last_name,date,schedule}) => {
    const [inputFirstNameISh, setInputFirstNameISh] = useState('');
    const [inputLastNameISh, setInputLastNameISh] = useState('');
    const [inputDateISh, handleInputDateISh] = useState('');
    const [inputScheduleHISh, handleInputScheduleHISh] = useState('');
    const [inputScheduleMISh, handleInputScheduleMISh] = useState(''); 

    const [modalOpen, setModalOpen] = useState(false);

    const fechaUTC = toZonedTime(date, 'UTC');
    const dateFormated = format(fechaUTC, "dd/MM/yyyy");

    const scheduleArray = schedule.split(':')
    const scheduleH = scheduleArray[0];
    const scheduleM = scheduleArray[1];

    const handleInputScheduleH = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 23) {
            handleInputScheduleHISh(inputValue);
        }
    };

    const handleInputScheduleM = (event) => {
        const inputValue = event.target.value;
        if (!isNaN(inputValue) && parseInt(inputValue) >= 0 && parseInt(inputValue) <= 59) {
            handleInputScheduleMISh(inputValue);
        }
    };

    const handleKeyDownH = (event) => {
        if (event.keyCode === 8) {
            handleInputScheduleHISh('');
        }
    };

    const handleKeyDownM = (event) => {
        if (event.keyCode === 8) {
            handleInputScheduleMISh('');
        }
    };
    
    const handleDateChange = date => {
        handleInputDateISh(date);
    };

    const handleInputFNonBlur = () => {
        inputFirstNameISh!==''?setModalOpen(true):inputLastNameISh!==''?setModalOpen(true):inputDateISh!==''?setModalOpen(true):inputScheduleHISh!==''?setModalOpen(true):inputScheduleMISh!==''&&setModalOpen(true)
    }

    const handleInputLNonBlur = () => {
        inputFirstNameISh!==''?setModalOpen(true):inputLastNameISh!==''?setModalOpen(true):inputDateISh!==''?setModalOpen(true):inputScheduleHISh!==''?setModalOpen(true):inputScheduleMISh!==''&&setModalOpen(true)
    }

    const handleInputDateonBlur = () => {
        inputFirstNameISh!==''?setModalOpen(true):inputLastNameISh!==''?setModalOpen(true):inputDateISh!==''?setModalOpen(true):inputScheduleHISh!==''?setModalOpen(true):inputScheduleMISh!==''&&setModalOpen(true)
    }

    const handleInputSchHonBlur = () => {
        inputFirstNameISh!==''?setModalOpen(true):inputLastNameISh!==''?setModalOpen(true):inputDateISh!==''?setModalOpen(true):inputScheduleHISh!==''?setModalOpen(true):inputScheduleMISh!==''&&setModalOpen(true)    
    }

    const handleInputSchMonBlur = () => {
        inputFirstNameISh!==''?setModalOpen(true):inputLastNameISh!==''?setModalOpen(true):inputDateISh!==''?setModalOpen(true):inputScheduleHISh!==''?setModalOpen(true):inputScheduleMISh!==''&&setModalOpen(true)    
    }

    const handleFocusInputFN = () => {
        setModalOpen(false);
        setIsFocusedInputSchM(true);
    };

    const handleFocusInputLN = () => {
        setModalOpen(false);
        setIsFocusedInputSchM(true);
    };

    const handleFocusInputDate = () => {
        setModalOpen(false);
        setIsFocusedInputSchM(true);
    };

    const handleFocusInputSchH = () => {
        setModalOpen(false);
        setIsFocusedInputSchM(true);
    };

    const handleFocusInputSchM = () => {
        setModalOpen(false);
        setIsFocusedInputSchM(true);
    };

    const handleBtnDelShift = async() => {
        const response = await fetch(`http://localhost:8081/api/shifts/${id}`, {
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
        }
    };

    const handleBtnUpdShift = async() => {
        if(inputFirstNameISh === '' && inputLastNameISh === '' && inputDateISh === '' && inputScheduleHISh === '' && inputScheduleMISh === '') {
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
        } else if(inputScheduleHISh !== '' && inputScheduleMISh === '') {
            const scheduleConcat = inputScheduleHISh + ':' + scheduleM;
            const shiftToUpdate = {
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                date: inputDateISh?inputDateISh:date,
                schedule: scheduleConcat
            }
            const response = await fetch(`http://localhost:8081/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            if(response.ok) {
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
                    window.location.reload();
                }, 1500);
            }
        } else if (inputScheduleHISh !== '' && inputScheduleMISh !== '') {
            const scheduleConcat = inputScheduleHISh + ':' + inputScheduleMISh;
            const shiftToUpdate = {
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                date: inputDateISh?inputDateISh:date,
                schedule: scheduleConcat
            }
            const response = await fetch(`http://localhost:8081/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            if(response.ok) {
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
                    window.location.reload();
                }, 1500);
            }
        } else if (inputScheduleHISh === '' && inputScheduleMISh !== '') {
            const scheduleConcat = scheduleH + ':' + inputScheduleMISh;
            const shiftToUpdate = {
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                date: inputDateISh?inputDateISh:date,
                schedule: scheduleConcat
            }
            const response = await fetch(`http://localhost:8081/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            if(response.ok) {
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
                    window.location.reload();
                }, 1500);
            }
        } else {
            const scheduleConcat = inputScheduleHISh?inputScheduleHISh:scheduleH + ':' + inputScheduleMISh?inputScheduleMISh:scheduleM;
            const shiftToUpdate = {
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                date: inputDateISh?inputDateISh:date,
                schedule: scheduleConcat?scheduleConcat:schedule
            }
            const response = await fetch(`http://localhost:8081/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            if(response.ok) {
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
                    window.location.reload();
                }, 1500);
            }
        }
    };

    
 
  return (
    <>
        <div className='itemShift'>
            <div className='itemShift__input'>
                <input className='itemShift__input__prop' placeholder={first_name} value={inputFirstNameISh} onFocus={handleFocusInputFN} onBlur={handleInputFNonBlur} onChange={(e) => setInputFirstNameISh(e.target.value)}/>
            </div>
            <div className='itemShift__input'>
                <input className='itemShift__input__prop' placeholder={last_name} value={inputLastNameISh} onFocus={handleFocusInputLN} onBlur={handleInputLNonBlur} onChange={(e) => setInputLastNameISh(e.target.value)}/>
            </div>
            <div className='itemShift__input'>
                <DatePicker className='datePikerShiftsList'
                    selected={inputDateISh}
                    onChange={handleDateChange}
                    onBlur={handleInputDateonBlur}
                    onFocus={handleFocusInputDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={dateFormated}
                />
            </div>
            <div className='itemCreateShift__inputSchedule'>
                <input className='itemCreateShift__inputSchedule__prop' placeholder={scheduleH} maxLength={2} value={inputScheduleHISh} onFocus={handleFocusInputSchH} onBlur={handleInputSchHonBlur} onChange={handleInputScheduleH} onKeyDown={handleKeyDownH}/>
                <div>:</div>
                <input className='itemCreateShift__inputSchedule__prop' placeholder={scheduleM} maxLength={2} value={inputScheduleMISh} onFocus={handleFocusInputSchM} onBlur={handleInputSchMonBlur} onChange={handleInputScheduleM} onKeyDown={handleKeyDownM}/>
            </div>
            <div className='itemShift__btns'>
                <button className='itemShift__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                <button className='itemShift__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
            </div>
        </div>
        {
            modalOpen && 
            <ShiftsListModal
            id={id}
            first_name={first_name}
            last_name={last_name}
            date={date}
            schedule={schedule}
            inputFirstNameISh={inputFirstNameISh}
            inputLastNameISh={inputLastNameISh}
            inputDateISh={inputDateISh}
            inputScheduleHISh={inputScheduleHISh}
            inputScheduleMISh={inputScheduleMISh}
            />
        }
    </>
  )
}

export default ItemShift

     
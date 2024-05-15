import React from 'react'
import { toast } from "react-toastify";

const ShiftsListModal = ({id,first_name,last_name,date,schedule,inputFirstNameISh,inputLastNameISh,inputDateISh,inputScheduleHISh,inputScheduleMISh}) => {

    const scheduleArray = schedule.split(':')
    const scheduleH = scheduleArray[0];
    const scheduleM = scheduleArray[1]; 

    const handleBtnCloseModal = () => {
        window.location.href = '/shiftsList'
    }

    const handleBtnUpdShift = async() => {
        if(inputScheduleHISh !== '' && inputScheduleMISh === '') {
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
                    window.location.href = '/shiftsList';
                }, 1500);
            } else {
                toast('Ha ocurrido un error, intente nuevamente!', {
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
                    window.location.href = '/shiftsList';
                }, 1500);
            } else {
                toast('Ha ocurrido un error, intente nuevamente!', {
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
                    window.location.href = '/shiftsList';
                }, 1500);
            } else {
                toast('Ha ocurrido un error, intente nuevamente!', {
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
                    window.location.href = '/shiftsList';
                }, 1500);
            } else {
                toast('Ha ocurrido un error, intente nuevamente!', {
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
        }
    };

    return (
    <>
        <div className='modalContainer'>
            <div className='modalContainer__ask'>Deseas guardar los cambios en el turno de</div>
            <div className='modalContainer__name'>{first_name}{' '}{last_name}</div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnUpdShift}>Guardar</button>
            </div>
            <div className='modalContainer__btns'>
                <button className='modalContainer__btns__btn' onClick={handleBtnCloseModal}>Salir</button>
            </div>
        </div>
    </>
    )
}

export default ShiftsListModal
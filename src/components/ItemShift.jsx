import React, { useState, useContext  } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import ShiftsListModal from './ShiftsListModal';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ItemShift = ({id, first_name,last_name,date,schedule}) => {
    const scheduleArray = schedule.split(':')
    let scheduleH = scheduleArray[0];
    let scheduleM = scheduleArray[1];

    const [modalOpen, setModalOpen] = useState(false);
    const {isOpen, handleModal} = useContext(OpenModalContext);

    const handleBtnUpdShift = async() => {
        setModalOpen(true);
        handleModal(true);
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer'
    };

  return (
    <>
        <div className='itemShift'>
            <div className='itemShift__input'>
                <div className='itemShift__input__prop'>{first_name}</div>
            </div>
            <div className='itemShift__input'>
                <div className='itemShift__input__prop'>{last_name}</div>
            </div>
            <div className='itemShift__input'>
                <div className='itemShift__input__prop'>{date}</div>
            </div>
            <div className='itemCreateShift__inputSchedule'>
                <div className='itemShift__input__prop'>{scheduleH}</div>
                <div>:</div>
                <div className='itemShift__input__prop'>{scheduleM}</div>
            </div>
            {
                !modalOpen&&!isOpen?
                <div className='itemShift__btns'>
                    <button className='itemShift__btns__btn' onClick={handleBtnUpdShift}>Editar</button>
                </div>
                :
                <div className='itemShift__btns'>
                    <button disabled style={buttonDisabledStyle} className='itemShift__btns__btn' onClick={handleBtnUpdShift}>Editar</button>
                </div>
            }
        </div>
        {
            modalOpen&&
                <ShiftsListModal
                id={id}
                first_name={first_name}
                last_name={last_name}
                date={date}
                schedule={schedule}
                />
        }
    </>
  )
}

export default ItemShift

     
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {InputChangesContext} from '../context/InputChangesContext';

const HMenu = () => {
  const {inputChanges} = useContext(InputChangesContext);

  const openW = () => {
    document.getElementById("menuOptions").style.display = "flex"
  }

  return (
    <>
      {
        !inputChanges&&
        <>
          <div onClick={openW} className='hMenu'>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
          </div>
          <MenuOptions/>
        </>
        /* :
        <>
          <div className='hMenu'>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
          </div>
          <MenuOptions/>
        </> */
      }
      
    </>
  )
}

const MenuOptions = () => {
  
  const closeW = () => {
    document.getElementById("menuOptions").style.display = "none"
  }

  return (
    <>
      <div id='menuOptions' className='menuOptions'>
        <Link to={"/shiftsList"} className='menuOptions__item'>
            - Lista de turnos
        </Link>
        <Link to={"/partnersList"} className='menuOptions__item'>
          - Lista de socios
        </Link>
        <Link to={"/providersList"} className='menuOptions__item'>
          - Lista de proveedores
        </Link>
        <Link to={"/productsList"} className='menuOptions__item'>
          - Lista de productos
        </Link>
        <div className='menuOptions__closeW'>
          <div className='menuOptions__closeW__btn' onClick={closeW}>X</div>
        </div>
      </div>
    </>
  )
}


export default HMenu
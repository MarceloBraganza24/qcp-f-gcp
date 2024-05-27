import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {OpenModalContext} from '../context/OpenModalContext';

const HMenuMobile = () => {
  const {isOpen} = useContext(OpenModalContext);

  const openW = () => {
    document.getElementById("menuOptionsMobile").style.display = "flex"
  }

  return (
    <>
      {
        !isOpen&&
        <>
          <div onClick={openW} className='hMenuMobile'>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
          </div>
          <MenuOptions/>
        </>
      }
      
    </>
  )
}

const MenuOptions = () => {
  
  const closeW = () => {
    document.getElementById("menuOptionsMobile").style.display = "none"
  }

  return (
    <>
      <div id='menuOptionsMobile' className='menuOptionsMobile'>
        <Link to={"/shifts"} className='menuOptionsMobile__item'>
            - Turnos
        </Link>
        <Link to={"/cuts"} className='menuOptionsMobile__item'>
            - Cortes
        </Link>
        <Link to={"/about"} className='menuOptionsMobile__item'>
            - Sobre Nosotros
        </Link>
        <Link to={"/partners"} className='menuOptionsMobile__item'>
            - Socios
        </Link>
        <Link to={"/shiftsList"} className='menuOptionsMobile__item'>
            - Lista de turnos
        </Link>
        <Link to={"/partnersList"} className='menuOptionsMobile__item'>
          - Lista de socios
        </Link>
        <Link to={"/providersList"} className='menuOptionsMobile__item'>
          - Lista de proveedores
        </Link>
        <Link to={"/productsList"} className='menuOptionsMobile__item'>
          - Lista de productos
        </Link>
        <div className='menuOptionsMobile__closeW'>
          <div className='menuOptionsMobile__closeW__btn' onClick={closeW}>X</div>
        </div>
      </div>
    </>
  )
}


export default HMenuMobile
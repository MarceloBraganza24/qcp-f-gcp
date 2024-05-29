import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {OpenModalContext} from '../context/OpenModalContext';

const HMenu = () => {
  const {updateShiftModal,updatePartnerModal,updateProviderModal,updateProductsModal,menuOptionsModal,handleMenuOptionsModal} = useContext(OpenModalContext);

  const openCloseW = () => {
    if(!menuOptionsModal) {
      handleMenuOptionsModal(true)
    } else if(menuOptionsModal) {
      handleMenuOptionsModal(false)
    }
  }

  return (
    <>
      {
        !updateShiftModal&&!updatePartnerModal&&!updateProviderModal&&!updateProductsModal?
        <>
          <div onClick={openCloseW} className='hMenu'>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
          </div>
          {menuOptionsModal&&<MenuOptions/>}
        </>
        :
        <>
          <div className='hMenu'>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
            <div className='hMenu__line'></div>
          </div>
        </>
      }
      
    </>
  )
}

const MenuOptions = () => {
  
  const reloadPage = () => {
    window.reload();
  }

  return (
    <>
      <div id='menuOptions' className='menuOptions'>
        <Link onClick={reloadPage} to={"/shiftsList"} className='menuOptions__item'>
            - Lista de turnos
        </Link>
        <Link onClick={reloadPage} to={"/partnersList"} className='menuOptions__item'>
          - Lista de socios
        </Link>
        <Link onClick={reloadPage} to={"/providersList"} className='menuOptions__item'>
          - Lista de proveedores
        </Link>
        <Link onClick={reloadPage} to={"/productsList"} className='menuOptions__item'>
          - Lista de productos
        </Link>
      </div>
    </>
  )
}


export default HMenu
import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {OpenModalContext} from '../context/OpenModalContext';
import {IsLoggedContext} from '../context/IsLoggedContext';

const HMenuMobile = () => {
  const {updateShiftModal,updatePartnerModal,updateProviderModal,updateProductsModal,menuOptionsModal,handleMenuOptionsModal} = useContext(OpenModalContext);

  const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
  const [role, setRole] = useState('');

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
          <div onClick={openCloseW} className='hMenuMobile'>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
          </div>
          {menuOptionsModal&&<MenuOptions isLoggedIn={isLoggedIn}role={role}/>}
        </>
        :
        <>
          <div className='hMenuMobile'>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
            <div className='hMenuMobile__line'></div>
          </div>
        </>
      }
      
    </>
  )
}

const MenuOptions = ({isLoggedIn,role}) => {
  
  const reloadPage = () => {
    window.reload();
  }

  return (
    <>
      <div id='menuOptionsMobile' className='menuOptionsMobile'>
        {
          isLoggedIn && role==='admin'?
          <>
            <Link onClick={reloadPage} to={"/shifts"} className='menuOptionsMobile__item'>
                - Turnos
            </Link>
            <Link onClick={reloadPage} to={"/cuts"} className='menuOptionsMobile__item'>
                - Cortes
            </Link>
            <Link onClick={reloadPage} to={"/about"} className='menuOptionsMobile__item'>
                - Sobre Nosotros
            </Link>
            <Link onClick={reloadPage} to={"/partners"} className='menuOptionsMobile__item'>
                - Socios
            </Link>
            <Link onClick={reloadPage} to={"/shiftsList"} className='menuOptionsMobile__item'>
                - Lista de turnos
            </Link>
            <Link onClick={reloadPage} to={"/partnersList"} className='menuOptionsMobile__item'>
              - Lista de socios
            </Link>
            <Link onClick={reloadPage} to={"/providersList"} className='menuOptionsMobile__item'>
              - Lista de proveedores
            </Link>
            <Link onClick={reloadPage} to={"/productsList"} className='menuOptionsMobile__item'>
              - Lista de productos
            </Link>
          </>
          :
          <>
            <Link onClick={reloadPage} to={"/shifts"} className='menuOptionsMobile__item'>
                - Turnos
            </Link>
            <Link onClick={reloadPage} to={"/cuts"} className='menuOptionsMobile__item'>
                - Cortes
            </Link>
            <Link onClick={reloadPage} to={"/about"} className='menuOptionsMobile__item'>
                - Sobre Nosotros
            </Link>
            <Link onClick={reloadPage} to={"/partners"} className='menuOptionsMobile__item'>
                - Socios
            </Link>
          </>
        }  
      </div>
    </>
  )
}


export default HMenuMobile
import React, { useContext} from 'react'
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {OpenModalContext} from '../context/OpenModalContext';

const LogOut = () => {
    const {logout} = useContext(IsLoggedContext);
    const {isOpen} = useContext(OpenModalContext);

    const logOutBtn = async (event) => {
        event.preventDefault();

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

        const response = await fetch(`http://localhost:8081/api/sessions/logout?cookie=${cookieValue}`, {
          method: 'POST'
        })
        if(response.ok) {
          const expirationDate = new Date(0);
          const cookieJWT = `TokenJWT=${cookieValue}; expires=${expirationDate.toUTCString()}`;
          document.cookie = cookieJWT;
          logout();
          toast('Gracias por visitar nuestra página', {
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
          toast('Ha ocurrido un error al cerrar sesión', {
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
  return (
    <>
      {
        !isOpen?
        <a onClick={logOutBtn} href="" className='logOut'>Cerrar sesión</a>
        :
        <div className='logOut'>Cerrar sesión</div>
      }
        
    </>
  )
}

export default LogOut
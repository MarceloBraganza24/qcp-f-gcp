import React, { useEffect, useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
//import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
//import {InputDataShContext} from '../context/InputDataShContext';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import HMenu from './HMenu';

const ProductsList = () => {
    //const { inputFirstNameSh, handleInputFirstNameSh, inputLastNameSh, handleInputLastNameSh, inputDateSh, handleInputDateSh, inputScheduleSh, handleInputScheduleSh, inputOptionSh, handleInputOptionSh, inputPriceSh } = useContext(InputDataShContext);
    
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);

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
        if(cookieValue) {
            login()
          } else {
            logout()
          }
    }, []);
    
    /* const loginToast = async (evt) => {
        evt.preventDefault();
        toast('Debes iniciar sesión para modificar el turno', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }; */
  return (
    <>
        <NavBar/>
        {
            !isLoggedIn ? 
        <>
        <HMenu/>
            <div className='warningLogin'>
              <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
            </div>
            <div className='blackDiv'></div> 
        </> 
            :
        <>
            <LogOut/>
            <div>Turnos</div>
        </>
        }
        <Footer/>
    </>
  )
}

export default ProductsList
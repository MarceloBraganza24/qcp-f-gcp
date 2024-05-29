import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataPaLContext} from '../context/InputDataPaLContext';
import HMenu from './HMenu';
import ItemPartner from './ItemPartner';
import { Link } from 'react-router-dom';
import {OpenModalContext} from '../context/OpenModalContext'; 

const PartnersList = () => {
    const { inputFirstNamePaL, handleInputFirstNamePaL, inputLastNamePaL, handleInputLastNamePaL, inputDniPaL, handleInputDniPaL, inputPhonePaL, handleInputPhonePaL, inputEmailPaL, handleInputEmailPaL } = useContext(InputDataPaLContext);
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const [inputFilteredPartners, setInputFilteredPartners] = useState('');
    const [partners, setPartners] = useState([]);
    const {updatePartnerModal} = useContext(OpenModalContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners`)
            const partnersAll = await response.json();
            setPartners(partnersAll.data)
        }
        fetchData();

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
        const fetchUser = async () => {
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
        fetchUser();
        if(cookieValue) {
            login()
          } else {
            logout()
          }
    }, []);

    function convertirAFecha(cadenaFecha) {
        const [fecha, hora] = cadenaFecha.split(', ');
        const [dia, mes, año] = fecha.split('/');
        const [horas, minutos, segundos] = hora.split(':');
        return new Date(`${mes}/${dia}/${año} ${horas}:${minutos}:${segundos}`);
    }
    partners.sort((a, b) => convertirAFecha(b.partner_datetime) - convertirAFecha(a.partner_datetime));

    function filtrarPorApellido(valorIngresado) {
        const valorMinusculas = valorIngresado.toLowerCase();
        const objetosFiltrados = partners.filter(objeto => {
            const nombreMinusculas = objeto.last_name.toLowerCase();
            return nombreMinusculas.includes(valorMinusculas);
        });
        return objetosFiltrados;
    }
    const objetosFiltrados = filtrarPorApellido(inputFilteredPartners); 

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnCreatePartner = async() => {
        if(!inputFirstNamePaL || !inputLastNamePaL || !inputDniPaL || !inputPhonePaL || !inputEmailPaL) {
            toast('Debes completar todos los campos!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (!validateEmail(inputEmailPaL)) {
            toast('El email no es válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            document.getElementById('btnCreatePartner').style.display = 'none';
            document.getElementById('spinnerBtnCreatePartner').style.display = 'block';
            const partnerToCreate = {
                first_name: inputFirstNamePaL,
                last_name: inputLastNamePaL,
                dni: inputDniPaL,
                phone: inputPhonePaL,
                email: inputEmailPaL
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/partners/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partnerToCreate)
            })
            if(response.ok) {
                toast('Has registrado un socio correctamente!', {
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
            } else if (response.status === 409) {
                toast('Ya existe un socio con ese email!', {
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
            const data = await response.json();
            if(data.error === 'There is already a partner with that DNI and email') {
                toast('Ya existe un socio con ese dni y email!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a partner with that DNI') {
                toast('Ya existe un socio con ese DNI!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a partner with that email') {
                toast('Ya existe un socio con ese email!', {
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
        }
    };

    const buttonDisabledStyle = {
        color: 'black',
        cursor: 'pointer',
        backgroundColor: 'white'
    };

  return (
    <>
        <NavBar/>
        {
            isLoggedIn && role==='admin'?
            <>
                <HMenu/>

                <div className='partnersListContainer'>
                    <div className='partnersListContainer__title'>- Socios -</div>
                    <div className='partnersListContainer__inputFilteredPartners'>
                        {
                            !updatePartnerModal?
                            <input id='inputFilteredPartners' type='text' className='partnersListContainer__inputFilteredPartners__prop' placeholder='Ingrese un apellido' value={inputFilteredPartners} onChange={(e) => {setInputFilteredPartners(e.target.value)}}/>
                            :
                            <input disabled style={buttonDisabledStyle} id='inputFilteredPartners' type='text' className='partnersListContainer__inputFilteredPartners__prop' placeholder='Ingrese un apellido' value={inputFilteredPartners} onChange={(e) => {setInputFilteredPartners(e.target.value)}}/>
                        }
                    </div>
                    <div className='partnersListContainer__partnersList'>
                        <div className='partnersListContainer__partnersList__header'>
                            <div className='partnersListContainer__partnersList__header__label'>Nombre</div>
                            <div className='partnersListContainer__partnersList__header__label'>Apellido</div>
                            <div className='partnersListContainer__partnersList__header__label'>Dni</div>
                            <div className='partnersListContainer__partnersList__header__label'>Teléfono</div>
                            <div className='partnersListContainer__partnersList__header__label'>Email</div>
                        </div>
                        <div className='itemCreatePartner'>
                            {
                                !updatePartnerModal?
                                <>
                                    <div className='itemCreatePartner__input'>
                                        <input type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputFirstNamePaL} onChange={handleInputFirstNamePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputLastNamePaL} onChange={handleInputLastNamePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input className='itemCreatePartner__input__prop' placeholder='-' value={inputDniPaL} onChange={handleInputDniPaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input className='itemCreatePartner__input__prop' placeholder='-' value={inputPhonePaL} onChange={handleInputPhonePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input type='email' className='itemCreatePartner__input__prop' placeholder='-' value={inputEmailPaL} onChange={handleInputEmailPaL}/>
                                    </div>
                                    <div className='itemCreatePartner__btns'>
                                        <button id='btnCreatePartner' className='itemCreatePartner__btns__btn' onClick={handleBtnCreatePartner}>Registrar socio</button>
                                        <div id='spinnerBtnCreatePartner' className='spinner'></div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='itemCreatePartner__input'>
                                        <input disabled type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputFirstNamePaL} onChange={handleInputFirstNamePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input disabled type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputLastNamePaL} onChange={handleInputLastNamePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input disabled className='itemCreatePartner__input__prop' placeholder='-' value={inputDniPaL} onChange={handleInputDniPaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input disabled className='itemCreatePartner__input__prop' placeholder='-' value={inputPhonePaL} onChange={handleInputPhonePaL}/>
                                    </div>
                                    <div className='itemCreatePartner__input'>
                                        <input disabled type='email' className='itemCreatePartner__input__prop' placeholder='-' value={inputEmailPaL} onChange={handleInputEmailPaL}/>
                                    </div>
                                    <div className='itemCreatePartner__btns'>
                                        <button disabled style={buttonDisabledStyle} id='btnCreatePartner' className='itemCreatePartner__btns__btn' onClick={handleBtnCreatePartner}>Registrar socio</button>
                                        <div id='spinnerBtnCreatePartner' className='spinner'></div>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            inputFilteredPartners===''?
                                partners.map((partner) => {
                                    return(
                                        <ItemPartner
                                        id={partner._id}
                                        first_name={partner.first_name}
                                        last_name={partner.last_name}
                                        dni={partner.dni}
                                        phone={partner.phone}
                                        email={partner.email}   
                                        />
                                    )
                                })
                            :
                                objetosFiltrados.map((partner) => {
                                    return(
                                        <ItemPartner
                                        id={partner._id}
                                        first_name={partner.first_name}
                                        last_name={partner.last_name}
                                        dni={partner.dni}
                                        phone={partner.phone}
                                        email={partner.email}   
                                        />
                                    )
                                })
                                
                        }
                    </div>
                </div>
                <LogOut/>
            </>
            :
            <>
                <div className='warningLogin'>
                    <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
                </div>
                <div className='blackDiv'></div> 
            </>
        }
        <Footer/>
    </>
  )
}

export default PartnersList
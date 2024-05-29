import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataPrContext} from '../context/InputDataPrContext';
import HMenu from './HMenu';
import ItemProvider from './ItemProvider';
import { Link } from 'react-router-dom';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ProvidersList = () => {
    const { inputBusinessNamePr, handleInputBusinessNamePr, inputCuitCuilPr, handleInputCuitCuilPr, inputPhonePr, handleInputPhonePr, inputEmailPr, handleInputEmailPr } = useContext(InputDataPrContext);
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const [inputFilteredProviders, setInputFilteredProviders] = useState('');
    const [providers, setProviders] = useState([]);
    const {updateProviderModal} = useContext(OpenModalContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/providers`)
            const providersAll = await response.json();
            setProviders(providersAll.data)
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
    providers.sort((a, b) => convertirAFecha(b.provider_datetime) - convertirAFecha(a.provider_datetime));

    function filtrarPorRazonSocial(valorIngresado) {
        const valorMinusculas = valorIngresado.toLowerCase();
        const objetosFiltrados = providers.filter(objeto => {
            const nombreMinusculas = objeto.business_name.toLowerCase();
            return nombreMinusculas.includes(valorMinusculas);
        });
        return objetosFiltrados;
    }
    const objetosFiltrados = filtrarPorRazonSocial(inputFilteredProviders);    

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnCreateProvider = async() => {
        if(!inputBusinessNamePr || !inputCuitCuilPr || !inputPhonePr || !inputEmailPr) {
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
        } else if (!validateEmail(inputEmailPr?inputEmailPr:email)) {
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
            document.getElementById('btnCreateProvider').style.display = 'none';
            document.getElementById('spinnerBtnCreateProvider').style.display = 'block';
            const providerToCreate = {
                business_name: inputBusinessNamePr,
                cuit_cuil: inputCuitCuilPr,
                phone: inputPhonePr,
                email: inputEmailPr
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/providers/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(providerToCreate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has registrado un proveedor correctamente!', {
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
                toast('Ya existe un proveedor con ese email!', {
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
            if(data.error === 'There is already a provider with that CUIT-CUIL') {
                toast('Ya existe un proveedor con ese CUIT-CUIL!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a provider with that email') {
                toast('Ya existe un proveedor con ese email!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(data.error === 'There is already a provider with that business name') {
                toast('Ya existe un proveedor con esa razón social!', {
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
                <div className='providersListContainer'>
                    <div className='providersListContainer__title'>- Proveedores -</div>
                    <div className='providersListContainer__inputFilteredProviders'>
                        {
                            !updateProviderModal?
                            <input type='text' className='providersListContainer__inputFilteredProviders__prop' placeholder='Ingrese la razón social' value={inputFilteredProviders} onChange={(e) => {setInputFilteredProviders(e.target.value)}}/>
                            :
                            <input disabled style={buttonDisabledStyle} type='text' className='providersListContainer__inputFilteredProviders__prop' placeholder='Ingrese la razón social' value={inputFilteredProviders} onChange={(e) => {setInputFilteredProviders(e.target.value)}}/>
                        }
                    </div>
                    <div className='providersListContainer__providersList'>
                        <div className='providersListContainer__providersList__header'>
                            <div className='providersListContainer__providersList__header__label'>Razon social</div>
                            <div className='providersListContainer__providersList__header__label'>CUIT-CUIL</div>
                            <div className='providersListContainer__providersList__header__label'>Teléfono</div>
                            <div className='providersListContainer__providersList__header__label'>Email</div>
                        </div>
                        <div className='itemCreateProvider'>
                            {
                                !updateProviderModal?
                                <>
                                    <div className='itemCreateProvider__input'>
                                        <input type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputBusinessNamePr} onChange={handleInputBusinessNamePr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input className='itemCreateProvider__input__prop' placeholder='-' value={inputCuitCuilPr} onChange={handleInputCuitCuilPr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input className='itemCreateProvider__input__prop' placeholder='-' value={inputPhonePr} onChange={handleInputPhonePr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputEmailPr} onChange={handleInputEmailPr}/>
                                    </div>
                                    <div className='itemCreateProvider__btns'>
                                        <button id='btnCreateProvider' className='itemCreateProvider__btns__btn' onClick={handleBtnCreateProvider}>Registrar proveedor</button>
                                        <div id='spinnerBtnCreateProvider' className='spinner'></div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='itemCreateProvider__input'>
                                        <input disabled type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputBusinessNamePr} onChange={handleInputBusinessNamePr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input disabled className='itemCreateProvider__input__prop' placeholder='-' value={inputCuitCuilPr} onChange={handleInputCuitCuilPr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input disabled className='itemCreateProvider__input__prop' placeholder='-' value={inputPhonePr} onChange={handleInputPhonePr}/>
                                    </div>
                                    <div className='itemCreateProvider__input'>
                                        <input disabled type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputEmailPr} onChange={handleInputEmailPr}/>
                                    </div>
                                    <div className='itemCreateProvider__btns'>
                                        <button disabled style={buttonDisabledStyle} id='btnCreateProvider' className='itemCreateProvider__btns__btn' onClick={handleBtnCreateProvider}>Registrar proveedor</button>
                                        <div id='spinnerBtnCreateProvider' className='spinner'></div>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            objetosFiltrados.map((provider) => {
                                return(
                                    <ItemProvider
                                    id={provider._id}
                                    businessName={provider.business_name}
                                    cuitCuil={provider.cuit_cuil}
                                    phone={provider.phone}
                                    email={provider.email}
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

export default ProvidersList
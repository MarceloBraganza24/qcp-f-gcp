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
    const {isOpen} = useContext(OpenModalContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8081/api/providers`)
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
              const response = await fetch(`http://localhost:8081/api/sessions/current?cookie=${cookieValue}`)
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
        } else {
            const providerToCreate = {
                business_name: inputBusinessNamePr,
                cuit_cuil: inputCuitCuilPr,
                phone: inputPhonePr,
                email: inputEmailPr
            }
            const response = await fetch(`http://localhost:8081/api/providers/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(providerToCreate)
            })
            const data = await response.json();
            if(data.error === 'No recipients defined') {
                toast('El formato del campo email ingresado no es valido!', {
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
                            !isOpen?
                            <input type='text' className='providersListContainer__inputFilteredProviders__prop' placeholder='Ingrese la razón social' value={inputFilteredProviders} onChange={(e) => {setInputFilteredProviders(e.target.value)}}/>
                            :
                            <input disabled style={buttonDisabledStyle} type='text' className='providersListContainer__inputFilteredProviders__prop' placeholder='Ingrese la razón social' value={inputFilteredProviders} onChange={(e) => {setInputFilteredProviders(e.target.value)}}/>
                        }
                    </div>
                    <div className='providersListContainer__providersList'>
                        <div className='providersListContainer__providersList__header'>
                            <div>Razon social</div>
                            <div>CUIT-CUIL</div>
                            <div>Teléfono</div>
                            <div>Email</div>
                        </div>
                        <div className='itemCreateProvider'>
                            <div className='itemCreateProvider__input'>
                                <input type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputBusinessNamePr} onChange={(e) => {handleInputBusinessNamePr(e.target.value)}}/>
                            </div>
                            <div className='itemCreateProvider__input'>
                                <input type='number' className='itemCreateProvider__input__prop' placeholder='-' value={inputCuitCuilPr} onChange={(e) => {handleInputCuitCuilPr(e.target.value)}}/>
                            </div>
                            <div className='itemCreateProvider__input'>
                                <input type='number' className='itemCreateProvider__input__prop' placeholder='-' value={inputPhonePr} onChange={(e) => {handleInputPhonePr(e.target.value)}}/>
                            </div>
                            <div className='itemCreateProvider__input'>
                                <input type='text' className='itemCreateProvider__input__prop' placeholder='-' value={inputEmailPr} onChange={(e) => {handleInputEmailPr(e.target.value)}}/>
                            </div>
                            {
                                !isOpen?
                                <div className='itemCreateProvider__btns'>
                                    <button className='itemCreateProvider__btns__btn' onClick={handleBtnCreateProvider}>Registrar proveedor</button>
                                </div>
                                :
                                <div className='itemCreateProvider__btns'>
                                    <button disabled style={buttonDisabledStyle} className='itemCreateProvider__btns__btn' onClick={handleBtnCreateProvider}>Registrar proveedor</button>
                                </div>
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
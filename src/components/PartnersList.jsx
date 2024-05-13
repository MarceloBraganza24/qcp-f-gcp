import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataPaContext} from '../context/InputDataPaContext';
import HMenu from './HMenu';
import ItemPartner from './ItemPartner';
import { Link } from 'react-router-dom';

const PartnersList = () => {
    const { inputFirstNamePa, handleInputFirstNamePa, inputLastNamePa, handleInputLastNamePa, inputDniPa, handleInputDniPa, inputPhonePa, handleInputPhonePa, inputEmailPa, handleInputEmailPa } = useContext(InputDataPaContext);
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const [inputFilteredPartners, setInputFilteredPartners] = useState('');
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8081/api/partners`)
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
    partners.sort((a, b) => convertirAFecha(b.partner_datetime) - convertirAFecha(a.partner_datetime));

    function filtrarPorApellido(valorIngresado) {
        // Convertimos el valor ingresado a minúsculas para hacer la comparación sin importar mayúsculas o minúsculas
        const valorMinusculas = valorIngresado.toLowerCase();
        
        // Filtramos el arreglo de objetos
        const objetosFiltrados = partners.filter(objeto => {
            // Convertimos el nombre del objeto a minúsculas para la comparación
            const nombreMinusculas = objeto.last_name.toLowerCase();
            // Retornamos true si el nombre del objeto contiene el valor ingresado
            return nombreMinusculas.includes(valorMinusculas);
        });
    
        return objetosFiltrados;
    }
    const objetosFiltrados = filtrarPorApellido(inputFilteredPartners);
    //console.log(objetosFiltrados);
    /* inputFilteredPartners.addEventListener('input', function() {
        const valorInput = this.value; // Obtener el valor del input
        const objetosFiltrados = filtrarPorNombre(valorInput);
        console.log(objetosFiltrados);
        // Aquí puedes hacer lo que necesites con el arreglo filtrado, como mostrarlo en pantalla
    }); */

    

    const handleBtnCreatePartner = async() => {
        if(!inputFirstNamePa || !inputLastNamePa || !inputDniPa || !inputPhonePa || !inputEmailPa) {
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
            const partnerToCreate = {
                first_name: inputFirstNamePa,
                last_name: inputLastNamePa,
                dni: inputDniPa,
                phone: inputPhonePa,
                email: inputEmailPa
            }
            const response = await fetch(`http://localhost:8081/api/partners/register`, {
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
            }
        }
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
                        <input id='inputFilteredPartners' type='text' className='partnersListContainer__inputFilteredPartners__prop' placeholder='Ingrese un apellido' value={inputFilteredPartners} onChange={(e) => {setInputFilteredPartners(e.target.value)}}/>
                    </div>
                    <div className='partnersListContainer__partnersList'>
                        <div className='partnersListContainer__partnersList__header'>
                            <div>Nombre</div>
                            <div>Apellido</div>
                            <div>Dni</div>
                            <div>Teléfono</div>
                            <div>Email</div>
                        </div>
                        <div className='itemCreatePartner'>
                            <div className='itemCreatePartner__input'>
                                <input type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputFirstNamePa} onChange={(e) => {handleInputFirstNamePa(e.target.value)}}/>
                            </div>
                            <div className='itemCreatePartner__input'>
                                <input type='text' className='itemCreatePartner__input__prop' placeholder='-' value={inputLastNamePa} onChange={(e) => {handleInputLastNamePa(e.target.value)}}/>
                            </div>
                            <div className='itemCreatePartner__input'>
                                <input type='number' className='itemCreatePartner__input__prop' placeholder='-' value={inputDniPa} onChange={(e) => {handleInputDniPa(e.target.value)}}/>
                            </div>
                            <div className='itemCreatePartner__input'>
                                <input type='number' className='itemCreatePartner__input__prop' placeholder='-' value={inputPhonePa} onChange={(e) => {handleInputPhonePa(e.target.value)}}/>
                            </div>
                            <div className='itemCreatePartner__input'>
                                <input type='email' className='itemCreatePartner__input__prop' placeholder='-' value={inputEmailPa} onChange={(e) => {handleInputEmailPa(e.target.value)}}/>
                            </div>
                            <div className='itemCreatePartner__btns'>
                                <button className='itemCreatePartner__btns__btn' onClick={handleBtnCreatePartner}>Registrar socio</button>
                            </div>
                        </div>
                        {
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
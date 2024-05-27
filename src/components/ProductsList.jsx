import React, { useEffect, useContext, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataProdContext} from '../context/InputDataProdContext';
import HMenu from './HMenu';
import ItemProduct from './ItemProduct';
import { Link } from 'react-router-dom';
import {OpenModalContext} from '../context/OpenModalContext'; 

const ProductsList = () => {
    const { inputTitleProd, handleInputTitleProd, inputDescriptionProd, handleInputDescriptionProd, inputPriceProd, handleInputPriceProd, inputStockProd, handleInputStockProd, inputCategoryProd, handleInputCategoryProd } = useContext(InputDataProdContext);
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [role, setRole] = useState('');
    const [inputFilteredProducts, setInputFilteredProducts] = useState('');
    const [products, setProducts] = useState([]);
    const {isOpen} = useContext(OpenModalContext);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/products`)
            const productsAll = await response.json();
            setProducts(productsAll.data)
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
    products.sort((a, b) => convertirAFecha(b.product_datetime) - convertirAFecha(a.product_datetime));

    function filtrarPorTitulo(valorIngresado) {
        const valorMinusculas = valorIngresado.toLowerCase();
        const objetosFiltrados = products.filter(objeto => {
            const nombreMinusculas = objeto.title.toLowerCase();
            return nombreMinusculas.includes(valorMinusculas);
        });
        return objetosFiltrados;
    }
    const objetosFiltrados = filtrarPorTitulo(inputFilteredProducts);    

    const handleBtnCreateProduct = async() => {
        if(!inputTitleProd || !inputDescriptionProd || !inputPriceProd || !inputStockProd || !inputCategoryProd) {
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
            document.getElementById('btnCreateProduct').style.display = 'none';
            document.getElementById('spinnerBtnCreateProduct').style.display = 'block';
            const productToCreate = {
                title: inputTitleProd,
                description: inputDescriptionProd,
                price: inputPriceProd,
                stock: inputStockProd,
                category: inputCategoryProd
            }
            const response = await fetch(`https://que-corte-peluquerias-backend-mkxktyjzsa-rj.a.run.app/api/products/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToCreate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has registrado un producto correctamente!', {
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
            if(data.error === 'There is already a product with that title') {
                toast('Ya existe un producto con ese título!', {
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
                <div className='productsListContainer'>
                    <div className='productsListContainer__title'>- Productos -</div>
                    <div className='productsListContainer__inputFilteredProducts'>
                        {
                            !isOpen?
                            <input type='text' className='productsListContainer__inputFilteredProducts__prop' placeholder='Ingrese un producto' value={inputFilteredProducts} onChange={(e) => {setInputFilteredProducts(e.target.value)}}/>
                            :
                            <input disabled style={buttonDisabledStyle} type='text' className='productsListContainer__inputFilteredProducts__prop' placeholder='Ingrese un producto' value={inputFilteredProducts} onChange={(e) => {setInputFilteredProducts(e.target.value)}}/>
                        }
                    </div>
                    <div className='productsListContainer__productsList'>
                        <div className='productsListContainer__productsList__header'>
                            <div className='productsListContainer__productsList__header__label'>Título</div>
                            <div className='productsListContainer__productsList__header__label'>Descripción</div>
                            <div className='productsListContainer__productsList__header__label'>Precio</div>
                            <div className='productsListContainer__productsList__header__label'>Stock</div>
                            <div className='productsListContainer__productsList__header__label'>Categoría</div>
                        </div>
                        <div className='itemCreateProduct'>
                            <div className='itemCreateProduct__input'>
                                <input type='text' className='itemCreateProduct__input__prop' placeholder='-' value={inputTitleProd} onChange={handleInputTitleProd}/>
                            </div>
                            <div className='itemCreateProduct__input'>
                                <input className='itemCreateProduct__input__prop' placeholder='-' value={inputDescriptionProd} onChange={handleInputDescriptionProd}/>
                            </div>
                            <div className='itemCreateProduct__input'>
                                <input className='itemCreateProduct__input__prop' placeholder='-' value={inputPriceProd} onChange={handleInputPriceProd}/>
                            </div>
                            <div className='itemCreateProduct__input'>
                                <input className='itemCreateProduct__input__prop' placeholder='-' value={inputStockProd} onChange={handleInputStockProd}/>
                            </div>
                            <div className='itemCreateProduct__input'>
                                <input type='text' className='itemCreateProduct__input__prop' placeholder='-' value={inputCategoryProd} onChange={handleInputCategoryProd}/>
                            </div>
                            {
                                !isOpen?
                                <div className='itemCreateProduct__btns'>
                                    <button id='btnCreateProduct' className='itemCreateProduct__btns__btn' onClick={handleBtnCreateProduct}>Registrar producto</button>
                                    <div id='spinnerBtnCreateProduct' className='spinner'></div>
                                </div>
                                :
                                <div className='itemCreateProduct__btns'>
                                    <button disabled style={buttonDisabledStyle} className='itemCreateProduct__btns__btn' onClick={handleBtnCreateProduct}>Registrar producto</button>
                                </div>
                            }
                        </div>
                        {
                            objetosFiltrados.map((product) => {
                                return(
                                    <ItemProduct
                                    id={product._id}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock}
                                    category={product.category}
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

export default ProductsList
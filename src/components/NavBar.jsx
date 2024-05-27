import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {OpenModalContext} from '../context/OpenModalContext'; 
import HMenuMobile from './HMenuMobile';
import LogOutMobile from './LogOutMobile';

const NavBar = () => {
    const {isOpen} = useContext(OpenModalContext);

  return (
    <>
        <div className='navBarMobileContainer'>
            <div className='navBarMobileContainer__hMenuMobileContainer'>
                <HMenuMobile/>
            </div>
            <Link to={"/"} className='navBarMobileContainer__title'>
                Que Corte
            </Link>
            <div className='navBarMobileContainer__logOutMobileContainer'>
                <LogOutMobile/>
            </div>
        </div>
        <div className='navBarContainer'>
            <div className='navBarContainer__logo-title'>
                <div className='navBarContainer__logo-title__logo'>
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBrSExOtd_PwUgTS8e1hRD7FuR7NowxNMfpLSQ-41bh7EMVrcMeoiLmfSfQxdDFsXd4WemcqxBu2cj2rGlEMvjSJ69NcZv6j7iANaCELNFU_kNHRGngdomj_M9QhvVo7mZHco0pEP1MCMrS7q2vCwxI2nYMm5LHRzhqQyPuqniVGPpF1sHIj8zjgH68p0/s200/qcp-logo-que-corte.jpg" alt="logo-que-corte" className='navBarContainer__logo-title__logo__prop' />
                </div>
                <div className='navBarContainer__logo-title__title'>
                    {       
                        !isOpen?
                        <Link to={"/"} className='navBarContainer__logo-title__title__prop'>
                            Que Corte
                        </Link>
                        :
                        <div className='navBarContainer__logo-title__title__prop'>Que Corte</div>
                    }
                    
                </div>
            </div>
            <div className='navBarContainer__phrase-btns'>
                <div className='navBarContainer__phrase-btns__phrase'>
                    <p className='navBarContainer__phrase-btns__phrase__prop'>. . . Trabajamos para resaltar tu belleza . . .</p>
                </div>
                <div className='navBarContainer__phrase-btns__btns'>
                    {
                        !isOpen?
                        <Link to={"/"} className='navBarContainer__phrase-btns__btns__prop'>
                            Inicio
                        </Link>
                        :
                        <div className='navBarContainer__phrase-btns__btns__prop'>Inicio</div>
                    }
                    {
                        !isOpen?
                        <Link to={"/shifts"} className='navBarContainer__phrase-btns__btns__prop'>
                            Turnos
                        </Link>
                        :
                        <div className='navBarContainer__phrase-btns__btns__prop'>Turnos</div>
                    }
                    {
                        !isOpen?
                        <Link to={"/cuts"} className='navBarContainer__phrase-btns__btns__prop'>
                            Cortes
                        </Link>
                        :
                        <div className='navBarContainer__phrase-btns__btns__prop'>Cortes</div>
                    }
                    {
                        !isOpen?
                        <Link to={"/about"} className='navBarContainer__phrase-btns__btns__prop'>
                            Sobre nosotros
                        </Link>
                        :
                        <div className='navBarContainer__phrase-btns__btns__prop'>Sobre nosotros</div>
                    }
                    {
                        !isOpen?
                        <Link to={"/partners"} className='navBarContainer__phrase-btns__btns__prop'>
                            Socios
                        </Link>
                        :
                        <div className='navBarContainer__phrase-btns__btns__prop'>Socios</div>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default NavBar
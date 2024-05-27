import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import HMenu from './HMenu'
import { Link } from 'react-router-dom'
import LogOut from './LogOut';
import {IsLoggedContext} from '../context/IsLoggedContext';

const Cuts = () => {
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
  return (
    <>
        <NavBar/>
        {
          isLoggedIn && role==='admin'?
          <>
            <HMenu/>
            <div className='cutsContainer'>
                <div className='cutsContainer__cuts'>
                  <div id="carouselExample" class="carousel slide">
                      <div class="carousel-inner">
                      <div class="carousel-item active">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtOgYcWeGVNMRr98GTFcuhBFG6AUC08Y3B6BPBqqzaggvr2f0C6WF-Bn73CZm_TBxhSJNAPpMO9qUBkUn4D-fzTaEJwUeGuVQCKCFidE2e5O9QTAyUpDoNfIdelpGn-sI6jINhYWW-8GpgPG0n87nIdgG77lY_iA2xVhdEeRhQgolz1L0VA3oiVUFDftw/s1920/qcp-corte1.jpg"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZp7fNouF12ilH0r9if3K8AlThw14Qm2rqHjgTQSz2npBYvLNx_e4NH_n2SU6fr2rvJmA7AGSytKK_b0yBpC32nciuuPzgMj8yWG1P1a-C1isMnRvTCJ_moPO3L2_Fv3QGI9FNtHmYbXsfdh-v5G_59tNVwOHbrvDEvqPj2qVzNv3ceJtYw1pkZLa07fM/s1078/qcp-corte2.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM9r1L9_-3v8lYwbd1LqLUN6u37XS0dv-pc7qgs_CJmsAFKzqB8eDiMZ4jyFg7AbiRESn_kDhBUPMrqMU3xHSe0N46in05GG4vxShfzMA4glvgsB0k5ugjVh9KAo9kn6HbWTQsljEFVCCk9V_-rArVl7Havl9Yrlv0wCiFlBrlDmZEglnKphiV-TU2SpY/s1350/qcp-corte4.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                      </button>
                  </div>
              </div>
            </div>
            <LogOut/>
          </>
          : isLoggedIn?
          <>
            <div className='cutsContainer'>
                <div className='cutsContainer__cuts'>
                  <div id="carouselExample" class="carousel slide">
                      <div class="carousel-inner">
                      <div class="carousel-item active">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtOgYcWeGVNMRr98GTFcuhBFG6AUC08Y3B6BPBqqzaggvr2f0C6WF-Bn73CZm_TBxhSJNAPpMO9qUBkUn4D-fzTaEJwUeGuVQCKCFidE2e5O9QTAyUpDoNfIdelpGn-sI6jINhYWW-8GpgPG0n87nIdgG77lY_iA2xVhdEeRhQgolz1L0VA3oiVUFDftw/s1920/qcp-corte1.jpg"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZp7fNouF12ilH0r9if3K8AlThw14Qm2rqHjgTQSz2npBYvLNx_e4NH_n2SU6fr2rvJmA7AGSytKK_b0yBpC32nciuuPzgMj8yWG1P1a-C1isMnRvTCJ_moPO3L2_Fv3QGI9FNtHmYbXsfdh-v5G_59tNVwOHbrvDEvqPj2qVzNv3ceJtYw1pkZLa07fM/s1078/qcp-corte2.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM9r1L9_-3v8lYwbd1LqLUN6u37XS0dv-pc7qgs_CJmsAFKzqB8eDiMZ4jyFg7AbiRESn_kDhBUPMrqMU3xHSe0N46in05GG4vxShfzMA4glvgsB0k5ugjVh9KAo9kn6HbWTQsljEFVCCk9V_-rArVl7Havl9Yrlv0wCiFlBrlDmZEglnKphiV-TU2SpY/s1350/qcp-corte4.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                      </button>
                  </div>
              </div>
            </div>
            <LogOut/>
          </>
          :
          <>
            <div className='warningLogin'>
              <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
            </div>
            <div className='cutsContainer'>
                <div className='cutsContainer__cuts'>
                  <div id="carouselExample" class="carousel slide">
                      <div class="carousel-inner">
                      <div class="carousel-item active">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtOgYcWeGVNMRr98GTFcuhBFG6AUC08Y3B6BPBqqzaggvr2f0C6WF-Bn73CZm_TBxhSJNAPpMO9qUBkUn4D-fzTaEJwUeGuVQCKCFidE2e5O9QTAyUpDoNfIdelpGn-sI6jINhYWW-8GpgPG0n87nIdgG77lY_iA2xVhdEeRhQgolz1L0VA3oiVUFDftw/s1920/qcp-corte1.jpg"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZp7fNouF12ilH0r9if3K8AlThw14Qm2rqHjgTQSz2npBYvLNx_e4NH_n2SU6fr2rvJmA7AGSytKK_b0yBpC32nciuuPzgMj8yWG1P1a-C1isMnRvTCJ_moPO3L2_Fv3QGI9FNtHmYbXsfdh-v5G_59tNVwOHbrvDEvqPj2qVzNv3ceJtYw1pkZLa07fM/s1078/qcp-corte2.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      <div class="carousel-item">
                          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjM9r1L9_-3v8lYwbd1LqLUN6u37XS0dv-pc7qgs_CJmsAFKzqB8eDiMZ4jyFg7AbiRESn_kDhBUPMrqMU3xHSe0N46in05GG4vxShfzMA4glvgsB0k5ugjVh9KAo9kn6HbWTQsljEFVCCk9V_-rArVl7Havl9Yrlv0wCiFlBrlDmZEglnKphiV-TU2SpY/s1350/qcp-corte4.jpg" class="d-block w-100" alt="imagenPeluqueria"/>
                      </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                      </button>
                  </div>
              </div>
            </div>
          </>
        }
        <Footer/>
    </>
  )
}

export default Cuts
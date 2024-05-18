import Login from './components/Login'
import SingUp from './components/SingUp';
import Home from './components/Home';
import Shifts from './components/Shifts';
import About from './components/About';
import Cuts from './components/Cuts';
import Partners from './components/Partners';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsLoggedInContext } from './context/IsLoggedContext'
import { ParentComponent } from './context/InputDataShContext'
import { ParentPaComponent } from './context/InputDataPaContext'
import { ParentPrComponent } from './context/InputDataPrContext'
import { ParentProdComponent } from './context/InputDataProdContext'
import { ParentShLComponent } from './context/InputDataShLContext'
import ShiftsList from './components/ShiftsList';
import PartnersList from './components/PartnersList';
import ProductsList from './components/ProductsList';
import ProvidersList from './components/ProvidersList';
import { OpenModalContextComponent } from './context/OpenModalContext';

function App() {

  return (

    <BrowserRouter>

      <IsLoggedInContext>

        <ParentPaComponent>

        <ParentPrComponent>

        <ParentProdComponent>

        <ParentComponent>

        <ParentShLComponent>

        <OpenModalContextComponent>

          <Routes>

            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/singUp" element={<SingUp/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/shifts" element={<Shifts/>}/>
            <Route exact path="/shiftsList" element={<ShiftsList/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/cuts" element={<Cuts/>}/>
            <Route exact path="/partners" element={<Partners/>}/>
            <Route exact path="/partnersList" element={<PartnersList/>}/>
            <Route exact path="/providersList" element={<ProvidersList/>}/>
            <Route exact path="/productsList" element={<ProductsList/>}/>

          </Routes>
          
          <ToastContainer />

        </OpenModalContextComponent>

        </ParentShLComponent>

        </ParentComponent>

        </ParentProdComponent>
        
        </ParentPrComponent>

        </ParentPaComponent>

      </IsLoggedInContext>

    </BrowserRouter>

  )

}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"

import Footer from "./components/footer/Footer"
import Ad from "./components/ad/Ad"
import Ads from './components/ads/Ads';
import CreateAd from './components/ad-create/AdCreate';
import AdDetails from './components/ad-details/AdDetails';





function App() {

  return (
    <>
    <Header/>
    <Routes>  
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/logout" element={<Login/>}/> */}
      

      <Route path="/profile/:profileId/details" />
      {/* <Route path="/profile/:profileId/edit" /> */}
      {/* <Route path="/profile/:profileId/delete" /> */}

      <Route path="/ads" element={<Ads/>}/>
      <Route path="/ads/create" element={<CreateAd/>}/>
      <Route path="/ads/:adId/details" element={<AdDetails/>}/>
      {/* <Route path="/ads/:adId/edit" element={<AdEdit/>}/> */}
      {/* <Route path="/ads/:adId/delete" element={<AdDelete/>}/> */}
    
    </Routes>
    
    <Footer/>
  </>
  )
}

export default App

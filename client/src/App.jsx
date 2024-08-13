import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"

import Footer from "./components/footer/Footer"
import Ad from "./components/ad/Ad"
import Ads from './components/ads/Ads';
import AdDetails from './components/ad-details/AdDetails';
import AdEdit from './components/ad-edit/AdEdit';
// import AdDelete from './components/ad-delete/AdDelete';
import CreateAd from './components/ad-create/AdCreate';
import Logout from './components/logout/Logout';
import {AuthContextProvider} from "./contexts/AuthContext";




function App() {


  return (
    <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />


          <Route path="/profile/:profileId/details" />
          {/* <Route path="/profile/:profileId/edit" /> */}
          {/* <Route path="/profile/:profileId/delete" /> */}

          <Route path="/ads" element={<Ads />} />
          <Route path="/ads/create" element={<CreateAd />} />
          <Route path="/ads/:adId/details" element={<AdDetails />} />
          <Route path="/ads/:adId/edit" element={<AdEdit/>}/>
          {/* <Route path="/ads/:adId/delete" element={<AdDelete/>}/> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
    </AuthContextProvider>
  )
}

export default App

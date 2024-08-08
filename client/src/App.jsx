import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {AuthContext} from './contexts/authContext';
import { Routes, Route } from 'react-router-dom'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"

import Footer from "./components/footer/Footer"
import Ad from "./components/ad/Ad"
import Ads from './components/ads/Ads';
import AdDetails from './components/ad-details/AdDetails';
import CreateAd from './components/ad-create/AdCreate';
// import AdDetails from './components/ad-details/AdDetails';





function App() {
  const [authState, setAuthState] = useState({});
  
  const changeAuthState = (state) => {
    localStorage.setItem('accessToken', state.accessToken)
  
    setAuthState(state);
  };
  
  const contextData = {
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  }
  
  console.log(contextData.email)

  return (
    <AuthContext.Provider value={contextData}>
      <>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/logout" element={<Login/>}/> */}


          <Route path="/profile/:profileId/details" />
          {/* <Route path="/profile/:profileId/edit" /> */}
          {/* <Route path="/profile/:profileId/delete" /> */}

          <Route path="/ads" element={<Ads />} />
          <Route path="/ads/create" element={<CreateAd />} />
          <Route path="/ads/:adId/details" element={<AdDetails />} />
          {/* <Route path="/ads/:adId/edit" element={<AdEdit/>}/> */}
          {/* <Route path="/ads/:adId/delete" element={<AdDelete/>}/> */}

        </Routes>

        <Footer />
      </>
    </AuthContext.Provider>
  )
}

export default App

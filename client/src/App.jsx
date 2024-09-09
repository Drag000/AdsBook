import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"

import Footer from "./components/footer/Footer"
import Ads from './components/ads/Ads';
import AdDetails from './components/ad-details/AdDetails';
import AdEdit from './components/ad-edit/AdEdit';
import AdDelete from './components/ad-delete/AdDelete';
import CreateAd from './components/ad-create/AdCreate';
import Logout from './components/logout/Logout';
import { AuthContextProvider } from "./contexts/AuthContext";
import PrivateGuard from './components/common/PrivateGuard';
import MyAds from './components/my-ads/MyAds';
import ProfileDetails from './components/profile-details/ProfileDetails';
import ProfileEdit from './components/profile-edit/ProfileEdit'
import PasswordUpdate from './components/password-update/PasswordUpdate';
import ProfileDelete from './components/profile-delete/ProfileDelete';
import "bootstrap/dist/css/bootstrap.css";

function App() {


  return (
    <AuthContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/ads" element={<Ads />} />

        <Route path="*" element={<Navigate to="/" />} />

        <Route element={<PrivateGuard />}>
          <Route path="/ads/create" element={<CreateAd />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/ads/myads" element={<MyAds />} />
          <Route path="/ads/:adId/details" element={<AdDetails />} />
          <Route path="/ads/:adId/edit" element={<AdEdit />} />
          <Route path="/ads/:adId/delete" element={<AdDelete />} />

          <Route path="/profile/:profileId/details" element={<ProfileDetails />} />
          <Route path="/profile/:profileId/edit" element={<ProfileEdit />} />
          <Route path="/profile/:profileId/delete" element={<ProfileDelete />} />
          <Route path="/profile/:profileId/change-password" element={<PasswordUpdate />} />

        </Route>


      </Routes>

      <Footer />
    </AuthContextProvider>
  )
}

export default App

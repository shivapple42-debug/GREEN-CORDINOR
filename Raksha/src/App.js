import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";

import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import States from "./Components/States";
import Background from "./Components/Background";
import Features from "./Components/Features";
import Howitwork from "./Components/Howitwork";
import Testimonilas from "./Components/Testimonilas";
import Footer from "./Components/Footer";

import Map from "./Pages/Map";
import Services from "./Pages/Services";
import LiveTracking from "./Pages/LiveTracking";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Adminpanel from "./Admin/Adminpanel";

import Dashboard from "./Department/Dashboard";
import { AuthProvider } from "./Department/AuthContext";
import PoliceDashboard from "./Department/PoliceDashboard";
import Firedashboard from "./Department/Firedashboard";
import Vipdashboard from "./Department/Vipdashboard";
import Ambulance from "./Department/Ambulence";
import Scroll from '../src/Hooks/Scroll';

function Home() {
  return (
    <>
      <Main />
      <States />
      <Features />
      <Howitwork />
      <Testimonilas />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Background />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/services" element={<Services />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Adminpanel />} />

        <Route path="/dashboard/:department" element={<Dashboard />} />
        <Route path="/policdashboard" element={<PoliceDashboard />} />
        <Route path="/Firedashboard" element={<Firedashboard />} />
        <Route path="/vipdashboard" element={<Vipdashboard />} />
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/scroll" element={<Scroll />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
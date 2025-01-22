import React from 'react'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Blog from './pages/Blog'
import Product from './pages/Product'
import BackToTop from "./components/BackToTop";
import Footer from './components/Footer'
import Notification from './components/Notification'
import { ToastContainer } from 'react-toastify'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'

const App = () => {
  return (
    <main className='overflow-hidden text-tertiary'>
      <ToastContainer />
      {/* <Notification /> */}
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} /> 
        <Route path='/blog' element={<Blog />} /> 
        <Route path='/product/:productId' element={<Product />} /> 
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/place-order' element={<PlaceOrder />} /> 
        <Route path='/login' element={<Login />} /> 
      </Routes>
      <Footer />
      <BackToTop />
    </main>
  )
}

export default App

// 7:46:54
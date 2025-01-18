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

const App = () => {
  return (
    <main className='overflow-hidden text-tertiary'>
      <Notification />
      <Header className="sticky top-0 z-50"/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} /> 
        <Route path='/blog' element={<Blog />} /> 
        <Route path='/product/:productId' element={<Product />} /> 
      </Routes>
      <Footer />
      <BackToTop />
    </main>
  )
}

export default App

// 4:07:46
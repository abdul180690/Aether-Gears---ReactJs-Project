import React from 'react'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Blog from './pages/Blog'
import Product from './pages/Product'

const App = () => {
  return (
    <main className='overflow-hidden text-tertiary'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} /> 
        <Route path='/blog' element={<Blog />} /> 
        <Route path='/product/:productId' element={<Product />} /> 
      </Routes>
    </main>
  )
}

export default App

// 4:07:46
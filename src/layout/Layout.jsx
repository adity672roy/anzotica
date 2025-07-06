import React from 'react'
import Navbar from '../components/header/Navbar'

const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default Layout
import React from 'react'
import AuthentictedRoutes from './authentictedRoutes';
import AuthRoutes from './authRoutes';
import CommonRoutes from './commonRoutes';

const IndexRoutes = () => {
    const token = localStorage.getItem('token')
  return (
    <>
    {token?<AuthentictedRoutes/>:<AuthRoutes/>}
    <CommonRoutes/>
    </>
   
  
  )
}

export default IndexRoutes
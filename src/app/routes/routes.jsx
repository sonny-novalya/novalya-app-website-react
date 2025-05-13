import React, { useEffect } from 'react'
import AuthentictedRoutes from './authentictedRoutes';
import AuthRoutes from './authRoutes';
import CommonRoutes from './commonRoutes';

const IndexRoutes = () => {
    const token = localStorage.getItem('token')

    const getUTMParams = () => {
      const params = new URLSearchParams(window.location.search);
      return {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_term: params.get("utm_term"),
        utm_content: params.get("utm_content"),
      };
    };


    useEffect(() => {
      let params =getUTMParams()
      if(params?.utm_source){
        localStorage.setItem("UTM_DATA", JSON.stringify(params))
      }
    }, [window.location]);
  return (
    <>
    {token?<AuthentictedRoutes/>:<AuthRoutes/>}
    <CommonRoutes/>
    </>
   
  
  )
}

export default IndexRoutes
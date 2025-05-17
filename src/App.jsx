
import { BrowserRouter } from 'react-router-dom'
import IndexRoutes from './app/routes/routes'
import './services/i18/i18n'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
const selectedLocale = localStorage.getItem('selectedLocale') || 'en-US'
  const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const userId = urlParams.get("userId");
if (token && userId) {
  
  const expirationYears = 10; // 10 years
  const expirationDate = new Date();
  expirationDate.setFullYear(
    expirationDate.getFullYear() + expirationYears
  );

  document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `user_id=${userId}; expires=${expirationDate.toUTCString()}; path=/`;
  localStorage.setItem('token', token)
  localStorage.setItem("loggedin","/?loggedin=true")

 
}

useEffect(() => {
  i18n.changeLanguage(selectedLocale);
}, [selectedLocale])


  return (
    <>
   <BrowserRouter>
    <IndexRoutes/>
   </BrowserRouter>
    </>
  )
}

export default App

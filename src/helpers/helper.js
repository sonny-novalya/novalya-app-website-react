export  const removeAllCookies  = ()=>{
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
    return true;
}

export const loginSenerios = (response)=>{
    const userId = response?.user?.id || 0;
    const authToken = response.token;
    if(response?.user?.website === "nuskin"){
     
      if((window.location.href).includes("localhost") && !(window.location.href).includes("wcy-nuskin")) {
        let  CurrURL = window.location.href.replace(/\blocalhost\b/g, "wcy-nuskin.localhost")
        CurrURL= CurrURL.replace(/\/login\b/g, "")
        window.location.href =CurrURL + `?token=${authToken}&userId=${userId}`
      }else if((window.location.href).includes("wcy-nuskin") && !(window.location.href).includes("localhost")){
        localStorage.setItem('token', authToken)
        const expirationYears = 10; // 10 years
        const expirationDate = new Date();
        expirationDate.setFullYear(
          expirationDate.getFullYear() + expirationYears
        );

        document.cookie = `authToken=${authToken}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `user_id=${userId}; expires=${expirationDate.toUTCString()}; path=/`;

        
      }else{
        window.location.href = `https://wcy-nuskin.novalya.com?token=${authToken}&userId=${userId}`
      }     
    }
    else{
      if((window.location.href).includes("localhost") &&(window.location.href).includes("wcy-nuskin")) {
        let curr =window.location.href.split(":")
        window.location.href = `http://localhost:${curr?.[2] || 5173}?token=${authToken}&userId=${userId}`
      } else if((window.location.href).includes("app.novalya.com")){
        localStorage.setItem('token', authToken)
        const expirationYears = 10; // 10 years
        const expirationDate = new Date();
        expirationDate.setFullYear(
          expirationDate.getFullYear() + expirationYears
        );

        document.cookie = `authToken=${authToken}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `user_id=${userId}; expires=${expirationDate.toUTCString()}; path=/`;

      }else if((window.location.href).includes("localhost")){
        let curr = window.location.href.split(":")
        window.location.href = `http://localhost:${curr?.[2] || 5173}?token=${authToken}&userId=${userId}`
      }else if((window.location.href).includes("dev.novalya.com")){
             window.location.href = `https://dev.novalya.com?token=${authToken}&userId=${userId}`
      }else{
        window.location.href = `https://app.novalya.com?token=${authToken}&userId=${userId}`
      }

    }
}
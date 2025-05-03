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
    const url = checkDoamin(response?.user?.website)
     window.location.href = `${url}?token=${authToken}&userId=${userId}`

}

const checkDoamin = (web)=>{
  const domains =[{url:"https://wcy-nuskin.novalya.com", website:"nuskin"}]
  const testDomains =["dev.novalya.com"]
  const hostname = window.location.hostname;
  const selectedDomain = domains.find(d => d.website === web) 
  if (selectedDomain?.url) {
    return selectedDomain?.url
  }else{
    if(hostname?.includes("localhost") || testDomains?.includes(hostname)){
      return window.location.href
    }
    else{
      return "https://app.novalya.com/"
    }
  }
 

}

export const detectExtension = (callback) => {
  let extMode = "Live"; //getCookie('ext-mode');
  let liveExtensionId = "iemhbpcnoehagepnbflncegkcgpphmpc"
  if (extMode !== "") {
    if (extMode === "Beta") {
      liveExtensionId = "fijhglbfmpngjolfagdnfhmheoojffeg"
    }
  }
  var img;
  img = new Image();
  img.src = `chrome-extension://${liveExtensionId}/assets/image/filter.png`;
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  
  return date.toLocaleDateString('en-US', options);
}

export function getCurrentMonthYear() {
  const date = new Date();

  return {
    month: date.getMonth() + 1, // getMonth() returns 0-11, so add 1
    year: date.getFullYear()
  };
}

export function getSubdomain(url) {
  const { hostname } = new URL(url.startsWith("http") ? url : "https://" + url);
  const parts = hostname.split(".");

  // Special case: localhost subdomains like nuskin.localhost
  if (hostname.endsWith(".localhost") && parts.length > 1) {
    return parts.slice(0, parts.length - 1).join(".");
  }

  // Regular domains (e.g., dev.novalya.com)
  if (parts.length > 2) {
    return parts.slice(0, parts.length - 2).join(".");
  }

  return null;
}
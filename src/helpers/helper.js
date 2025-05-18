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

 export const domains =[{url:"https://wcy-nuskin.novalya.com", website:"nuskin",subdomain:"wcy-nuskin"}]

const checkDoamin = (web)=>{
 const domains =[{url:"https://wcy-nuskin.novalya.com", website:"nuskin", subdomain:"wcy-nuskin"}]
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

export  const getCurrentYear = ()=>{
    let year= new Date()
    year = year.getFullYear()

    return {curr:year, prev:year-1}
  }


export function formatUnixDate(unixTimestamp) {
  // Convert seconds to milliseconds if needed
  if (unixTimestamp.toString().length === 10) {
    unixTimestamp *= 1000;
  }

  const date = new Date(unixTimestamp);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function isExpired(month, year) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-based month

  if (year < currentYear) return true;
  if (year === currentYear && month < currentMonth) return true;
  return false;
}



export  function upgardeHelper(plan,period){
    let result ={
        basic_1:true,
        basic_3:true,
        basic_12:true,
        buissness_1:true,
        buissness_3:true,
        buissness_12:true,
        unlimited_1:true,
        unlimited_3:true,
        unlimited_12:true,
        month_1:true,
        month_3:true,
        month_12:true,
        deafultTF:"quater",
      }
      
if (plan === "Basic" && period === "1_month") {
    result.basic_1=false;
}else if (plan === "Basic" && period === "3_month"){
    result.basic_3=false;
    result.unlimited_1=false;
    result.buissness_1=false;
    result.month_1=false;
    result.deafultTF="year";
   
}
else if (plan === "Basic" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:true,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:true,
        month_1:false,
        month_3:false,
        month_12:true,
        deafultTF:"year",
      }
}

else if (plan === "Business" && period === "1_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:true,
        buissness_12:true,
        unlimited_1:true,
        unlimited_3:true,
        unlimited_12:true,
        month_1:false,
        month_3:true,
        month_12:true,
        deafultTF:"quater"
      }
}

else if (plan === "Business" && period === "3_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:true,
        unlimited_1:false,
        unlimited_3:true,
        unlimited_12:true,
        month_1:false,
        month_3:true,
        month_12:true,
        deafultTF:"year"
      }
}

else if (plan === "Business" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:false,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:true,
        month_1:false,
        month_3:false,
        month_12:true,
        deafultTF:"year"
      }
}

else if (plan === "Unlimited_new" && period === "1_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:false,
        unlimited_1:false,
        unlimited_3:true,
        unlimited_12:true,
        month_1:false,
        month_3:true,
        month_12:true,
        deafultTF:"quater"
      }
}

else if (plan === "Unlimited_new" && period === "3_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:false,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:true,
        month_1:false,
        month_3:false,
        month_12:true,
        deafultTF:"year"
      }
}

else if (plan === "Unlimited_new" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:false,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:false,
        month_1:false,
        month_3:false,
        month_12:false,
        deafultTF:"year"
      }
}

else if (plan === "Starter" && period === "1_month"){
    result ={
        basic_1:true,
        basic_3:true,
        basic_12:true,
        buissness_1:true,
        buissness_3:true,
        buissness_12:true,
        unlimited_1:true,
        unlimited_3:true,
        unlimited_12:true,
        month_1:true,
        month_3:true,
        month_12:true,
        deafultTF:"quater"
      }
}

else if (plan === "Starter" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:true,
        buissness_1:false,
        buissness_3:false,
        buissness_12:true,
        unlimited_1:false,
        unlimited_3:true,
        unlimited_12:true,
        month_1:false,
        month_3:true,
        month_12:true,
        deafultTF:"year"
      }
}

else if (plan === "Pro" && period === "1_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:true,
        buissness_1:false,
        buissness_3:true,
        buissness_12:true,
        unlimited_1:true,
        unlimited_3:true,
        unlimited_12:true,
        month_1:true,
        month_3:true,
        month_12:true,
        deafultTF:"quater"
      }
}
else if (plan === "Pro" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:true,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:true,
        month_1:false,
        month_3:false,
        month_12:true,
        deafultTF:"year"
      }
}
else if (plan === "Unlimited" && period === "1_month"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:true,
        buissness_3:true,
        buissness_12:true,
        unlimited_1:true,
        unlimited_3:true,
        unlimited_12:true,
        month_1:true,
        month_3:true,
        month_12:true,
        deafultTF:"quater"
      }
}
else if (plan === "Unlimited" && period === "1_year"){
    result ={
        basic_1:false,
        basic_3:false,
        basic_12:false,
        buissness_1:false,
        buissness_3:false,
        buissness_12:true,
        unlimited_1:false,
        unlimited_3:false,
        unlimited_12:true,
        month_1:false,
        month_3:false,
        month_12:true,
        deafultTF:"year"
      }
}
return {...result};

}
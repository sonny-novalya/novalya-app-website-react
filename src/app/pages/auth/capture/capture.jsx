import { useEffect, useState } from 'react'
import './capture.css'
import logo from '../../../../assets/img/pricing-logo.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import { signupStore } from '../../../../store/signup/signupStore'
import { Terms } from '../../../../helpers/helperData'
import { domains, getSubdomain } from '../../../../helpers/helper'



const CapturePage = () => {
     const [searchParams] = useSearchParams();
	 const {saveCaptureData}=signupStore()
	 const navigate= useNavigate()
	 const [loading, setLoading] = useState(false);
	 const [geoData,setGeoData] = useState(null)
	
	 const backto = localStorage.getItem("backto")
	  const localPlan = localStorage.getItem("planId")
      let planId = searchParams.get("planId") ? searchParams.get("planId") : localPlan;
	 
	  if (!planId && !localPlan) {
		navigate(backto || "/plans")
	  }
      const coupon_code = searchParams.get("coupon_code");
      let sign_details = localStorage.getItem("sign_details");
      sign_details= JSON.parse(sign_details)
      let names = sign_details && ((sign_details?.firstname || "") + " " + (sign_details?.lastname || ""))
    const [details,setDetails] = useState({fullName: names || "" , email:sign_details?.email || ""})
	const urlArr = ["app.novalya.com","dev.novalya.com"]
 
      
const handleSubmit = () => {
    
if(!details?.fullName?.trim()){
   message.error("Name is required")
      return
}

if(!details?.email?.trim()){
    message.error("Email is required")

      return
}
let names = details?.fullName?.trim()?.split(" ")
let detail = {...details,firstname:names?.[0],lastname:(names?.[1] || "")}
 detail= JSON.stringify(detail)
localStorage.setItem('sign_details',detail);
addContactToBrevo(details.email,names?.[0],names?.[1])



}

const getCountry = async()=>{
	try {
		const res= await (await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=2e685b36ba4a4c5cb3645fc6baa56306')).json()
	setGeoData(res)
	} catch (error) {
		console.error(error)
	}
	
}




useEffect(() => {
if(planId){
    localStorage.setItem('planId',planId)
}
}, [planId])

useEffect(() => {
	getCountry() 
}, [])


 const addContactToBrevo = async (email, firstName, lastName) => {

	setLoading(true)
	const planId=localStorage.getItem('planId')
	const  selectedPlan =  Terms?.find((p)=>p.plan_id === planId)
	const seledtedlang= localStorage.getItem("selectedLocale")
	const subDom = getSubdomain(window.location.href)
	const isReseller = domains?.some((d)=>d.subdomain === subDom)
	
	let utm_data = localStorage.getItem("UTM_DATA")
	utm_data= utm_data ? JSON.parse(utm_data) :{}
    const country =geoData?.country_name;
	const  storageReferralId = localStorage.getItem("referralId") || "NOVALYA"
	const  MAKE_API_URL ="https://hook.eu1.make.com/ngxwvb9yb1tvenyoheei21n65w2tebj9"
	const capturePaylaod =  {
		email: email,
		first_name: firstName || '',
		last_name: lastName || '',
		plan:checkPlan(planId),
		plan_period:checkPeriod(planId),
		sponsor:storageReferralId ||  "NOVALYA" ,
		country:country || "",
		plan_id:planId,
		language:seledtedlang,
		reseller: isReseller ? subDom : "Novalya",
		plan_amount:selectedPlan?.amount_1,
		currency:selectedPlan?.currency_code || "EUR",
		utm_data:utm_data,
		plan_status_update_date:new Date().toISOString().split("T")[0]
	}

	try {
		let res = await saveCaptureData(capturePaylaod)
		console.log(res)

			

			if(res.status !== 200){
				setLoading(false)
                return;
			}
			
	
	
	
		  axios.post(
			MAKE_API_URL,
			 {
				  EMAIL: email,
				  FIRSTNAME: firstName || '',
				  LASTNAME: lastName || '',
				  PLAN_NAME:checkPlan(planId),
				  PLAN_PERIOD:checkPeriod(planId),
				  LANGUAGE:seledtedlang || "en-US",
				  SPONSOR_CODE:storageReferralId || "NOVALYA",
				  COUNTRY:country || ""
			  },
			);
	
	if (coupon_code) {
		navigate(`/signup?coupon_code=${coupon_code}`)
	}else{
		navigate(`/signup`)
	}
    setLoading(false)
		
	 
	} catch (error) {
	  console.log(error);
	  
	}


  };

   

	const checkPeriod = (data)=>{
		let period=""
		if(data.includes("Monthly")){
			period="1 month"
		}else if(data.includes("3-months")){
            period="3 months"
		}else{
			period="1 year"
		}
     return period
	}

	const checkPlan = (data)=>{
		let plan=""
		if(data.includes("Basic")){
			plan="Basic"
		}else if(data.includes("Unlimited")){
            plan="Unlimited"
		}else{
			plan="Business"
		}
     return plan
	}
  return (
    <div className='SignUpStepOne'>
   
<div class="fullContainer">
		<div class="fullContainerIn">
			<img src={logo} alt='logo'/>
			<div class="fullContainerBox">
				<span> Start Your 14-Day <br/> Free Trial Now! </span>
		
				<form class="fullContainerForm"  onSubmit={(e)=>e.preventDefault()}>
					<div class="full-form-group">
						<input id="form_name1" class="full-form-control" type="text" value={details?.fullName} required onChange={(e)=>setDetails({...details,fullName:e.target.value})}/>
						<label for="form_name1">Full Name</label>
					</div>
					<div class="full-form-group">
						<input id="form_name2" class="full-form-control" type="text" placeholder="" value={details?.email} required onChange={(e)=>setDetails({...details,email:e.target.value})}/>
						<label for="form_name2">Email Address</label>
					</div>
					<div class="full-form-group">
						<button class="full-form-btn" onClick={()=>handleSubmit()}>
						{
							loading? <span>Loading...</span> : 
							<span style={{display:"flex",alignItems:"center",gap:"5px"}}>
							<span>
                            Continue
                            </span>
							<span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.71743 11.7063L11.7174 6.70628C11.8085 6.61118 11.8798 6.49903 11.9274 6.37628C12.0274 6.13282 12.0274 5.85974 11.9274 5.61628C11.8798 5.49353 11.8085 5.38138 11.7174 5.28628L6.71743 0.286279C6.62419 0.19304 6.5135 0.11908 6.39168 0.0686195C6.26986 0.0181592 6.13929 -0.00781276 6.00743 -0.00781276C5.74113 -0.00781277 5.48573 0.0979752 5.29743 0.286279C5.10912 0.474583 5.00334 0.729977 5.00334 0.996279C5.00334 1.26258 5.10912 1.51798 5.29743 1.70628L8.59743 4.99628L1.00743 4.99628C0.742211 4.99628 0.487857 5.10164 0.30032 5.28917C0.112784 5.47671 0.00742792 5.73106 0.00742791 5.99628C0.0074279 6.2615 0.112784 6.51585 0.30032 6.70339C0.487857 6.89092 0.742211 6.99628 1.00743 6.99628L8.59743 6.99628L5.29743 10.2863C5.2037 10.3792 5.1293 10.4898 5.07854 10.6117C5.02777 10.7336 5.00163 10.8643 5.00163 10.9963C5.00163 11.1283 5.02777 11.259 5.07854 11.3809C5.1293 11.5027 5.2037 11.6133 5.29743 11.7063C5.39039 11.8 5.50099 11.8744 5.62285 11.9252C5.74471 11.9759 5.87542 12.0021 6.00743 12.0021C6.13944 12.0021 6.27014 11.9759 6.392 11.9252C6.51386 11.8744 6.62446 11.8 6.71743 11.7063Z" fill="#fff"/>
							</svg>
                            </span>
							</span>
						}
					
							
						</button>
					</div>
					<div class="full-form-text">
						<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M13 7V5C13 2.2 10.8 0 8 0C5.2 0 3 2.2 3 5V7C1.3 7 0 8.3 0 10V17C0 18.7 1.3 20 3 20H13C14.7 20 16 18.7 16 17V10C16 8.3 14.7 7 13 7ZM5 5C5 3.3 6.3 2 8 2C9.7 2 11 3.3 11 5V7H5V5Z" fill="black"/>
						</svg>
						By providing us with your information you are consenting to the collection and use of your information in accordance with our <a class="full-form-anchor" target="_blank" href='https://novalya.com/en/terms-and-conditions/'>Terms and Conditions.</a>
					</div>
				</form>
			</div>
		</div>
	</div>

    </div>
  )
}

export default CapturePage
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../../assets/img/pricing-logo.png";
import visaCard from "../../../../assets/img/visa-card.png";
import masterCard from "../../../../assets/img/master-card.png";
import amexCard from "../../../../assets/img/amex-card.png";
import eye1 from "../../../../assets/img/eye-icon.svg"
import eye2 from "../../../../assets/img/eye-icon2.svg"
import "./signup.css";
import SignCheckList from "../../../components/signup/signCheckList";
import SignPayDueBox from "../../../components/signup/signPayDueBox";
import { message, Select } from "antd";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { countries } from "../../../../helpers/helperData";
import TnCbox from "../../../components/signup/TnCbox";
import { signupStore } from "../../../../store/signup/signupStore";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: null,
  firstname: "",
  lastname: "",
  email: "",
  confirm_email: "",
  mobile: "+33",
  company: "",
  address: "",
  zipCode: "",
  city: "",
  country: "FR",
  language: "",
  password: "",
  confirmpassword: "",
  domain: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [reffralData, setReffralData] = useState("NOVALYA");
  const addressRef = useRef(null);
  const {getUserByRef,registerUser}=signupStore()
  const [planDetails, setPlanDetails] = useState(null);
  const [showPass,setShowPass]=useState({confPass:false,pass:false})
  const [planPeriodStr,setPlanPeriodStr]=useState("")
  const searchParams = new URLSearchParams(window.location.search);
  const checkPlanSelect = localStorage.getItem("planId");
  const backTo = localStorage.getItem("backto");
  const navigate = useNavigate()

  if (!checkPlanSelect) {
    navigate(backTo || "/plans")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else {
      newErrors.firstname = "";
    }
    if (!form.lastname.trim()) {
      newErrors.firstname = "First name is required";
    } else {
      newErrors.firstname = "";
    }
    // if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
    } else {
      newErrors.mobile = "";
    }

    if (form.email !== form.confirm_email)
      newErrors.confirm_email = "Emails do not match";

    if (!form.confirm_email)
      newErrors.confirm_email = "Confirm Email is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.email) newErrors.email = "Email is required";

    if (!!form.email && !!form.email.includes("@")) {
      newErrors.email = "";
    }

    if (!!form.confirm_email && !(form.email !== form.confirm_email)) {
      newErrors.confirm_email = "";
    }

    if (form.password !== form.confirmpassword)
      newErrors.confirmpassword = "Passwords do not match";
    if (form?.password?.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form?.password) newErrors.password = "Password is required";
    if (!form.confirmpassword)
      newErrors.confirmpassword = "Confirm Password is required";

    if (!form.address?.trim()) {
      newErrors.address = "Address is required";
    } else {
      newErrors.address = "";
    }
    if (!form.city?.trim()) {
      newErrors.city = "City is required";
    } else {
      newErrors.city = "";
    }
    if (!form.zipCode?.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else {
      newErrors.zipCode = "";
    }
    if (!form.country?.trim()) {
      newErrors.country = "Country is required";
    } else {
      newErrors.country = "";
    }

    if (!isChecked) {
      newErrors.checked = "Required";
    } else {
      newErrors.checked = "";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async() => {
    if (validate()) {
      message.error("please fill all required fields");
      return;
    }
    const domainParts = window.location.hostname.split(".");
    const domain = domainParts.length > 1 ? domainParts[0] : "";
    const searchParams = new URLSearchParams(window.location.search);
    const coupon_code = searchParams?.get("coupon_code") || "empty";

    let params = {
      sponsorid: reffralData || "NOVALYA",
      username: form.username,
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      mobile: form.mobile,
      address: form.address,
      password: form.password,
      country: form.country,
      language: localStorage.getItem("selectedLocale") || "en-US" ,
      company: form.company,
      zipCode: form.zipCode,
      city: form.city,
      item_price_id: checkPlanSelect,
      coupon_code: coupon_code || "empty",
      domain,
    };

  const res = await registerUser(params)
  if (res.status === 200) {
    window.location.replace(res?.data?.redirect_url);
  }
  };

  const loadInitialCountry = ()=>{
    fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          if (data.country_code) {
            const newValue = countries.find(
              (country) => country.code === data.country_code
            );
           setForm({...form,mobile:newValue?.phone,country:newValue?.code})
          }
        })
        .catch((error) => {
          console.error("Error fetching IP address:", error);
        });
  }

  const contOptions = countries.map((data) => {
    return {
      value:data.code,
      label: (
        <div style={{display:"flex",alignItems:'center',gap:"20px"}}>
        <div>
        <img
            loading="lazy"
            style={{ width: "32px",height:"24px",borderRadius:"4px"}}
            src={`https://flagcdn.com/w20/${data.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${data.code.toLowerCase()}.png 2x`}
            alt=""
          />
        </div>
        <div>
        {data.label} ({data.code})
        </div>
        </div>
      ),
    };
  });

  useEffect(()=>{
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCfYReauVWsdFbjZntfrcPOn4V7VB27WN0&libraries=places`;
    script.async = true;

    script.onload = () => {
      if (addressRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          addressRef.current,
          {
            types: ["geocode"], // or ["address"]
           
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const address = place.formatted_address || addressRef.current.value;
          const addressComponents = place.address_components;
          const city = addressComponents.find((component) =>
            component.types.includes("locality")
          );
          const zipCode = addressComponents.find((component) =>
            component.types.includes("postal_code")
          );
          const countrie = addressComponents.find((component) =>
            component.types.includes("country")
          );
          const selectedCountry = countries.find(
            (country) =>
              country.code.toLowerCase() === countrie?.short_name.toLowerCase()
          );
          setForm({...form,address:address,city:(city?.long_name || ""),zipCode:(zipCode?.long_name || ""),country:selectedCountry?.label}); // handle via props
        });
      }
    };

    document.body.appendChild(script);
  },[])

  useEffect(() => {
    const storageReferralId = localStorage.getItem("referralId");

    if (storageReferralId) {
      fetchSingleUserdata(storageReferralId)
    }else{
      setReffralData("NOVALYA")
    }

    fetchPlanDetail()
    loadInitialCountry()
   
  },[])

  const fetchSingleUserdata = async(data)=>{
    const  res =await getUserByRef(data)
   if (res.status === 200) {
    setReffralData(res?.data?.data?.randomcode) 
   }
  }
  const fetchPlanDetail =()=>{
   
    let plans = localStorage.getItem("plans");
    plans = JSON.parse(plans);
    let selectedPlan = plans?.find((plan) => plan.plan_id === checkPlanSelect);
    periodSelector(checkPlanSelect)

    setPlanDetails(selectedPlan);
  }
  const periodSelector = (planid) => {
    const planidArrb = planid?.split("-")?.reverse();
    let result;

    if (planidArrb?.[0] === "months") {
      result = " quarterly";
    } else if (planidArrb?.[0] === "Monthly") {
      result = " monthly";
    } else {
      result = " yearly";
    }
    setPlanPeriodStr(result);
  };



  useEffect(()=>{console.log(form)},[form])
  return (
    <div className="signup ">
      <div className="bg-[#f6f6f6]">
        <div className="py-[10px]">
          <div className="w-full max-w-[1275px] mx-auto px-[20px]">
            <img className="max-w-[115px]" src={logo} />
          </div>
        </div>
        <div className="bg-[#2C73FF] py-[15px] text-white">
          <div className="w-full max-w-[1275px] mx-auto px-[20px]">
            <span className="text-white text-[16px] flex justify-center items-start gap-[12px]">
              <span className="whitespace-nowrap text-[18px] font-bold -translate-y-[3px] inline-block">
                Novalya :
              </span>{" "}
              Streamline Your Lead Generation Process with Social Media
              Automation
            </span>
          </div>
        </div>
        <div className="w-full max-w-[1275px] mx-auto px-[20px]">
          <div className="grid grid-cols-1 lg:[grid-template-columns:1fr_1.4fr] gap-y-[36px] gap-x-[65px] pt-[35px] pb-[50px]">
            <div className="signup-wraper-left">
              <div className="flex items-center justify-between mb-[35px] border-b border-[#D9D9DA] pt-[10px] pb-[16px] cursor-pointer">
                <span
                  className="flex items-center gap-[6px] text-[#2C73FF] underline font-medium"
                  onClick={()=>navigate(backTo || "/plans")}
                >
                  <svg
                    className="w-[20px] h-[20px]"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="13"
                      cy="13"
                      r="12.5"
                      fill="#2C73FF"
                      stroke="#2C73FF"
                    ></circle>
                    <path
                      d="M14.5293 9.17627L10.7058 12.9998L14.5293 16.8233"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>{" "}
                  Back to Plans
                </span>
                <span className="font-[500]">
                  <span>Sponsored By:</span> {reffralData}
                </span>
              </div>
              <span className="text-[#170f49] block leading-[1.25] mb-[36px] text-[22px] font-semibold">
                Join The Entrepreneurs Who Use Novalya To Easily Get Their Next
                Customers on Social Media
              </span>
              <span className="text-[20px] font-medium text-[#170f49] block leading-[1.25]">
                100% NO-RISK FREE TRIAL
              </span>
              <SignCheckList />
              <SignPayDueBox planDetails={planDetails} planPeriodStr={planPeriodStr}/>
              <div className="flex flex-col mb-[36px]">
                <span className="flex items-center gap-[12px] text-[#170f49]  leading-[1.25] text-[22px] font-semibold">
                  <svg
                    width="25"
                    height="29"
                    viewBox="0 0 25 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4738 18.9852C18.627 18.9852 17.9406 18.2988 17.9406 17.452V8.52379C17.9406 5.51468 15.4924 3.06649 12.4833 3.06649C9.47416 3.06649 7.02597 5.51462 7.02597 8.52379V13.7166C7.02597 14.5634 6.33951 15.2499 5.49272 15.2499C4.64593 15.2499 3.95947 14.5634 3.95947 13.7166V8.52379C3.95947 3.82373 7.7832 0 12.4833 0C17.1833 0 21.0071 3.82373 21.0071 8.52379V17.452C21.0071 18.2988 20.3206 18.9852 19.4738 18.9852Z"
                      fill="#B1B4B5"
                    />
                    <path
                      d="M21.812 28.2701H3.15411C1.41215 28.2701 0 26.8579 0 25.116V14.3289C0 12.587 1.41215 11.1748 3.15411 11.1748H21.812C23.554 11.1748 24.9662 12.587 24.9662 14.3289V25.1159C24.9662 26.8579 23.554 28.2701 21.812 28.2701Z"
                      fill="#FFB636"
                    />
                    <path
                      d="M2.73741 25.7292H2.5794C2.08169 25.7292 1.67822 25.3257 1.67822 24.828V14.6189C1.67822 14.1212 2.08169 13.7178 2.5794 13.7178H2.73741C3.23513 13.7178 3.63859 14.1212 3.63859 14.6189V24.828C3.63859 25.3257 3.23513 25.7292 2.73741 25.7292Z"
                      fill="#FFD469"
                    />
                  </svg>
                  Payment Secured
                </span>
                <div className="flex gap-[20px] items-center">
                  <div className="flex items-center justify-center bg-white rounded-[6px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] w-[125px] h-[76px] mt-[30px] mb-[36px]">
                    <img
                      src={visaCard}
                      className="h-[55px] w-[95px] object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-[6px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] w-[125px] h-[76px] mt-[30px] mb-[36px]">
                    <img
                      src={masterCard}
                      className="h-[55px] w-[95px] object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-[6px] shadow-[0_5px_10px_rgba(0,0,0,0.1)] w-[125px] h-[76px] mt-[30px] mb-[36px]">
                    <img
                      src={amexCard}
                      className="h-[55px] w-[95px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_5px_30px_rgba(0,0,0,0.07)] max-w-4xl mx-auto">
              <span className="block text-center text-[23px] font-bold text-[#170F49] leading-[1.25] pb-4">
                Create Your Account And
                <br />
                Get Started In Less Than 60 Seconds
              </span>

              <div className="space-y-4">
                <label className="block w-full text-lg font-medium uppercase mt-3">
                  Account Information
                </label>

                <div className="flex flex-wrap gap-5">
                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        value={form?.firstname}
                        className="nw_form_input w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        First Name
                      </label>
                    </div>
                    {errors.firstname && (
                      <span className="sign_error">{errors.firstname}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                        value={form?.lastname}
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Last Name
                      </label>
                    </div>
                    {errors.lastname && (
                      <span className="sign_error">{errors.lastname}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={form?.email}

                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Email
                      </label>
                    </div>
                    {errors.email && (
                      <span className="sign_error">{errors.email}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="confirm_email"
                        type="text"
                        placeholder="Confirm Email"
                        value={form?.confirm_email}
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Confirm Email
                      </label>
                    </div>
                    {errors.confirm_email && (
                      <span className="sign_error">{errors.confirm_email}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr_42px] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="password"
                        type={showPass.pass?"text":"password"}
                        value={form?.password}
                        placeholder="Password"
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Password
                      </label>
                      <span className="flex items-center justify-center cursor-pointer">
                        <img
                          src={showPass.pass? eye1:eye2}
                          onClick={()=>setShowPass({...showPass,pass:!showPass.pass})}
                          alt="toggle visibility"
                          className="w-5 h-5"
                        />
                      </span>
                    </div>
                    {errors.password && (
                      <span className="sign_error">{errors.password}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[hsl(220,5%,88%)] rounded-md grid grid-cols-[1fr_42px] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="confirmpassword"
                        type={showPass.confPass?"text":"password"}
                        value={form?.confirmpassword}
                        placeholder="Confirm Password"
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Confirm Password
                      </label>
                      <span className="flex items-center justify-center cursor-pointer">
                        <img
                          src={showPass.confPass? eye1:eye2}
                          onClick={()=>setShowPass({...showPass,confPass:!showPass.confPass})}
                          alt="toggle visibility"
                          className="w-5 h-5"
                        />
                      </span>
                    </div>
                    {errors.confirmpassword && (
                      <span className="sign_error">
                        {errors.confirmpassword}
                      </span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={form?.mobile}
                      onChange={(val) => setForm({ ...form, mobile: val })}
                    />
                    {/* <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        type="text"
                        placeholder="+91-"
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Phone Number
                      </label>
                    </div> */}
                    {errors.mobile && (
                      <span className="sign_error">{errors.mobile}</span>
                    )}
                  </div>

                  <label className="block w-full text-lg font-medium uppercase mt-3">
                    Billing Confirmation
                  </label>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="company"
                        type="text"
                        placeholder="Company Name"
                        value={form?.company}
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Company Name
                      </label>
                    </div>
                    {errors.company && (
                      <span className="sign_error">{errors.company}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                      ref={addressRef}
                        onChange={(e) => handleChange(e)}
                        name="address"
                        type="text"
                        placeholder="Address"
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Address
                      </label>
                    </div>
                    {errors.address && (
                      <span className="sign_error">{errors.address}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="city"
                        type="text"
                        placeholder="City"
                        value={form?.city || ""}
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        City
                      </label>
                    </div>
                    {errors.city && (
                      <span className="sign_error">{errors.city}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <div className="relative bg-[#FAFAFA] border border-[#E0E1E3] rounded-md grid grid-cols-[1fr] w-full min-h-[46px]">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="zipCode"
                        type="text"
                        placeholder="Zip Or Postal code"
                        className="nw_form_input  w-full bg-transparent border-none text-[#86829F] text-base font-normal px-4 py-2"
                        value={form?.zipCode || ""}
                      />
                      <label className="absolute top-[11px] left-[15px] text-base font-medium text-[#86829F] pointer-events-none transition-all">
                        Zip Or Postal code
                      </label>
                    </div>
                    {errors.zipCode && (
                      <span className="sign_error">{errors.zipCode}</span>
                    )}
                  </div>

                  <div className="w-full md:w-[calc(50%-10px)]">
                    <Select
                      allowClear
                      options={contOptions}
                      style={{ width: "100%",height:"45px" }}
                      placeholder="Country"
                      onChange={(val)=> setForm({...form,country:val})}
                     value={form?.country}
                    />
               
                    {errors.country && (
                      <span className="sign_error">{errors.country}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 pr-4 mt-2]">
                  <input
                    type="checkbox"
                    className="scale-[1.15] translate-y-[1px] mt-1"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  {errors.checked && (
                    <span className="sign_error">{errors.checked}</span>
                  )}
                <TnCbox planDetails={planDetails} planPeriodStr={planPeriodStr}/>
                </div>

                <div className="!mt-6 w-full">
                  <button
                    onClick={() => handleSubmit()}
                    className="bg-[#2c73ff] cursor-pointer  outline-[3px] outline-[#2c73ff4d] w-full text-white py-3 rounded-xl font-[500] text-[16px] transition duration-200"
                  >
                    START MY FREE TRIAL
                  </button>
                </div>
              </div>

              <span className="block mt-[25px] text-center text-[#475259] text-[15px]">
                Already have an account?{" "}
                <a href="#!" className="text-[#2c73ff] font-normal underline">
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="text-center bg-[#E5E5E5] m-0 p-4 border-t border-[#CFCFCF]">
          <span>
            <pre className="m-0 text-[16px] font-medium font-['DM_Sans'] text-[rgba(0,0,0,0.7)]">
              Copyright | Novalya © 2024-2025
            </pre>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
 
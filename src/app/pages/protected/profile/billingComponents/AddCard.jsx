import React, { useEffect, useRef, useState } from "react";
import CardIcon from "../../../../../assets/img/card-info-icon.svg";
import { message, Spin } from "antd";
import useLoginUserDataStore from "../../../../../store/loginuser/loginuserdata";
import { cardTypePatterns, months } from "../../../../../helpers/helperData";
import visaCard from "../../../../../assets/img/visa-card.png"
import masterCard from "../../../../../assets/img/master-card.png"
import amexCard from "../../../../../assets/img/amex-card.png"


const AddCard = ({ setIsPop }) => {
  const [card, setCard] = useState({
    card_no: "",
    cvv: "",
    expiry_year: "",
    expiry_month: "",
    card_holder_name:""
  });
  const [formErr,setFormErr]=useState({})
  const [cardType,setCardType] =useState('')
  const [isLoading,setIsLoading] =useState(false)
  const boxRef = useRef(null);
  const {addCard,getCardList}=useLoginUserDataStore()
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setIsPop(false); // Call your function here
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  
  const cardImages = (data)=>{
    if (data === "visa") {
        return visaCard
    }else if(data === "mastercard"){
         return masterCard
    }else if (data === "americanexpress") {
        return amexCard
    }else{
        return null
    }
  }

  function getCardType(cardNumber) {
    const cleanNumber = cardNumber.replace(/ /g, "");

    for (const [type, pattern] of Object.entries(cardTypePatterns)) {
      if (pattern.test(cleanNumber)) {
        setCardType(type)
        return ;
      }
    }

     setCardType("unknown");
     
  }

  const onChange = (e) => {
    const { name, value } = e.target;
   
    if (name === "card_no") {
        getCardType(value)
    }
    setCard((prev)=>({...prev,[name]:value}))
  };

  const handleSubmit = async()=>{
    setIsLoading(true)

    if (validateCardForm(card)) {
        message.error("fill required fields!!")
      return
    }
    let PayLoad = {
        ...card, 
        card_no:card?.card_no?.replace(/ /g, '')
    }

          const res =await addCard(PayLoad)
      if (res.status === 200) {
        message.success("Card has been Added successfully")
        getCardList()
          setIsPop(false);
      }
       setIsLoading(false)
  }


  function formatCardNumber(input) {
  return input.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}


  function validateCardForm(form) {
  const errors = {};

  const cardNumber = form.card_no?.replace(/ /g, '');

  // Validate card number length
  if (!cardNumber) {
    errors.card_no = "Card number is required";
  } else {
    if (cardNumber.length < 12) {
      errors.card_no = "Card number must be 12 to 16 digits";
    }
  }

  // Validate required fields
  if (!form.cvv) errors.cvv = "CVV is required";
  if (!form.expiry_year) errors.expiry_year = "Expiry year is required";
  if (!form.expiry_month) errors.expiry_month = "Expiry month is required";
  if (!form.card_holder_name) errors.card_holder_name = "Card holder name is required";

  setFormErr(errors)
   return Object.keys(errors).length !== 0;;
}
  return (
    <div class="flex items-center justify-center bg-black/30 bg-opacity-30 h-screen absolute left-0 top-0 w-full ">
      <div
        ref={boxRef}
        class="bg-[#FAFAFA] p-6 rounded-[20px] max-w-[675px] mx-auto w-full relative max-h-[90vh] overflow-auto"
      >
        <div class="w-[54px] h-[54px] p-2.5 flex items-center justify-center bg-[rgb(0_135_255_/_10%)] rounded-full mx-auto">
          <img src={CardIcon} />
        </div>
        <h3 class="text-center text-[20px] text-[#030102] font-medium mt-1 mb-5">
          Card info
        </h3>
        <div class="border border-[#DADADA] bg-white rounded-[16px] px-9 py-7 max-w-[470px] mx-auto flex flex-col gap-[20px]">
          <div class="grid grid-cols-[3fr_1fr] gap-5">
            <div class="relative">
              <label class="text-[16px] text-[#030102] block mb-[8px] leading-[1]">
                Card Number
              </label>
              <input
                onChange={(e) => onChange(e)}
                value={formatCardNumber(card?.card_no)}
                maxLength={19}
                name="card_no"
                class="text-[rgba(0,4,7,0.5)] px-5 py-3 w-full bg-[#F5F5F5] border border-[#F0F0F0] rounded-[8px] text-[14px] focus:outline-none"
                type="text"
              />
              <span class={`absolute right-[8px] ${formErr?.card_no || formErr?.cvv? "bottom-[33px]": "bottom-[9px]"}`}>
             { cardImages(cardType)? <img style={{width:"28px",marginBottom:"9px"}} src={cardImages(cardType)}/> : <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.3125 5.25H5.6875C3.99613 5.25 2.625 6.62113 2.625 8.3125V19.6875C2.625 21.3789 3.99613 22.75 5.6875 22.75H22.3125C24.0039 22.75 25.375 21.3789 25.375 19.6875V8.3125C25.375 6.62113 24.0039 5.25 22.3125 5.25Z"
                    stroke="#8C8C8C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.625 10.5H25.375M7 16.4062H9.625V17.5H7V16.4062Z"
                    stroke="#8C8C8C"
                    stroke-width="1.875"
                    stroke-linejoin="round"
                  />
                </svg>}
              </span>
           {formErr?.card_no && <label className="text-red-500 text-[12px]">{formErr?.card_no}</label>}

            </div>
            <div>
              <label class="text-[16px] text-[#030102] block mb-[8px] leading-[1]">
                CVV
              </label>
              <input
               onChange={(e) => onChange(e)}
                name="cvv"
                value={card.cvv}
                class="text-[rgba(0,4,7,0.5)] px-5 py-3 w-full bg-[#F5F5F5] border border-[#F0F0F0] rounded-[8px] text-[14px] focus:outline-none"
                type="text"
                placeholder="CVV"
                maxLength={4}
                
              />
           {formErr?.cvv && <label className="text-red-500 text-[12px]">{formErr?.cvv}</label>}

            </div>


          </div>
          <div class="grid grid-cols-2 gap-5">
            <div>
              <label class="text-[16px] text-[#030102] block mb-[8px] leading-[1]">
                Expiry Month
              </label>
              <select value={card.expiry_month} onChange={(e)=>onChange(e)} name="expiry_month" class="text-[rgba(0,4,7,0.5)] px-5 py-3 w-full bg-[#F5F5F5] border border-[#F0F0F0] rounded-[8px] text-[14px] focus:outline-none">
               <option value="">MM</option>
              {months.map((month) => (
                               <option key={month.value} value={month.value}>{month.label}</option>
                             ))}
              </select>

           {formErr?.expiry_month && <label className="text-red-500 text-[12px]">{formErr?.expiry_month}</label>}

            </div>
            <div>
              <label>Expiry Year</label>
              <select  value={card.expiry_year} onChange={(e)=>onChange(e)} name="expiry_year" class="text-[rgba(0,4,7,0.5)] px-5 py-3 w-full bg-[#F5F5F5] border border-[#F0F0F0] rounded-[8px] text-[14px] focus:outline-none">
                <option>YY</option>
                <option value={2025}>2025</option>
                <option value={2026} >2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
              </select>
           {formErr?.expiry_year && <label className="text-red-500 text-[12px]">{formErr?.expiry_year}</label>}

            </div>
          </div>
          <div>
            <label class="text-[16px] text-[#030102] block mb-[8px] leading-[1]">
              Name of the card Holder
            </label>
            <input
              class="text-[rgba(0,4,7,0.5)] px-5 py-3 w-full bg-[#F5F5F5] border border-[#F0F0F0] rounded-[8px] text-[14px] focus:outline-none"
              type="text"
              placeholder="Your name"
              onChange={(e)=>onChange(e)}
              name="card_holder_name"
              value={card.card_holder_name}
            />
           {formErr?.card_holder_name && <label className="text-red-500 text-[12px]">{formErr?.card_holder_name}</label>}

          </div>
          <button onClick={()=>handleSubmit()} class="bg-[#0087FF] w-spinner cursor-pointer hover:bg-[#0081F5] text-white w-full h-[48px] rounded-[8px] flex items-center justify-center">
          {isLoading ? <Spin size="small"/>:"  Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;

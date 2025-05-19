
import { useState } from 'react';
import AddOns from './billingComponents/AddOns';
import PaymentMethods from './billingComponents/PaymentMethods';
import SubsDetails from './billingComponents/SubsDetails';
import AddCard from './billingComponents/AddCard';

const BillingDetails = ({ userMail }) => {
  const [isPop,setIsPop]=useState(false)
  return (
    <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
      <p className="text-gray-600 text-[16px] mb-4">
        <span className="font-semibold">Email :</span> {userMail}
      </p>

      <div className='p-6 rounded border border-[#DADADA] flex flex-col gap-4'>
        <SubsDetails/>
        <AddOns />
        <PaymentMethods setIsPop={setIsPop}/>
        {
         isPop&& <AddCard setIsPop={setIsPop}/>
        }
      </div>
    </div>
  );
}

export default BillingDetails

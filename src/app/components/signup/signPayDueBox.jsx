import React from "react";

const SignPayDueBox = ({planDetails,planPeriodStr,isGoPlan}) => {
  const checkCurr = planDetails?.currency_code === "USD"?"$":"€"
 
  return (
    <>
      {
        isGoPlan.LTC?
        <>
        <div class="bg-[#2c73ff] rounded-[4px] text-white mb-[50px] p-[24px_30px_30px]">
        <span class="text-[#fffffff2] text-[18px] font-medium">Plan</span>
        <div class="flex flex-wrap gap-[12px] justify-between items-center my-[16px] mb-[24px]">
          <span class="text-[24px] font-bold">{planDetails?.limits === "Unlimited_new"?"Unlimited":planDetails?.limits}</span>
          <span class="text-[24px] font-bold">
            {checkCurr}{planDetails?.dueToday || 0} <span class="text-[18px] font-normal">À rendre aujourd'hui</span>
          </span>
        </div>
        <span class="text-[16px] opacity-90">
        0€ pour les {isGoPlan.basic? 2:12} premiers mois, puis {checkCurr}{planDetails?.amount_1} {isGoPlan.basic? "Mensuel":"Annuel" } à la reconduction
           {planPeriodStr}
        </span>
      </div>
        </>:
        <>
        <div class="bg-[#2c73ff] rounded-[4px] text-white mb-[50px] p-[24px_30px_30px]">
        <span class="text-[#fffffff2] text-[18px] font-medium">Plan</span>
        <div class="flex flex-wrap gap-[12px] justify-between items-center my-[16px] mb-[24px]">
          <span class="text-[24px] font-bold">{planDetails?.limits === "Unlimited_new"?"Unlimited":planDetails?.limits}</span>
          <span class="text-[24px] font-bold">
            {checkCurr}{planDetails?.dueToday || 0} <span class="text-[18px] font-normal">Due Today</span>
          </span>
        </div>
        <span class="text-[16px] opacity-90">
          {checkCurr}{planDetails?.amount_1} {planPeriodStr} after your free trial
        </span>
      </div>
        </>


      }
    </>
  );
};

export default SignPayDueBox;

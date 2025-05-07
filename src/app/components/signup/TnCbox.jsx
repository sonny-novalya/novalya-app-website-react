import React from "react";

const TnCbox = ({planDetails,planPeriodStr}) => {
  const checkCurr = planDetails?.currency_code === "USD"?"$":"€"
  return (
    <>
      <span className="text-[#475259] font-light text-sm">
        I agree to a 14-day free trial starting today, followed by a
        subscription of {checkCurr}{planDetails?.amount_1} {planPeriodStr}. I understand that I can cancel through
        the dashboard or by email
        <a href="mailto:support@novalya.com" className="text-[#2c73ff] underline italic font-medium">
          (support@novalya.com)
        </a>
        . I have read and agree to the
        <a href="https://novalya.com/en/terms-and-conditions/" target="_blank" rel="noopener noreferrer" className="text-[#2c73ff] underline italic font-medium">
          Terms and Conditions
        </a>
        .
      </span>
    </>
  );
};

export default TnCbox;

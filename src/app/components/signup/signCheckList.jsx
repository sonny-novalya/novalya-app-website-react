import React from "react";
import signCheck from "../../../assets/img/sign-check.svg";

const SignCheckList = () => {
  return (
    <>
      <ul class="flex flex-col gap-[16px] my-[25px] mb-[50px] p-0">
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Get access to all features
        </li>
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Pay Nothing for the first 14-days
        </li>
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Cancel anytime within 1 click
        </li>
      </ul>
    </>
  );
};

export default SignCheckList;

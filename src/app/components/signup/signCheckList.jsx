import React from "react";
import signCheck from "../../../assets/img/sign-check.svg";

const SignCheckList = ({isGoPlan}) => {
  return (
    <>
{
  isGoPlan.LTC?
  <>
  <span className="text-[20px] font-medium text-[#170f49] block leading-[1.25]">
  OBTENEZ 2 MOIS GRATUITS
      </span>
      <ul class="flex flex-col gap-[16px] my-[25px] mb-[50px] p-0">
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Accédez au nouveau cours de formation exclusif (valeur 897€)
        </li>
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} />Ne payez rien pendant les {isGoPlan.basic? 2: 12} prochains mois (valeur {isGoPlan.basic? 194: 3564} €)
        </li>
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Accédez à toutes les fonctionnalités
        </li>
        <li class="flex items-center text-[#271563] text-[16px] gap-[14px]">
          <img src={signCheck} /> Profitez d'un appel Zoom de démarrage personnalisé (valeur 60€)
        </li>
      </ul>
    </>:<>
    <span className="text-[20px] font-medium text-[#170f49] block leading-[1.25]">
        100% NO-RISK FREE TRIAL
      </span>
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

}
    </>



  );
};

export default SignCheckList;

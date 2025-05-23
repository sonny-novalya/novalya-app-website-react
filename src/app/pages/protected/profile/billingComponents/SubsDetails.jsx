import proIcon from "../../../../../assets/img/pro-billing-icon.png";
import flagIcon from "../../../../../assets/img/flag-billing-icon.png";
import { WhiteTrophyIcon } from "../../../common/icons/icons";
import useLoginUserDataStore from "../../../../../store/loginuser/loginuserdata";
import { findPlan, findPlanCurr, findPlanPeriod, getRemainingDays } from "../../../../../helpers/helper";
import { useNavigate } from "react-router-dom";



const SubsDetails = () => {
  const { loginUserData } = useLoginUserDataStore();
  const subscriptionInfo = loginUserData?.subscriptionInfo || [];
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <h2 className="text-[20px] font-medium text-[#000000BF]">Subscription Details</h2>

      {subscriptionInfo.map((plan, index) => {
        const planName = findPlan(plan?.item_price_id)
        let  isAff = planName ?false : true

        return (
          <div
            key={plan?.item_price_id || index}
            className="grid grid-cols-3 items-center border border-[#0087FF33] rounded-md p-6 shadow-sm bg-white h-24"
          >
            {/* Left */}
            <div className="flex gap-3 items-center">
              <img
                src={isAff ? proIcon:flagIcon}
                alt="plan icon"
                className="w-12 h-12 border border-[#0087FF33] p-1 rounded"
              />
              <h3 className="text-[20px] font-medium">{planName || "Affiliate Pro" }</h3>
            </div>

            {/* Middle */}
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-1 items-center">
                <div className="text-4xl font-semibold">{findPlanCurr(plan?.item_price_id)}{plan?.unit_price/100 || 0}</div>
                <div className="text-sm">{findPlanPeriod(plan?.item_price_id)}</div>
              </div>
              <div className="text-sm">
                Renew in <span className="font-bold">{getRemainingDays(plan?.next_billing_at)}</span> days
              </div>
            </div>

            {/* Right */}
            <div className="ml-auto">
              {!isAff&& (
                <button
                  className="bg-gradient-to-b cursor-pointer from-[#005199] to-[#0087FF] rounded-md px-4 py-3 text-white shadow-md font-medium flex items-center gap-2"
                  onClick={()=>navigate("/upgrade")}
                >
                  <WhiteTrophyIcon />
                  <span>Upgarde</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubsDetails;

import proIcon from "../../../../../assets/img/pro-billing-icon.png";
import flagIcon from "../../../../../assets/img/flag-billing-icon.png";
import { WhiteTrophyIcon } from "../../../common/icons/icons";

const data = [
    {
        icon: flagIcon,
        plan_name: "Basic Plan",
        price: 199,
        frequency: "Billed every month",
        renewDays: 19,
        buttonName: "Upgrade Plan",
        action: () => console.log("upgrade plan clicked"),
    },
    {
        icon: proIcon,
        plan_name: "Affiliate Pro",
        price: 60,
        frequency: "Billed Annually",
        renewDays: 16,
        buttonName: "",
        action: () => {},
    },
];

const SubsDetails = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-[20px] font-medium text-[#000000BF]">Subscription Details</h2>
            {data.map((plan, index) => (
                <div
                    key={index}
                    className="grid grid-cols-3 justify-between items-center border border-[#0087FF33] rounded-md p-6 shadow-sm bg-white h-24"
                >
                    <div className="flex gap-3 items-center">
                        <img src={plan.icon} alt="plan icon" className="w-12 h-12 border border-[#0087FF33] p-1 rounded" />
                        <h3 className="text-[20px] font-medium">{plan.plan_name}</h3>
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <div className="text-4xl font-semibold">${plan.price}</div>
                            <div className="text-sm">{plan.frequency}</div>
                        </div>
                        <div className="text-sm">Renew in <span className="font-bold">{plan.renewDays}</span> days</div>
                    </div>
                    <div className="ml-auto">
                        {plan.buttonName
                            && <button
                                onClick={plan.action}
                                className="bg-gradient-to-b from-[#005199] to-[#0087FF] rounded-md px-4 py-3 text-white shadow-md font-medium flex items-center gap-2"
                            >
                                    <WhiteTrophyIcon />
                            <span>
                                    {plan.buttonName}
                            </span>
                            </button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubsDetails;

import icon1 from "../../../../../../assets/img/earningIcon1.png"
import icon2 from "../../../../../../assets/img/earningIcon2.png"
import icon3 from "../../../../../../assets/img/earningIcon3.png"
import icon4 from "../../../../../../assets/img/earningIcon4.png"
import { CopyAffiliateIcon } from "../../../../common/icons/icons";

const earnings = [
    { label: "Pending", amount: "$350,321.00", icon: icon1 },
    { label: "This Month", amount: "$350,321.00", icon: icon2 },
    { label: "Last Month", amount: "$350,321.00", icon: icon3 },
    { label: "Lifetime", amount: "$350,321.00", icon: icon4 },
];

const EarningAndPromotion = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6  bg-gray-100">
            {/* Earnings Section */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Earnings</h2>
                {earnings.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border border-blue-100 rounded-lg p-4 bg-blue-50 text-blue-900"
                    >
                        <div className="flex items-center gap-2">
                            <img src={item.icon} alt="icon" />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="font-semibold">{item.amount}</span>
                    </div>
                ))}
            </div>

            {/* Promotion Section */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-2 space-y-4 " >
                <div className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded-lg text-white mb-6 p-5 h-48 flex flex-col justify-center">
                    <h2 className="text-[28px] font-semibold text-white">Promote Novalya</h2>
                    <p className="text-[22px] text-white mt-2">Earn 40% lifetime commissions</p>
                </div>

                <div className="px-5">
                    <label className="block text-xl font-semibold text-black mb-1">Your Affiliate link</label>
                    <div className="relative w-full ">
                        <input
                            type="text"
                            value="https://app.novalya.com/affiliate-link"
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md text-sm"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button>
                                <CopyAffiliateIcon />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="px-5">
                    <label className="block text-xl font-semibold text-black mb-1">Your affiliate ID</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value="CDKCDCDCDC"
                            readOnly
                            className="flex-grow p-3 border border-gray-300 rounded-md text-sm"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                            Update Affiliate ID
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EarningAndPromotion;

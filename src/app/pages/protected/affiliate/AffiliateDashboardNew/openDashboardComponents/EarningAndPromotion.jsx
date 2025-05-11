import { useEffect, useState } from "react";
import icon1 from "../../../../../../assets/img/earningIcon1.png"
import icon2 from "../../../../../../assets/img/earningIcon2.png"
import icon3 from "../../../../../../assets/img/earningIcon3.png"
import icon4 from "../../../../../../assets/img/earningIcon4.png"
import { CopyAffiliateIcon } from "../../../../common/icons/icons";
import PropTypes from 'prop-types';
import useAffMemberStore from "../../../../../../store/affiliate/dashboard/AffMember";
import { message } from "antd";
import useLoginUserDataStore from "../../../../../../store/loginuser/loginuserdata";
import UpdateAffIdModal from "./UpdateAffIdModal"; 

const EarningAndPromotion = () => {
    const [affId, setAffId] = useState("")
    const { earningsData, fetchDashboardData, updateAffiliateId, updateLoading } = useAffMemberStore()
    const { loginUserData, fetchLoginUserData } = useLoginUserDataStore();
    const [openUpdateIdModal, setOpenUpdateIdModal] = useState(false)

    const earnings = [
        { label: "Pending", amount: earningsData.cSymbol + earningsData.pending.toLocaleString(), icon: icon1 },
        { label: "This Month", amount: earningsData.cSymbol + earningsData.thisMonth.toLocaleString(), icon: icon2 },
        { label: "Last Month", amount: earningsData.cSymbol + earningsData.lastMonth.toLocaleString(), icon: icon3 },
        { label: "Lifetime", amount: earningsData.cSymbol + earningsData.lifeTime.toLocaleString(), icon: icon4 },
    ];

    const handleModalSubmit = async (newAffiliateId) => {
        if (!newAffiliateId || newAffiliateId.trim() === "") {
            message.error("Affiliate ID cannot be empty");
            return;
        }

        try {
            const response = await updateAffiliateId({
                affiliatecode: newAffiliateId.trim(),
            });
            if (response.success) {
                message.success(response.message);
                await fetchLoginUserData();
                setOpenUpdateIdModal(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error("Failed to update affiliate ID:", error);
            message.error("Failed to update affiliate ID");
        }
    };

    const handleCopyAffiliateLink = () => {
        const affiliateLink = `https://dev.novalya.com/signup/${affId}`;
        navigator.clipboard.writeText(affiliateLink);
        message.success("Affiliate link copied to clipboard");
    };

    const handleUpdateCode = () => {
        setOpenUpdateIdModal(true);
    };

    useEffect(() => {
        if (loginUserData?.randomcode) {
            setAffId(loginUserData.randomcode);
        }
    }, [loginUserData?.randomcode]);

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className="flex flex-col md:flex-row gap-6 bg-gray-100 mb-6">
            {/* Earnings Section */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-medium mr-3 text-[#000407]">Earnings</h2>
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
                            value={`https://dev.novalya.com/signup/${affId}`}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-md text-sm"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <button onClick={handleCopyAffiliateLink}>
                                <CopyAffiliateIcon />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-5">
                    <label className="block text-xl font-semibold text-black mb-1">Your affiliate ID</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={affId}
                            onChange={(e) => setAffId(e.target.value)}
                            className="flex-grow p-3 border border-gray-300 rounded-md text-sm"
                        />
                        <button
                            className="bg-[#0087FF] hover:bg-blue-600 text-white px-4 py-2 rounded-md  text-sm"
                            onClick={handleUpdateCode}
                        >
                            Update Affiliate Id
                        </button>
                    </div>
                </div>
            </div>

            <UpdateAffIdModal
                visible={openUpdateIdModal}
                onCancel={() => setOpenUpdateIdModal(false)}
                onSubmit={handleModalSubmit}
                currentAffId={affId}
                updateLoading={updateLoading}
            />
        </div>
    );
};

EarningAndPromotion.propTypes = {
    randomCode: PropTypes.string,
};

export default EarningAndPromotion;
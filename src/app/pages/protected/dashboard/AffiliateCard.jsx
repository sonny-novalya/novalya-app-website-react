import { t } from 'i18next'
import AffiliateCardImg from "../../../../assets/img/affiliate-card.png";
import NovaWhiteLogo from "../../../../assets/img/nova-white.png";
import userPortrate from "../../../../assets/img/working-boy.png";
import { useNavigate } from 'react-router-dom';

const AffiliateCard = () => {
    const navigate = useNavigate()
    return (
        <div className="relative rounded-[16px] overflow-hidden text-white shadow-lg">
            <img src={AffiliateCardImg} alt="" className="w-full object-cover max-h-[215px] flex" />
            <img src={userPortrate} alt="" className="object-cover absolute right-[10px] top-[30px] w-[75px] h-[105px]" />
            <div className="absolute inset-0 p-5 flex flex-col justify-start gap-3">
                <img src={NovaWhiteLogo} alt="" className="w-6 " />
                <div>
                    <h3 className="text-[14px] font-semibold">
                        {t("dashboard.Promote and get paid")}
                    </h3>
                    <p className="my-1 text-[12px] pr-12 ">
                        {t("dashboard.By Sharing Your Affiliate Link To Others. Paid Up To 60%. Share It To The World.")}
                    </p>
                </div>
                <button
                    className="mt-1 bg-white text-[#09B96E] text-[12px] font-medium py-1.5 px-3 rounded shadow self-start tracking-wider cursor-pointer"
                    onClick={() => navigate("/affiliate")}
                >
                    {t("dashboard.My Affiliate Links")}
                </button>
            </div>
        </div>
    )
}

export default AffiliateCard

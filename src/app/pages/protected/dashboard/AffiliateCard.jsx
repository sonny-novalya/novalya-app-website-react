import { t } from 'i18next'
import AffiliateCardImg from "../../../../assets/img/affiliate-card.png";
import NovaWhiteLogo from "../../../../assets/img/nova-white.png";
import { useNavigate } from 'react-router-dom';

const AffiliateCard = () => {
    const navigate = useNavigate()
    return (
        <div className="relative flex-1 rounded-xl overflow-hidden text-white ">
            <img src={AffiliateCardImg} alt="" className="w-full object-cover h-full" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <img src={NovaWhiteLogo} alt="" className="h-10 w-12" />
                <div>
                    <h3 className="text-lg font-semibold">
                        {t("dashboard.Promote and get paid")}
                    </h3>
                    <p className="mt-2 text-sm">
                        {t("dashboard.By Sharing Your Affiliate Link To Others. Paid Up To 60%. Share It To The World.")}
                    </p>
                </div>
                <button
                    className="mt-4 bg-white text-[#09B96E] py-2 px-4 rounded shadow self-start tracking-wider cursor-pointer"
                    onClick={() => navigate("/affiliate")}
                >
                    {t("dashboard.My Affiliate Links")}
                </button>
            </div>
        </div>
    )
}

export default AffiliateCard

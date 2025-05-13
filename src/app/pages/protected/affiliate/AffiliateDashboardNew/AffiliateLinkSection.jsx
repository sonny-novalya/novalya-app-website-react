import link1 from "../../../../../assets/img/linkImg1.png";
import link2 from "../../../../../assets/img/linkImg2.png";
import link3 from "../../../../../assets/img/linkImg3.png";
import link4 from "../../../../../assets/img/french_go.png";
import { CopyAffiliateIcon } from '../../../common/icons/icons';
import { message } from 'antd';
import PropTypes from 'prop-types';
import PromotionModal from "./PromotionModal";
import { useEffect, useState } from "react";
import useUpgradeModalStore from "../../../../../store/modals/UpgradeToPro";

const AffiliateLinkSection = ({ isPro, randomCode }) => {
    const [showPromoModal, setShowPromoModal] = useState(false)
    const { showModal } = useUpgradeModalStore();
    const [affCode, setAffCode] = useState("")
    const selectedLang = localStorage.getItem("selectedLocale")
    
    const affiliateLinks = [
        {
            id: 1,
            type: "Official Website",
            url: `https://dev.novalya.com/signup/${affCode}`,
            image: link1
        },
        {
            id: 2,
            type: "Sales Funnel",
            url: `https://www.novalya.ai/en/go?uname=${affCode}&lang=en`,
            image: link2
        },
        {
            id: 3,
            type: "Pricing Page",
            url: `https://dev.novalya.com/plans?uname=${affCode}`,
            image: link3
        },
        {
            id: 4,
            type: "Formation | Convertissez Vos Leads en Clients",
            url: `https://dev.novalya.com/go-offer?uname=${affCode}&lang=fr`,
            image: link4
        }
    ];

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success("Text Copied");
        }).catch((err) => {
            message.error("Failed to copied text");
            console.error("Failed to copy:", err);
        });
    };

        useEffect(()=>{
             setAffCode(randomCode)
        }, [randomCode])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
            {isPro && (
                <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                    <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium" onClick={showModal}>
                        Unlock to Pro
                    </button>
                </div>
            )}
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-medium mr-3 text-[#000407]">My Affiliate links</h1>
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold">PRO</span>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {affiliateLinks.map((link) => {
                    if(link.id === 4 &&  selectedLang !== "fr-FR") return null
                    return   <div key={link.id} className="bg-white rounded-lg border border-gray-200">
                        <div className='p-2 rounded'>
                            <img src={link.image} alt={link.type} className="w-full h-40 object-cover rounded" />
                        </div>

                        <div className="p-2">
                            <h3 className="font-semibold mb-2">{link.type}</h3>
                            <div className="flex  ">
                                <div className="flex-grow border border-[#DCDCDC] bg-[#F2F2F2] px-3 py-2 mr-2 text-[#00040799] text-sm truncate rounded">
                                    {link.url}
                                </div>
                                <button
                                    onClick={() => handleCopy(link.url)}
                                    className="cursor-pointer"
                                >
                                    <CopyAffiliateIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                })}

            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-[#0087FF] hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer" onClick={() => setShowPromoModal(true)}>
                    View all affiliate links
                </button>
            </div>

            {
                showPromoModal &&
                <PromotionModal
                    visible={showPromoModal}
                    onCancel={() => setShowPromoModal(false)}
                    affiliateLinks={affiliateLinks}
                    affCode={randomCode}
                />
            }

        </div>
    );
};
AffiliateLinkSection.propTypes = {
    isPro: PropTypes.bool,
    randomCode: PropTypes.string,
};
export default AffiliateLinkSection;
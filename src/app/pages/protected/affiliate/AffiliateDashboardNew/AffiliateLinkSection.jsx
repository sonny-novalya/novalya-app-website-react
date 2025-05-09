import link1 from "../../../../../assets/img/linkImg1.png";
import link2 from "../../../../../assets/img/linkImg2.png";
import link3 from "../../../../../assets/img/linkImg3.png";
import { CopyAffiliateIcon } from '../../../common/icons/icons';
import { message } from 'antd';
import PropTypes from 'prop-types';

const AffiliateLinkSection = ({isPro }) => {
    const affiliateLinks = [
        {
            id: 1,
            type: "Official Website",
            url: "https://app.novalya.com/signup",
            image: link1
        },
        {
            id: 2,
            type: "Sales Funnel",
            url: "https://www.novalya.ai/en/go",
            image: link2
        },
        {
            id: 3,
            type: "Pricing Page",
            url: "https://app.novalya.com/redirect",
            image: link3
        },
        {
            id: 4,
            type: "Official Website",
            url: "https://app.novalya.com/signup",
            image: link1
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
            {isPro && (
                <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                    <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium">
                        Unlock to Pro
                    </button>
                </div>
            )}
            <div className="flex items-center mb-6">
                <h1 className="text-2xl font-medium mr-3 text-[#000407]">My Affiliate links</h1>
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded-md text-sm font-semibold">PRO</span>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {affiliateLinks.map((link) => (
                    <div key={link.id} className="bg-white rounded-lg border border-gray-200">
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
                ))}

            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-[#0087FF] hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
                    View all affiliate links
                </button>
            </div>
        </div>
    );
};
AffiliateLinkSection.propTypes = {
    isPro: PropTypes.bool,
};
export default AffiliateLinkSection;
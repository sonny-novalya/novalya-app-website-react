import { useState } from 'react';
import link1 from "../../../../../assets/img/linkImg1.png";
import link2 from "../../../../../assets/img/linkImg2.png";
import link3 from "../../../../../assets/img/linkImg3.png";
import { message, Modal } from 'antd';

const PromotionModal = ({ visible, onCancel }) => {
    const [affiliateCode, setAffiliateCode] = useState('CDKCDCDCDC');

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
        navigator.clipboard.writeText(text)
            .then(() => {
                message.success("Text Copied");
            })
            .catch((err) => {
                message.error("Failed to copy text");
                console.error("Failed to copy:", err);
            });
    };

    const handleUpdateCode = () => {
        message.success("Affiliate code updated: " + affiliateCode);
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={1100}
            centered
            closeIcon={null}
        >
                <div className=" my-5">
                    {/* Header and Code Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border border-[#DCDCDC] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 md:mb-0">Share your Affiliate links and get 40%</h2>
                        <div className="flex w-full md:w-auto">
                            <div className="relative flex-grow mr-2">
                                <input
                                    type="text"
                                    value={affiliateCode}
                                    onChange={(e) => setAffiliateCode(e.target.value)}
                                className="w-full border border-[#DCDCDC]  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => handleCopy(affiliateCode)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={handleUpdateCode}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
                            >
                                Update Affiliate Code
                            </button>
                        </div>
                    </div>

                    {/* Affiliate Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {affiliateLinks.map((link) => (
                            <div key={link.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="p-2">
                                    <img src={link.image} alt={link.type} className="w-full h-32 object-cover rounded" />
                                </div>
                                <div className="p-2">
                                    <h3 className="font-semibold mb-2">{link.type}</h3>
                                    <div className="flex items-center">
                                        <div className="flex-grow border border-gray-300 bg-gray-100 px-3 py-2 mr-2 text-gray-600 text-sm truncate rounded">
                                            {link.url}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(link.url)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           </Modal>
    );
};

export default PromotionModal;
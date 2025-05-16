import React, { useState } from "react";
import { DeleteFillRedIcon } from "../../../common/icons/icons";
import PaymentCardModal from "./PaymentCardModal";

const paymentMethods = [
    {
        id: 1,
        type: "Visa",
        last4: "1234",
        expiry: "06/2025",
        status: "primary",
    },
    {
        id: 2,
        type: "Visa",
        last4: "1234",
        expiry: "06/2025",
        status: "normal",
    },
    {
        id: 3,
        type: "Visa",
        last4: "1234",
        expiry: "06/2025",
        status: "expired",
    },
];

const PaymentMethods = () => {

    const [ showModal, setShowModal ] = useState(false)
    return (
        <div className="space-y-4">
            <h2 className="text-[20px] font-medium text-[#000000BF]">Payment Methods</h2>
            <div className="space-y-4 w-2/3">
                {paymentMethods.map((card) => (
                    <div
                        key={card.id}
                        className="flex items-center justify-between border border-[#DCDCDCCD] rounded-md p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                                alt="visa"
                                className="w-12 h-10 p-1 rounded border border-[#DCDCDCCD]"
                            />
                            <div>
                                <p className="">Visa ending in {card.last4}</p>
                                <p className="text-[12px] text-[#8D8D8D]">
                                    {card.status === "expired" ? (
                                        <span className="text-[#FF0000]">Expired on {card.expiry}</span>
                                    ) : (
                                        <>Expiry {card.expiry}</>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {card.status === "primary" && (
                                <span className="bg-[#21BF7C] text-white px-3 py-1 text-sm rounded">
                                    PRIMARY
                                </span>
                            )}
                            {card.status === "expired" && (
                                <span className="bg-[#FF0000] text-white px-3 py-1 text-sm rounded">
                                    EXPIRED
                                </span>
                            )}
                            <button>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0036 6.73046C20.9836 6.73046 20.9536 6.73046 20.9236 6.73046C15.6336 6.20046 10.3536 6.00046 5.12358 6.53046L3.08358 6.73046C2.66358 6.77046 2.29358 6.47046 2.25358 6.05046C2.21358 5.63046 2.51358 5.27046 2.92358 5.23046L4.96358 5.03046C10.2836 4.49046 15.6736 4.70046 21.0736 5.23046C21.4836 5.27046 21.7836 5.64046 21.7436 6.05046C21.7136 6.44046 21.3836 6.73046 21.0036 6.73046Z" fill="#FF0000" />
                                    <path d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25L13.3107 1.25C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76L10.7007 2.76C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z" fill="#FF0000" />
                                    <path d="M15.2104 22.7515H8.79039C5.30039 22.7515 5.16039 20.8215 5.05039 19.2615L4.40039 9.19154C4.37039 8.78154 4.69039 8.42154 5.10039 8.39154C5.52039 8.37154 5.87039 8.68154 5.90039 9.09154L6.55039 19.1615C6.66039 20.6815 6.70039 21.2515 8.79039 21.2515H15.2104C17.3104 21.2515 17.3504 20.6815 17.4504 19.1615L18.1004 9.09154C18.1304 8.68154 18.4904 8.37154 18.9004 8.39154C19.3104 8.42154 19.6304 8.77154 19.6004 9.19154L18.9504 19.2615C18.8404 20.8215 18.7004 22.7515 15.2104 22.7515Z" fill="#FF0000" />
                                    <path d="M13.6581 17.25H10.3281C9.91813 17.25 9.57812 16.91 9.57812 16.5C9.57812 16.09 9.91813 15.75 10.3281 15.75H13.6581C14.0681 15.75 14.4081 16.09 14.4081 16.5C14.4081 16.91 14.0681 17.25 13.6581 17.25Z" fill="#FF0000" />
                                    <path d="M14.5 13.25L9.5 13.25C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75L14.5 11.75C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="#FF0000" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                <button className="mt-4 bg-[#0087FF] text-white px-8 py-2 rounded-md  hover:bg-blue-600" onClick={() => setShowModal(true)} >
                    + Add New card
                </button>
            </div>
            <PaymentCardModal 
                visible={showModal}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
};

export default PaymentMethods;

import { Modal } from "antd";

const PaymentCardModal = ({ visible, onCancel }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
            closeIcon={null}
            className="w-[400px]"
        >
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-semibold text-center">Payment Details</h2>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="CARD NUMBER"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-sm placeholder-gray-400"
                        />
                        <span className="absolute right-3 top-2.5">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="2" y="5" width="20" height="14" rx="2" fill="#21A4FF" />
                                <rect x="2" y="8" width="20" height="2" fill="#0E85D6" />
                                <rect x="5" y="14" width="6" height="2" rx="1" fill="white" />
                                <rect x="13" y="14" width="4" height="2" rx="1" fill="white" />
                            </svg>
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder="CARDHOLDER NAME"
                        className="w-full border border-gray-300 rounded px-4 py-2 text-sm placeholder-gray-400"
                    />

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="12"
                            className="w-1/4 border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="2028"
                            className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400"
                        />
                        <div className="relative w-1/4">
                            <input
                                type="text"
                                placeholder="CVV"
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400"
                            />
                            <span className="absolute right-2 top-2.5">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="2" y="5" width="20" height="14" rx="2" fill="#444" />
                                    <rect x="2" y="7" width="20" height="3" fill="#222" />
                                    <rect x="14" y="14" width="6" height="2.5" rx="0.5" fill="#FFF" />
                                    <text x="14.5" y="15.9" fontSize="1.8" fill="#000" fontFamily="monospace">
                                        •••
                                    </text>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-blue-500 hover:bg-[#1994e5] text-white font-semibold text-sm py-2 rounded">
                        CONFIRM AND PAY
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-600 py-2 rounded"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default PaymentCardModal;

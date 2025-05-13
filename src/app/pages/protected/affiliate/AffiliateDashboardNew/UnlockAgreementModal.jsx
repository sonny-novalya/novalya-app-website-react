import { useEffect, useState } from 'react';
import { Modal } from 'antd';

const UnlockAgreementModal = ({ visible, onCancel, onProceed }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (!visible) {
            setIsChecked(false);
        }
    }, [visible]);

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={700}
            centered
        >
            <div className="">
                <h2 className="text-2xl font-bold text-[#33204a] mb-4">Become an Affiliate PRO</h2>

                {/* Scrollable agreement content */}
                <div className="border border-gray-300 rounded-md p-4 mb-6 overflow-y-auto bg-gray-50">
                    <h3 className="font-medium mb-2 text-xl">Custom Funnels & Email Campaigns</h3>
                    <h3 className="font-medium mb-2 text-xl">Private Bonuses & Advanced Trainings</h3>
                    <h3 className="font-medium mb-2 text-xl">Personalized Dashboard & Affiliate Tools</h3>
                    <h3 className="font-medium mb-2 text-xl">Customized Affiliate Code</h3>
                </div>

                {/* Checkbox for agreement */}
                <div className="mb-6 flex items-start">
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="mt-1 mr-2"
                    />
                    <label htmlFor="agreeTerms" className="text-gray-600 text-sm">
                        I have read and agree to the terms and conditions outlined in the Affiliate Agreement
                    </label>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-md border border-gray-300 text-blue-600 font-medium hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onProceed}
                        disabled={!isChecked}
                        className={`px-6 py-2 rounded-md font-medium ${isChecked
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UnlockAgreementModal;
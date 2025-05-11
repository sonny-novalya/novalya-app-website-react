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
                <h2 className="text-2xl font-bold text-[#33204a] mb-4">Affiliate Agreement</h2>

                {/* Scrollable agreement content */}
                <div className="border border-gray-300 rounded-md p-4 mb-6 h-96 overflow-y-auto bg-gray-50">
                    <h3 className="font-semibold mb-2">1. Introduction</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        This Affiliate Agreement is made between Novalya and you. This Agreement governs your participation
                        in our Affiliate Program and outlines the terms and conditions of our relationship.
                    </p>

                    <h3 className="font-semibold mb-2">2. Program Enrollment and Eligibility</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        By checking the box at the bottom of this Agreement, you confirm that you have read,
                        understood, and agree to be bound by the terms of this Agreement. You must be at least
                        18 years of age and have the legal capacity to enter into binding contracts.
                    </p>

                    <h3 className="font-semibold mb-2">3. Commission Structure</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        As an Affiliate, you will earn a 40% commission on all qualifying purchases made by customers
                        referred through your unique affiliate link. Commissions are calculated based on the net revenue
                        received by the Company after deducting taxes, refunds, and payment processing fees.
                    </p>

                    <h3 className="font-semibold mb-2">4. Payment Terms</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        Commissions will be paid on a monthly basis, provided that your account balance exceeds
                        the minimum payment threshold. Payments will be made via the payment method selected in
                        your affiliate dashboard.
                    </p>

                    <h3 className="font-semibold mb-2">5. Affiliate Links and Marketing</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        You will be provided with a unique affiliate link that must be used unmodified. You are
                        responsible for ensuring that your marketing activities comply with all applicable laws,
                        regulations, and this Agreement.
                    </p>

                    <h3 className="font-semibold mb-2">6. Term and Termination</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        This Agreement will continue until terminated by either party. Either party may terminate
                        this Agreement at any time, with or without cause, by providing written notice to the other party.
                    </p>

                    <h3 className="font-semibold mb-2">7. Modifications</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        The Company reserves the right to modify any terms of this Agreement at any time. You will
                        be notified of any changes, and your continued participation in the Affiliate Program
                        constitutes acceptance of such changes.
                    </p>
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
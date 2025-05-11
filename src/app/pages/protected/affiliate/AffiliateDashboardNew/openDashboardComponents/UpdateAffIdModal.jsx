import { useEffect, useState } from 'react';
import { Modal } from 'antd';

const UpdateAffIdModal = ({ visible, onCancel, onSubmit, currentAffId, updateLoading }) => {
    const [newAffId, setNewAffId] = useState(currentAffId);
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = () => {
        if (!isChecked) {
            return;
        }
        onSubmit(newAffId);
    };

    useEffect(()=>{
        if (currentAffId)
        {
            setNewAffId(currentAffId)
        }
    }, [])

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={500}
            centered
        >
            <div className="">
                <h2 className="text-2xl font-bold text-[#33204a] mb-6">Update Affiliate Link</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Current Affiliate Code</label>
                    <input
                        type="text"
                        value={currentAffId}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 mb-2">New Affiliate Code</label>
                    <input
                        type="text"
                        value={newAffId}
                        onChange={(e) => setNewAffId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-6 flex items-start">
                    <input
                        type="checkbox"
                        id="understand"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="mt-1 mr-2"
                    />
                    <label htmlFor="understand" className="text-gray-600">
                        I understand that all my previous links will be disabled and I want to update my affiliate links
                    </label>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-md border border-gray-300 text-black-600 font-medium hover:bg-gray-100 cursor-pointer"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isChecked}
                        className={`px-6 py-2 rounded-md font-medium ${isChecked ? 'bg-blue-500 text-white cursor-pointer ' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                    {
                            updateLoading
                                ? "UPDATING"
                                : "SUBMIT"
                    }
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateAffIdModal;
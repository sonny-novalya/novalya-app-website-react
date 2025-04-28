import { useState } from 'react';
import usePasswordStore from '../../../../store/profile/password-store';
import { message } from 'antd';
import { EyeFilled, EyeInvisibleFilled, EyeInvisibleTwoTone } from '@ant-design/icons';

const Password = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { updatePassword, loading } = usePasswordStore();  

    const handleSubmit = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            message.error("Please fill all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            message.error("New Password and Confirm Password do not match.");
            return;
        }
        await updatePassword({ oldpassword: oldPassword, newpassword: newPassword }); 
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
            <p className="text-gray-600 text-[16px] mb-4">
                <span className="font-semibold">Email :</span> Test.novalya.com
            </p>

            <div className="border border-[#DADADA] rounded-md p-6">
                <h2 className="text-lg font-semibold mb-6">Update Password</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Old Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Old Password</label>
                        <input
                            type={showOld ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old password"
                            className={`w-full border rounded-md py-2 px-4 focus:outline-none ${showOld ? 'border-[#0087FF]' : 'border-[#DADADA]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                        >
                            
                            {
                                showOld 
                                    ?  <EyeInvisibleFilled />
                                    : <EyeFilled />
                            }
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative md:col-start-1">
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className={`w-full border rounded-md py-2 px-4 focus:outline-none ${showNew ? 'border-[#0087FF]' : 'border-[#DADADA]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                        >
                            {
                                showNew
                                    ? <EyeInvisibleFilled />
                                    : <EyeFilled />
                            }
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className={`w-full border rounded-md py-2 px-4 focus:outline-none ${showConfirm ? 'border-[#0087FF]' : 'border-[#DADADA]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                        >
                            {
                                showConfirm
                                    ? <EyeInvisibleFilled />
                                    : <EyeFilled />
                            }
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-500 text-white px-8 py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                    >
                        {loading ? "Updating..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Password;

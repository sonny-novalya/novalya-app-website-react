import { useState } from 'react';
import PropTypes from "prop-types";
import { Modal, } from "antd";
import NotesSection from './Notes/NotesSection';
import ListPanel from './Notes/ListPanel';

const NoteUserModal = ({ visible, onCancel }) => {
    const [userInfo, setUserInfo] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "",
        phone: "",
        profession: "",
        bio: "",
        socials: {
            website: "",
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
            youtube: ""
        },
        note: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSocialChange = (platform, value) => {
        setUserInfo({
            ...userInfo,
            socials: {
                ...userInfo.socials,
                [platform]: value
            }
        });
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
            <div className="flex items-stretch justify-center w-full gap-4" style={{ minHeight: "80vh" }}>
                {/* Note Panel */}
                <div className="bg-white rounded-lg shadow-md w-full px-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium">Note for {userInfo.firstName} {userInfo.lastName}</h2>
                        <div className="flex">
                            <button className="text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </button>
                            <button className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">First name</label>
                            <input
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Last name</label>
                            <input
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                placeholder="Name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email <span className="text-gray-400">ⓘ</span>
                            </label>
                            <input
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Phone <span className="text-gray-400">ⓘ</span>
                            </label>
                            <input
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Profession <span className="text-gray-400">ⓘ</span>
                            </label>
                            <input
                                name="profession"
                                value={userInfo.profession}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Bio <span className="text-gray-400">ⓘ</span>
                            </label>
                            <input
                                name="bio"
                                value={userInfo.bio}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <NotesSection handleSocialChange={handleSocialChange} />
                    </div>

                    <div className="flex-grow mb-6">
                        <label className="block text-sm font-medium mb-1">
                            Write Note <span className="text-gray-400">ⓘ</span>
                        </label>
                        <textarea
                            name="note"
                            value={userInfo.note}
                            onChange={handleChange}
                            placeholder="Write your Note"
                            className="w-full border border-gray-300 rounded px-3 py-2 h-24 text-sm"
                        ></textarea>
                    </div>

                    <div className="flex justify-center space-x-3 mt-auto mb-4">
                        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium">
                            Cancel
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium">
                            Update
                        </button>
                    </div>
                </div>

                {/* List Panel */}
                <div className="w-full h-full">
                    <ListPanel />
                </div>
            </div>
        </Modal>
    );
};

NoteUserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    lead: PropTypes.object,
};

export default NoteUserModal;
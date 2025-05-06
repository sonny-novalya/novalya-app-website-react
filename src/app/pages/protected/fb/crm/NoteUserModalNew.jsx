import { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { Modal, } from "antd";
import NotesSection from './Notes/NotesSection';
import ListPanel from './Notes/ListPanel';
import { DeleteFillIcon, DeleteGreyIcon, EditIcon, EditIconSquaredIcon, MessengerIcon, MessengerSmallIcon, SyncTripleArrowIcon, TripleDotIcon } from '../../../common/icons/icons';
import { DeleteColumnOutlined, DeleteOutlined, DeleteTwoTone, SyncOutlined, UserDeleteOutlined } from '@ant-design/icons';

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

    const [activeNoteEditDropdown, setActiveNoteEditDropdown] = useState(null);
    const noteEditdropdownRefs = useRef([]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                activeNoteEditDropdown !== null &&
                noteEditdropdownRefs.current[activeNoteEditDropdown] &&
                !noteEditdropdownRefs.current[activeNoteEditDropdown].contains(e.target)
            ) {
                setActiveNoteEditDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeNoteEditDropdown]);


    const [notes, setNotes] = useState([
        {
            id: 1,
            text: "John needs to discuss the product purchase and pricing with other members.",
            date: "01 May 2025",
            time: "11:40"
        },
        {
            id: 2,
            text: "John joined the Group Import In revamp and tested manually.",
            date: "04 May 2025",
            time: "12:48"
        }
    ]);

    const [notesData, setNotesData] = useState({ note: '' });


    const handleAddNote = () => {
        if (!notesData.note.trim()) return;

        const now = new Date();
        const newNote = {
            id: notes.length + 1,
            text: notesData.note.trim(),
            date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        };

        setNotes([newNote, ...notes]);
        setNotesData({ note: '' }); // Clear input
    };

    const handleNoteChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
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
            <div className="flex items-stretch justify-center w-full gap-4 h-[calc(100vh-200px)]" >
                {/* Note Panel */}
                <div className="bg-white rounded-lg shadow-md w-full px-6 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center mb-6 relative">
                        <h2 className="text-lg font-medium">
                            Note for {userInfo.firstName} {userInfo.lastName}
                        </h2>

                        <div className="relative flex items-center">
                            <MessengerSmallIcon />

                            <div className="relative cursor-pointer">
                                <button onClick={() => setActiveNoteEditDropdown('header')} className='pt-2 ml-2'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.25 5C11.25 4.66848 11.1183 4.35054 10.8839 4.11612C10.6495 3.8817 10.3315 3.75 10 3.75C9.66848 3.75 9.35054 3.8817 9.11612 4.11612C8.8817 4.35054 8.75 4.66848 8.75 5C8.75 5.33152 8.8817 5.64946 9.11612 5.88388C9.35054 6.1183 9.66848 6.25 10 6.25C10.3315 6.25 10.6495 6.1183 10.8839 5.88388C11.1183 5.64946 11.25 5.33152 11.25 5ZM10 8.75C10.3315 8.75 10.6495 8.8817 10.8839 9.11612C11.1183 9.35054 11.25 9.66848 11.25 10C11.25 10.3315 11.1183 10.6495 10.8839 10.8839C10.6495 11.1183 10.3315 11.25 10 11.25C9.66848 11.25 9.35054 11.1183 9.11612 10.8839C8.8817 10.6495 8.75 10.3315 8.75 10C8.75 9.66848 8.8817 9.35054 9.11612 9.11612C9.35054 8.8817 9.66848 8.75 10 8.75ZM10 13.75C10.3315 13.75 10.6495 13.8817 10.8839 14.1161C11.1183 14.3505 11.25 14.6685 11.25 15C11.25 15.3315 11.1183 15.6495 10.8839 15.8839C10.6495 16.1183 10.3315 16.25 10 16.25C9.66848 16.25 9.35054 16.1183 9.11612 15.8839C8.8817 15.6495 8.75 15.3315 8.75 15C8.75 14.6685 8.8817 14.3505 9.11612 14.1161C9.35054 13.8817 9.66848 13.75 10 13.75Z" fill="black" fillOpacity="0.5" />
                                    </svg>
                                </button>

                            </div>
                            {activeNoteEditDropdown === 'header' && (
                                <div
                                    ref={(el) => (noteEditdropdownRefs.current['header'] = el)}
                                    className="absolute top-6 right-0 bg-white border border-gray-300 px-2 py-1 rounded shadow flex space-x-2 z-20 h-8"
                                >
                                    <button className="text-gray-600 hover:text-blue-500 text-sm">
                                        <SyncTripleArrowIcon />
                                    </button>
                                    <button className="text-gray-600 hover:text-red-500 text-sm">
                                        <DeleteGreyIcon />
                                    </button>
                                </div>
                            )}
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

                    <div className="px-4 py-3 border border-[#DADADA] rounded-md mb-4">
                        <div className="flex-grow mb-3">
                            <label className="block text-sm font-medium mb-1">
                                New Note <span className="text-gray-400">ⓘ</span>
                            </label>
                            <div className="flex items-center gap-2 mb-3">
                                <input
                                    name="note"
                                    value={notesData.note}
                                    onChange={(e) => setNotesData({ ...notesData, note: e.target.value })}
                                    placeholder="Write your Note"
                                    className="w-full border border-gray-300 rounded px-3 py-2 h-8 text-sm"
                                />
                                <button
                                    onClick={handleAddNote}
                                    className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center"
                                    title="Add Note"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                            </div>

                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">Notes History</label>
                            <div className="space-y-2 max-h-20 overflow-y-auto pr-1">
                                {notes.map((note, index) => (
                                    <div
                                        key={note.id}
                                        className="bg-gray-100 p-3 rounded flex justify-between items-start relative"
                                    >
                                        <div className="text-xs text-[#00000099]">
                                            <div>{note.text}</div>
                                            <div className="text-[10px] text-[#00000066] mt-1 flex gap-3">
                                                <span>{note.date}</span>
                                                <span>{note.time}</span>
                                            </div>
                                        </div>

                                        <div className="mt-1 cursor-pointer" onClick={() => setActiveNoteEditDropdown(activeNoteEditDropdown === index ? null : index)}>
                                            <TripleDotIcon />
                                        </div>

                                        {activeNoteEditDropdown === index && (
                                            <div
                                                ref={(el) => (noteEditdropdownRefs.current[index] = el)}
                                                className="absolute top-6 right-0 bg-white border border-gray-300 px-2 py-1 rounded shadow flex space-x-2 z-20 h-8"
                                            >
                                                <button className="text-gray-600 hover:text-blue-500 text-sm">
                                                    <EditIcon />
                                                </button>
                                                <button className="text-gray-600 hover:text-red-500 text-sm">
                                                    <DeleteGreyIcon />
                                                </button>
                                            </div>
                                        )}


                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-3 mb-4">
                        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium cursor-pointer">
                            Cancel
                        </button>
                        <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium cursor-pointer">
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
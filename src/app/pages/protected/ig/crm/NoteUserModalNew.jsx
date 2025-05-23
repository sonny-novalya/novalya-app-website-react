import { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { message, Modal, Spin, } from "antd";
import ListPanel from './Notes/ListPanel';
import { DeleteGreyIcon, EditIcon, TripleDotIcon } from '../../../common/icons/icons';
import { useLocation } from "react-router-dom";
import SocialsSection from './Notes/SocialsSection';
import useIgNoteStore from '../../../../../store/notes/igNoteStore';
import usefbCRM from '../../../../../store/fb/fbCRM';

const NoteUserModal = ({ visible, onCancel, lead, selectedGroup }) => {
    const { createIgNote, getIgNotes, fetchedNotes, deleteUserNote, loading } = useIgNoteStore();
    const { getGroupById } = usefbCRM();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
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

    const location = useLocation()
    const [activeNoteEditDropdown, setActiveNoteEditDropdown] = useState(null);
    const [noteDeletedData, setNoteDeletedData] = useState({});
    const [notesData, setNotesData] = useState({ note: '' });
    const [editingNote, setEditingNote] = useState(null);
    const isInstagram = location.pathname.split('/')[1] === 'ig'
    const user_name = isInstagram ? lead.insta_name : lead.fb_name
    const [selectedTag, setSelectedTag] = useState({
        tag_id: 0,
        stage_id: 0
    });
    const [notes_id, setNotesId] = useState(null)
    const [notes, setNotes] = useState([]);

    const noteEditdropdownRefs = useRef([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSocialChange = (platform, value) => {
        setUserInfo(prev => ({
            ...prev,
            socials: {
                ...prev.socials,
                [platform]: value
            }
        }));
    };

    const handleDeleteFullNote = async (note_id) => {
        if (!notes_id) return message.error("Please Create Notes first")
        try {
            const res = await deleteUserNote({ note_id });
            console.log("ressss", res)
            if (res?.status === 'success') {
                message.success(res?.message);
                setUserInfo({
                    firstName: "",
                    lastName: "",
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
                setNotesId(null);
                setNotes([]);
                setEditingNote(null);
                setNotesData({ note: '' });
                setActiveNoteEditDropdown(null);
                await getIgNotes({ insta_user_id: lead?.insta_user_id, type: "instagram" });
                handleUpdateGroups()
                onCancel();
            }
        } catch (error) {
            message.error("Failed to delete note");
            console.error("Delete failed:", error);
        }
    };

    const handleDeleteNote = async (noteToDelete) => {
        const updatedNotes = notes.filter(note => note.id !== noteToDelete.id);
        setNotes(updatedNotes);

        const payload = {
            first_name: userInfo.firstName || lead.first_name || '',
            last_name: userInfo.lastName || lead.last_name || '',
            insta_name: lead.insta_name || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            profession: userInfo.profession || '',
            profile_pic: lead.profile_pic || '',
            short_description: userInfo.bio || '',
            Socials: JSON.stringify(userInfo.socials),
            description: updatedNotes?.map((item) => item?.text),
            is_primary: selectedTag.tag_id || '',
            selected_tag_stage_ids: [
                {
                    tag_id: selectedTag.tag_id || '',
                    stage_id: selectedTag.stage_id || '',
                }
            ],
            insta_user_id: lead.insta_user_id || '',
            type: "instagram",
            thread_id: lead.thread_id
        };

        try {
            const msg = await createIgNote({ data: payload });

            if (msg) {
                message.success("Note Added Successfully");
                handleUpdateGroups()
                getIgNotes({ insta_user_id: lead?.insta_user_id, type: "instagram" });
            }
        } catch (error) {
            message.error("Failed to add note");
            console.error("Note creation failed:", error);
        }

        setActiveNoteEditDropdown(null);
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setNotesData({ note: note.text });
        setActiveNoteEditDropdown(null);
    };

    const cancelEditing = () => {
        setEditingNote(null);
        setNotesData({ note: '' });
    };


    const handleUpdateGroups = async () => {
        if (selectedGroup)
            await getGroupById({ id: selectedGroup?.id, type: 'ig' });
    }

    useEffect(() => {
        if (visible) {
        getIgNotes({ insta_user_id : lead?.insta_user_id, type: "instagram" })
        }
    }, [visible, lead?.insta_user_id])

    useEffect(() => {
        if (fetchedNotes) {
            setNotesId(fetchedNotes?.id)
            setUserInfo({
                firstName: fetchedNotes.first_name || '',
                lastName: fetchedNotes.last_name || '',
                email: fetchedNotes.email || '',
                phone: fetchedNotes.phone || '',
                profession: fetchedNotes.profession || '',
                bio: fetchedNotes.short_description || '',
                socials: fetchedNotes.Socials ? JSON.parse(fetchedNotes.Socials) : {
                    website: '',
                    facebook: '',
                    instagram: '',
                    twitter: '',
                    linkedin: '',
                    youtube: ''
                },
                note: ''
            });
            const stageData = fetchedNotes?.taggedUsersInsta?.[0]
            setSelectedTag({
                tag_id: stageData?.tag_id,
                stage_id: stageData?.stage_id
                })

            if (Array.isArray(fetchedNotes?.description)) {
                const historyNotes = fetchedNotes.description.map((desc, index) => ({
                    id: index + 1,
                    text: desc
                }));

                setNotes(historyNotes);
            }
        }
    }, [fetchedNotes]);

    const handleAddNote = async () => {
        let notes_history = []
        
        if (!userInfo?.firstName.trim()) {
            return message.error("Please add first Name")
        }
        if (!userInfo?.lastName.trim()) {
            return message.error("Please add Last Name")
        }

        if (editingNote) {
            const updatedNotes = notes.map(note =>
                note.id === editingNote.id
                    ? { ...note, text: notesData.note.trim() }
                    : note
            );
            setNotes(updatedNotes);
            notes_history = updatedNotes;

            const payload = {
                first_name: userInfo.firstName || lead.first_name || '',
                last_name: userInfo.lastName || lead.last_name || '',
                insta_name: lead.insta_name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                profession: userInfo.profession || '',
                profile_pic: lead.profile_pic || '',
                short_description: userInfo.bio || '',
                Socials: JSON.stringify(userInfo.socials),
                description: updatedNotes?.map((item) => item?.text),
                is_primary: selectedTag.tag_id || '',
                selected_tag_stage_ids: [
                    {
                        tag_id: selectedTag.tag_id || '',
                        stage_id: selectedTag.stage_id || '',
                    }
                ],
                insta_user_id: lead.insta_user_id || '',
                type: "instagram",
                thread_id: lead.thread_id
            };

            try {
                const res = await createIgNote({ data: payload });

                if (res) {
                    message.success(res?.message);
                    handleUpdateGroups()
                    getIgNotes({ insta_user_id: lead?.insta_user_id, type: "instagram" });
                }
            } catch (error) {
                message.error("Failed to add note");
                console.error("Note creation failed:", error);
            }

            setEditingNote(null);
            setNotesData({ note: '' });
            return; 
        } else {
            if (!notesData.note.trim()) {
                setNotes(prevNotes => [...prevNotes]);
                const notesList = notes?.map((item) => ({
                    id: item.id,
                    description: item.text,
                }));

                notes_history = [...notesList];
            } else {
                const newNote = {
                    id: Date.now(),
                    text: notesData?.note?.trim()
                };
                setNotes(prevNotes => [newNote, ...prevNotes]);
                notes_history = [newNote, ...notes];
            }

            const payload = {
                first_name: userInfo.firstName || lead.first_name || '',
                last_name: userInfo.lastName || lead.last_name || '',
                insta_name: lead.insta_name || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                profession: userInfo.profession || '',
                profile_pic: lead.profile_pic || '',
                short_description: userInfo.bio || '',
                Socials: JSON.stringify(userInfo.socials),
                description: notes_history?.map((item) => item?.text),
                is_primary: selectedTag.tag_id || '',
                selected_tag_stage_ids: [
                    {
                        tag_id: selectedTag.tag_id || '',
                        stage_id: selectedTag.stage_id || '',
                    }
                ],
                insta_user_id: lead.insta_user_id || '',
                type: "instagram",
                thread_id: lead.thread_id
            };

            try {
                const res = await createIgNote({ data: payload });

                if (res) {
                    message.success(res?.message);
                    handleUpdateGroups()
                    getIgNotes({ insta_user_id: lead?.insta_user_id, type: "instagram" });
                }
            } catch (error) {
                message.error("Failed to add note");
                console.error("Note creation failed:", error);
                // Remove the optimistically added note if the API call fails
                // setNotes(prevNotes => prevNotes.filter(note => note.id !== 0 || note.text !== newNote.text));
            }
        }

        setNotesData({ note: '' });
    };


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

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={1100}
            centered
            closeIcon={null}
            wrapClassName="custom-ig-note-modal-wrap"
        >
            <div className="flex items-stretch justify-center w-full gap-4 h-[calc(100vh-200px)] relative" >
                {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg h-full">
                        <Spin size="large" />
                    </div>
                )}
                {/* Note Panel */}
                <div className="bg-white rounded-lg shadow-md w-full px-6 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center mb-6 relative">
                        <h2 className="text-lg font-medium">
                            Note for {user_name}
                        </h2>

                        <div className="relative flex items-center">
                            {/* <MessengerSmallIcon /> */}

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
                                    {/* <button className="text-gray-600 hover:text-blue-500 text-sm">
                                        <SyncTripleArrowIcon />
                                    </button> */}
                                    <button className="text-gray-600 hover:text-red-500 text-sm" onClick={() => handleDeleteFullNote(notes_id)}>
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
                                placeholder="Enter Profession"
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
                                placeholder="Enter Bio"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <SocialsSection
                            socials={userInfo.socials}
                            handleSocialChange={handleSocialChange}
                        />
                    </div>

                    <div className="px-4 py-3 border border-[#DADADA] rounded-md mb-4">
                        <div className="flex-grow mb-3">
                            <label className="block text-sm font-medium mb-1">
                                {editingNote ? "Edit Note" : "New Note"} <span className="text-gray-400">ⓘ</span>
                            </label>
                            <div className="relative w-full mb-3">
                                <input
                                    name="note"
                                    value={notesData.note}
                                    onChange={(e) => setNotesData({ ...notesData, note: e.target.value })}
                                    placeholder={editingNote ? "Edit your note" : "Write your Note"}
                                    className="w-full border border-gray-300 rounded px-3 py-2 h-8 text-sm pr-8" 
                                />
                                {editingNote && (
                                    <button
                                        type="button"
                                        onClick={cancelEditing}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">Notes History</label>
                            <div className="space-y-2 min-h-20 max-h-36 overflow-y-auto pr-1">
                                {notes?.map((note, index) => {
                                    return <div
                                        key={index}
                                        className="bg-gray-100 p-3 rounded flex justify-between items-start relative"
                                    >
                                        <div className="text-xs text-[#00000099]">
                                            <div>{note.text}</div>
                                        </div>

                                        <div className="mt-1 cursor-pointer" onClick={() => {
                                            setNoteDeletedData(note)
                                            setActiveNoteEditDropdown(activeNoteEditDropdown === index ? null : index)
                                        }}>
                                            <TripleDotIcon />
                                        </div>

                                        {activeNoteEditDropdown === index && (
                                            <div
                                                ref={(el) => (noteEditdropdownRefs.current[index] = el)}
                                                className="absolute top-6 right-0 bg-white border border-gray-300 px-2 py-1 rounded shadow flex space-x-2 z-20 h-8"
                                            >
                                                <button
                                                    className="text-gray-600 hover:text-blue-500 text-sm"
                                                    onClick={() => handleEditNote(note)}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-red-500 text-sm"
                                                    onClick={() => handleDeleteNote(noteDeletedData)}
                                                >
                                                    <DeleteGreyIcon />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-3 mb-4">
                        <button
                            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium cursor-pointer"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium cursor-pointer"
                            onClick={handleAddNote}
                        >
                            {editingNote ? "Update Note" : "Update"}
                        </button>
                    </div>
                </div>

                {/* List Panel */}
                <div className="w-full h-full">
                    <ListPanel setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
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
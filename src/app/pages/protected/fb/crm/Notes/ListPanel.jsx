import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import usefbCRM from '../../../../../../store/fb/fbCRM';
import tagImg from '../../../../../../assets/img/visibitlityTag.png';
import { rgbToHex } from '../../../../../../helpers/rgbToHex';
import PropTypes from "prop-types";
import { UserIcon } from '../../../../common/icons/icons';

const ListPanel = ({ setSelectedTag, selectedTag }) => {
    const location = useLocation()
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const { fetchCRMGroups, CRMList, fbCRMLoading } = usefbCRM()
    const [selectedList, setSelectedList] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStage, setSelectedStage] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mainListSelection, setMainListSelection] = useState('');

    const dropdownRef = useRef(null);

    useEffect(() => {
        const type = isInstagram ? 'ig' : 'fb'
        fetchCRMGroups({ data: {}, type });
    }, [fetchCRMGroups, isInstagram]);

    useEffect(() => {
        if (
            selectedTag?.tag_id &&
            selectedTag?.stage_id &&
            CRMList &&
            CRMList.length > 0
        ) {
            const listId = Number(selectedTag.tag_id);
            const stageId = Number(selectedTag.stage_id);

            const list = CRMList.find(item => item.id === listId);
            const stage = list?.stage.find(s => s.id === stageId);

            if (list && stage) {
                setSelectedList(listId);
                setMainListSelection(listId);
                setSelectedStage({
                    listId: listId,
                    stageId: stageId,
                    stageName: stage.name,
                    taggedUsersStageCount: stage.taggedUsersStageCount ?? 0
                });
            }
        }
    }, [selectedTag, CRMList]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const selectList = (id) => {
        setSelectedList(id);
        setMainListSelection(id);

        const list = CRMList.find(item => item.id === id);
        if (list && list.stage && list.stage.length > 0) {
            const firstStage = list.stage[0];
            setSelectedStage({
                listId: id,
                stageId: firstStage.id,
                stageName: firstStage.name,
                taggedUsersStageCount: firstStage.taggedUsersStageCount ?? 0 
            });
        } else {
            setSelectedStage(null);
        }
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const selectStage = (listId, stageId, stageName) => {
        const list = CRMList.find(item => item.id === listId);
        const stage = list?.stage.find(s => s.id === stageId);

        setSelectedStage({
            listId,
            stageId,
            stageName,
            taggedUsersStageCount: stage?.taggedUsersStageCount ?? 0
        });

        setActiveDropdown(null);
        setSelectedTag({
            tag_id: listId,
            stage_id: stageId
        });
    };

    const handleMainListSelection = (e) => {
        const listId = Number(e.target.value);
        setMainListSelection(listId);
        selectList(listId);
    };

    const getColorStyle = (customColor) => {
        if (!customColor) return { backgroundColor: "#e5e7eb" };
        if (customColor.startsWith("rgb") || customColor.startsWith("#")) {
            return { backgroundColor: customColor };
        }
        return { backgroundColor: customColor };
    };

    const filteredLists = CRMList && CRMList.filter(list =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCurrentStageName = () => {
        if (!selectedStage) return "Select Stage";

        if (selectedStage.stageName) {
            return selectedStage.stageName;
        }

        const list = CRMList.find(item => item.id === selectedStage.listId);
        if (list && list.stage) {
            const stage = list.stage.find(s => s.id === selectedStage.stageId);
            return stage ? stage.name : "Select Stage";
        }

        return "Select Stage";
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full h-full flex flex-col">
            <div className="mb-6 flex items-center justify-center space-x-10 bg-[#F5F5F5] border border-[#DCDCDC] rounded-[10px] py-3">
                <div className="flex items-center mb-2">
                    <img src={tagImg} alt="tag icon" className='' />
                    <h2 className="text-[22px] font-medium">Visible Tag</h2>
                    <span className="ml-1 text-gray-400">ⓘ</span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="w-full">
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm truncate max-w-[200px] overflow-hidden"
                            value={mainListSelection}
                            onChange={handleMainListSelection}
                            title={CRMList?.find(item => item.id === mainListSelection)?.name || ''}
                        >
                            <option value="">Select Tag</option>
                            {CRMList && CRMList.map(list => (
                                <option key={list.id} value={list.id} className='max-w-[200px] truncate'>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-grow mb-4 overflow-hidden">
                <div className="flex justify-between items-center bg-[#F5F5F5] border border-[#DCDCDC] rounded-[10px] p-3 border-b-none rounded-b-none">
                    <div className="text-[22px] font-medium">
                        Add to lists
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-md pl-8 pr-2 py-1 text-sm"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 absolute left-2 top-1.5">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </div>
                </div>

                {fbCRMLoading ? (
                    <div className="text-center py-4">Loading lists...</div>
                ) : (
                    <div className="space-y-2 flex-grow h-[calc(100vh-290px)] overflow-y-auto border border-gray-200 rounded-b-md mt-2 px-4">
                        {filteredLists && filteredLists.map((list) => {
                            const isSelected = selectedList === list.id;

                            return (
                                <div key={list.id} className={`flex items-center h-8 rounded-sm border-2 mt-3`}
                                    style={{
                                        borderColor: isSelected
                                            ? rgbToHex(list.custom_color)
                                            : '#e5e7eb',
                                    }}>
                                    <div
                                        className="w-8 h-8 flex items-center justify-center z-10 rounded-l-sm"
                                        style={getColorStyle(list.custom_color)}
                                    >
                                        <div
                                            className="h-4 w-4 flex items-center justify-center border rounded-sm cursor-pointer"
                                            style={{
                                                backgroundColor: '#ffffff',
                                                borderColor: rgbToHex(list.custom_color),
                                            }}
                                            onClick={() => selectList(list.id)}
                                        >
                                            {isSelected && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke={rgbToHex(list.custom_color)}
                                                    strokeWidth={3}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className='w-4 h-4 rotate-45 transform relative right-2.5' style={getColorStyle(list.custom_color)}>
                                    </div>
                                    <div className="flex-grow flex items-center justify-between ml-2">
                                        <div className="text-sm font-medium max-w-[180px] truncate flex">
                                            {list.name}

                                            <span className='flex items-center justify-between text-[#00000080] ml-2'>
                                                ( <UserIcon /> <span className='text-[#000000B2] ml-[2px]'>{list.taggedUsersCount}</span> )
                                            </span>
                                        </div>

                                        {
                                            isSelected && list.stage && list.stage.length > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <div className="relative w-full pr-6">
                                                        <div
                                                            className="border border-gray-300 rounded px-3 py-1 text-xs flex justify-between items-center cursor-pointer"
                                                            onClick={() => toggleDropdown(list.id)}
                                                        >
                                                            <span className='flex items-center justify-between'>
                                                                <span>
                                                                    {selectedStage && selectedStage.listId === list.id
                                                                        ? getCurrentStageName()
                                                                        : "Select Stage"}
                                                                </span>

                                                                <span className='flex items-center justify-between text-[#00000080] ml-2'>
                                                                    ( <UserIcon /> 
                                                                    <span className='text-[#000000B2] ml-[2px]'>{selectedStage?.taggedUsersStageCount }</span> )
                                                                </span>
                                                            </span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 absolute right-2">
                                                                <path d="M7 10l5 5 5-5z" />
                                                            </svg>
                                                        </div>

                                                        {activeDropdown === list.id && (
                                                            <div
                                                                ref={dropdownRef}
                                                                className="absolute right-2 z-20  mt-1 bg-white border border-gray-200 rounded-md shadow-md w-32"
                                                            >
                                                                {list.stage.map((stage, index) => (
                                                                    <div
                                                                        key={stage.id}
                                                                        className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-between border-2 w-32 rounded-lg ${selectedStage &&
                                                                                selectedStage.listId === list.id &&
                                                                                selectedStage.stageId === stage.id
                                                                                ? 'border-blue-500 '
                                                                                : 'border-white hover:bg-gray-100'
                                                                            }`}
                                                                        onClick={() => selectStage(list.id, stage.id, stage.name)}
                                                                    >
                                                                            <span>{stage.name || `Stage ${index + 1}`}</span>
                                                                        <span className='flex items-center justify-between text-[#00000080]'>
                                                                            ( <UserIcon /> <span className='text-[#000000B2] ml-[2px]'>{stage.taggedUsersStageCount ?? 0}</span> )
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

ListPanel.propTypes = {
    setSelectedTag: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    lead: PropTypes.object,
    selectedTag: PropTypes.object,
};


export default ListPanel;
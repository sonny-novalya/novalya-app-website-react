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
        <div className=" rounded-[10px] px-6 py-5 w-full h-full flex flex-col">
            <div className="mb-3 flex items-center justify-center space-x-5 bg-[#F5F5F5] border border-[#DCDCDC] rounded-[10px] px-6 py-4">
                <div className="flex items-center mb-2">
                    <img src={tagImg} alt="tag icon" className='' />
                    <h2 className="text-[22px] font-medium">Visible Tag</h2>
                    <span className="ml-1 text-gray-400 text-[16px]">ⓘ</span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="w-full">
                        <select
                            className="w-full bg-[#fff] rounded-[6px] px-3 py-2 text-sm truncate max-w-[200px] overflow-hidden"
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
                    <div className="relative w-[75%] max-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-0 bg-white rounded-[6px] pl-8 pr-2 py-1 text-sm min-h-8.5 w-full border border-[rgb(0_4_7_/_10%)] min-h-[34px]"
                        />
                       
                        <svg className="w-4 h-4 absolute left-3 top-[9px]" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3519 13.7021L11.2226 10.5733C12.1296 9.48437 12.5819 8.08768 12.4853 6.67377C12.3888 5.25986 11.7509 3.93759 10.7043 2.98204C9.65767 2.02649 8.28297 1.51122 6.86613 1.54342C5.44929 1.57562 4.09942 2.15281 3.0973 3.15492C2.09519 4.15703 1.518 5.50691 1.4858 6.92375C1.4536 8.34058 1.96887 9.71529 2.92442 10.7619C3.87997 11.8085 5.20224 12.4464 6.61615 12.543C8.03006 12.6395 9.42676 12.1872 10.5157 11.2802L13.6444 14.4096C13.6909 14.456 13.746 14.4929 13.8067 14.518C13.8674 14.5431 13.9325 14.5561 13.9982 14.5561C14.0639 14.5561 14.1289 14.5431 14.1896 14.518C14.2503 14.4929 14.3055 14.456 14.3519 14.4096C14.3984 14.3631 14.4352 14.308 14.4604 14.2473C14.4855 14.1866 14.4985 14.1215 14.4985 14.0558C14.4985 13.9901 14.4855 13.9251 14.4604 13.8644C14.4352 13.8037 14.3984 13.7485 14.3519 13.7021ZM2.49819 7.05581C2.49819 6.16579 2.76211 5.29576 3.25658 4.55574C3.75104 3.81572 4.45385 3.23894 5.27611 2.89835C6.09838 2.55775 7.00318 2.46864 7.8761 2.64227C8.74901 2.81591 9.55083 3.24449 10.1802 3.87383C10.8095 4.50316 11.2381 5.30499 11.4117 6.1779C11.5854 7.05081 11.4962 7.95561 11.1556 8.77788C10.8151 9.60015 10.2383 10.303 9.49826 10.7974C8.75823 11.2919 7.88821 11.5558 6.99819 11.5558C5.80512 11.5545 4.6613 11.08 3.81767 10.2363C2.97404 9.3927 2.49951 8.24887 2.49819 7.05581Z" fill="#878787"/>
                        </svg>

                    </div>
                </div>

                {fbCRMLoading ? (
                    <div className="text-center py-4">Loading lists...</div>
                ) : (
                    <div className="space-y-2 flex-grow h-[calc(100vh-290px)] overflow-y-auto border border-gray-200 rounded-b-md border-t-0 px-4">
                        {filteredLists && filteredLists.map((list) => {
                            const isSelected = selectedList === list.id;

                            return (
                                <div key={list.id} className={`flex items-center h-12 rounded-sm border-1 mt-4`}
                                    style={{
                                        borderColor: isSelected
                                            ? rgbToHex(list.custom_color)
                                            : '#e5e7eb',
                                    }}>
                                    <div
                                        className="w-12 h-12 flex items-center justify-center z-10 rounded-l-[6px]"
                                        style={getColorStyle(list.custom_color)}
                                    >
                                        <div
                                            className="h-5 w-5 flex items-center justify-center border rounded-sm cursor-pointer"
                                            style={{
                                                backgroundColor: '#ffffff',
                                                borderColor: rgbToHex(list.custom_color),
                                            }}
                                            onClick={() => selectList(list.id)}
                                        >
                                            {isSelected && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
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
                                    <div className="flex-grow flex items-center justify-between ml-1 gap-2">
                                        <div className="text-sm font-medium max-w-[180px] truncate flex">
                                            {list.name}

                                            <span className='flex items-center justify-between text-[#00000080] ml-2 leading-[1]'>
                                                ( <UserIcon /> <span className='text-[#000000B2] ml-[2px]'>{list.taggedUsersCount}</span> )
                                            </span>
                                        </div>

                                        {
                                            isSelected && list.stage && list.stage.length > 0 && (
                                                <div className="flex items-center justify-between">
                                                    <div className="relative w-full border border-gray-300 rounded px-2 py-1 pr-6 mr-2 min-w-[125px]">
                                                        <div
                                                            className=" text-xs flex justify-between items-center cursor-pointer"
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
                                                                    <span className='text-[13px] text-[#000000B2] ml-[2px]'>{selectedStage?.taggedUsersStageCount }</span> )
                                                                </span>
                                                            </span>
                                                            
                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 absolute right-1">
                                                                <path d="M0.93457 1.75781L2.17187 0.520508L4.91113 3.25977L4.99902 3.34863L5.08789 3.25977L7.82812 0.520508L9.06543 1.75781L5 5.82324L0.93457 1.75781Z" fill="black" fill-opacity="0.55" stroke="white" stroke-width="0.25"/>
                                                            </svg>

                                                        </div>

                                                        {activeDropdown === list.id && (
                                                            <div
                                                                ref={dropdownRef}
                                                                className="absolute z-20  mt-1 bg-white border border-gray-200 rounded-md shadow-[0_3px_15px_rgb(0_0_0_/_35%)] p-2 w-full right-0 w-36"
                                                            >
                                                                {list.stage.map((stage, index) => (
                                                                    <div
                                                                        key={stage.id}
                                                                        className={`hover-text-white px-2 py-2 text-xs cursor-pointer flex items-center justify-between border-1 w-full rounded-[6px] ${selectedStage &&
                                                                                selectedStage.listId === list.id &&
                                                                                selectedStage.stageId === stage.id
                                                                                ? 'bg-[#0087FF] text-white'
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
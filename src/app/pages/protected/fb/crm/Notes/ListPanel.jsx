import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import usefbCRM from '../../../../../../store/fb/fbCRM';
import tagImg from '../../../../../../assets/img/visibitlityTag.png';

const ListPanel = () => {
    const location = useLocation()
    const isInstagram = location.pathname.split("/")[1] === "ig";

    const { fetchCRMGroups, CRMList, fbCRMLoading } = usefbCRM()
    const [selectedLists, setSelectedLists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStages, setSelectedStages] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mainListSelection, setMainListSelection] = useState('');

    const dropdownRef = useRef(null);

    useEffect(() => {
        const type = isInstagram ? 'ig' : 'fb'
        fetchCRMGroups({ data: {}, type });
    }, [fetchCRMGroups, isInstagram]);

    useEffect(() => {
        if (CRMList && CRMList.length > 0) {
            const initialSelected = CRMList.slice(0, 2).map(list => list.id);
            setSelectedLists(initialSelected);

            const initialStages = {};
            initialSelected.forEach(listId => {
                const list = CRMList.find(item => item.id === listId);
                if (list && list.stage && list.stage.length > 0) {
                    initialStages[listId] = list.stage[0].id;
                }
            });
            setSelectedStages(initialStages);
        }
    }, [CRMList]);

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

    const toggleList = (id) => {
        if (selectedLists.includes(id)) {
            setSelectedLists(selectedLists.filter(listId => listId !== id));
            const updatedStages = { ...selectedStages };
            delete updatedStages[id];
            setSelectedStages(updatedStages);
        } else {
            setSelectedLists([...selectedLists, id]);
            const list = CRMList.find(item => item.id === id);
            if (list && list.stage && list.stage.length > 0) {
                setSelectedStages({
                    ...selectedStages,
                    [id]: list.stage[0].id
                });
            }
        }
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    const selectStage = (listId, stageId, stageName) => {
        setSelectedStages({
            ...selectedStages,
            [listId]: stageId
        });
        setActiveDropdown(null);

        console.log(`List ${listId} stage selected: ${stageId} (${stageName})`);
    };

    const handleMainListSelection = (e) => {
        const listId = e.target.value;
        setMainListSelection(listId);

        console.log("Main list selected:", listId);
    };

    const getColorStyle = (customColor) => {
        if (!customColor) return "bg-gray-200";
        if (customColor.startsWith("rgb")) {
            return { backgroundColor: customColor };
        }
        return customColor;
    };

    const filteredLists = CRMList && CRMList.filter(list =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            value={mainListSelection}
                            onChange={handleMainListSelection}
                        >
                            <option value="">Select Tag</option>
                            {CRMList && CRMList.map(list => (
                                <option key={list.id} value={list.id}>
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
                    <div className="space-y-2 flex-grow h-[calc(100vh-290px)] overflow-y-auto border border-gray-200 rounded-b-md mt-2 px-3">
                        {filteredLists && filteredLists.map((list) => {
                            // Get current selected stage for this list
                            const selectedStageId = selectedStages[list.id];
                            const selectedStage = list.stage && list.stage.find(s => s.id === selectedStageId);

                            return (
                                <div key={list.id} className="flex items-center border border-gray-200 h-8 rounded-sm">
                                    <div
                                        className="w-8 h-8 flex items-center justify-center z-10 rounded-l-sm"
                                        style={getColorStyle(list.custom_color)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedLists.includes(list.id)}
                                            onChange={() => toggleList(list.id)}
                                            className="h-4 w-4 rounded"
                                        />
                                    </div>
                                    <div className='w-4 h-4 rotate-45 transform relative right-2.5' style={getColorStyle(list.custom_color)}>

                                    </div>
                                    <div className="flex-grow flex items-center justify-between ml-2">
                                        <div className="text-sm font-medium">
                                            {list.name}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="relative w-full pr-6">
                                                <div
                                                    className="border border-gray-300 rounded px-3 py-1 text-xs flex justify-between items-center cursor-pointer"
                                                    onClick={() => toggleDropdown(list.id)}
                                                >
                                                    <span>
                                                        {selectedStage ? selectedStage.name : "Name of Stage"}
                                                    </span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 absolute right-2">
                                                        <path d="M7 10l5 5 5-5z" />
                                                    </svg>
                                                </div>

                                                {/* Stage dropdown */}
                                                {activeDropdown === list.id && list.stage && list.stage.length > 0 && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md"
                                                    >
                                                        {list.stage.map((stage, index) => (
                                                            <div
                                                                key={stage.id}
                                                                className={`px-3 py-2 text-xs cursor-pointer flex items-center ${selectedStageId === stage.id
                                                                    ? 'bg-blue-500 text-white'
                                                                    : 'hover:bg-gray-100'
                                                                    }`}
                                                                onClick={() => selectStage(list.id, stage.id, stage.name)}
                                                            >
                                                                {selectedStageId === stage.id && (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                                Stage {index + 1}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
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

export default ListPanel
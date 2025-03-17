import { useState, useRef, useEffect } from "react";
import { BothGenderIcon, FemaleGenderIcon, MaleGenderIcon, TickFillIcon, TickIcon, UpperArrowIcon } from "../../../../../pages/common/icons/icons";

const Filters = () => {
    const [selectedGender, setSelectedGender] = useState("Male");
    const [keywords, setKeywords] = useState(["Chef d’entreprise"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const genders = [
        { label: "Male", icon: <MaleGenderIcon /> },
        { label: "Female", icon: <FemaleGenderIcon /> },
        { label: "Both", icon: <BothGenderIcon /> }
    ];

    const keywordOptions = ["Chef d’entreprise", "Community", "Buyers", "Core Users"];

    const handleKeywordSelect = (keyword) => {
        if (!keywords.includes(keyword)) {
            setKeywords([...keywords, keyword]);
        }
        setDropdownOpen(false);
    };

    const removeKeyword = (keyword) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Gender Filter */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium mb-2 text-gray-800">Gender</p>
                    <div className="grid grid-cols-1 gap-2">
                        {genders.map((gender) => (
                            <button
                                key={gender.label}
                                className={`flex items-center gap-2 px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer w-full ${selectedGender === gender.label ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => setSelectedGender(gender.label)}
                            >
                                {gender.icon} {gender.label}
                                {selectedGender === gender.label && <TickFillIcon className="ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keywords Filter */}
                <div className="border border-gray-300 p-4 rounded-lg relative h-28" ref={dropdownRef}>
                    <p className="font-medium mb-2 text-gray-800">Keywords</p>

                    {/* Container for selected keywords */}
                    <div className="flex space-x-4">
                        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap max-h-[40px] min-h-[40px] px-2 scrollbar-hide">
                            {keywords.map((keyword) => (
                                <div key={keyword} className="flex items-center bg-[#CCE7FF] text-[#0087FF] px-3 py-1 rounded-full">
                                    {keyword}
                                    <button className="ml-2 text-gray-600" onClick={() => removeKeyword(keyword)}>×</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {
                                dropdownOpen
                                    ? <div className="border border-gray-300 rounded-lg p-1">
                                        <UpperArrowIcon />
                                    </div>
                                    : <div className="px-3 py-2 bg-[#0087FF] text-white rounded">
                                        +
                                    </div>
                            }
                        </button>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-xl w-full z-10 overflow-hidden border border-gray-300">
                            {keywordOptions.map((keyword) => (
                                <div key={keyword}
                                    className={`flex justify-between px-4 py-2 cursor-pointer hover:bg-[#CCE7FF] ${keywords.includes(keyword) ? "bg-[#CCE7FF]" : ""}`}
                                    onClick={() => handleKeywordSelect(keyword)}
                                >
                                    <span>{keyword}</span>
                                    <span>{keywords.includes(keyword) && <TickIcon size={4} />}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filters;

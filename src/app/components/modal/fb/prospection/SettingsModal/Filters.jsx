import { useState, useEffect, useRef } from "react";
import { BothGenderIcon, FemaleGenderIcon, MaleGenderIcon, TickFillIcon, UpperArrowIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";

const Filters = ({ keyWordList }) => {
    const { prospection, updateProspection } = SettingStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { gender: propGender, keyword } = prospection;

    const genders = [
        { label: "Male", value: "male", icon: <MaleGenderIcon /> },
        { label: "Female", value: "female", icon: <FemaleGenderIcon /> },
        { label: "Both", value: "both", icon: <BothGenderIcon /> }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleUpdate = (field, value) => {
        updateProspection({
            ...prospection,
            [field]: value
        });
        setDropdownOpen(false);
    };

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

    const updatedKeywordList = [
        { id: "none", name: "None" },
        ...(Array.isArray(keyWordList) ? keyWordList : [])
    ];


    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{t("prospecting.Filters")}</h2>

            <div className="grid grid-cols-2 gap-4">
                {/* Gender Filter */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium mb-2 text-gray-800">{t("prospecting.Gender")}</p>
                    <div className="grid grid-cols-1 gap-2">
                        {genders.map((gender) => (
                            <button
                                key={gender.value}
                                className={`relative flex items-center gap-2 px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer w-full ${propGender === gender.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                                onClick={() => handleUpdate("gender", gender.value)}
                            >
                                {gender.icon} {gender.label}
                                {propGender === gender.value && (
                                    <span className="absolute -right-2 -top-2">
                                        <TickFillIcon />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keywords Dropdown Filter */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="font-medium text-gray-800 mb-2 flex items-center">Keyword</p>
                    <div className="relative">
                        <button
                            className="flex justify-between items-center px-4 py-3 rounded-md border text-[#0087FF] w-full cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            {keyword ? updatedKeywordList.find(k => k.id === keyword)?.name : "Select Keyword"}
                            <UpperArrowIcon className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {dropdownOpen && (
                            <div ref={dropdownRef} className="absolute w-full bg-white border border-[#DADADA] mt-2 rounded-md shadow-md z-10">
                                {updatedKeywordList.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`relative flex items-center justify-between px-4 py-3 rounded-md cursor-pointer w-full ${keyword === option.id ? "bg-[#CCE7FF] border-[#DADADA]" : "bg-white border-[#0087FF]"}`}
                                        onClick={() => handleUpdate("keyword", option.id)}
                                    >
                                        {option.name}
                                        {keyword === option.id && (
                                            <span className="absolute right-2">
                                                <TickFillIcon />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Filters.propTypes = {
    keyWordList: PropTypes.object,
};

export default Filters;

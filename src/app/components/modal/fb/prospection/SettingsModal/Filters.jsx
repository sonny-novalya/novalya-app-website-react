import { useState, useEffect, useRef } from "react";
import { BothGenderIcon, FemaleGenderIcon, MaleGenderIcon, TickFillIcon, UpperArrowIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import SettingStore from "../../../../../../store/prospection/settings-store";
import PropTypes from "prop-types";

const Filters = ({ keyWordList, postType }) => {
    const { prospection, updateProspection } = SettingStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { gender: propGender, keyword, post_target } = prospection;

    const genders = [
        { label: t("prospecting.Male"), value: "male", icon: <MaleGenderIcon /> },
        { label: t("prospecting.Female"), value: "female", icon: <FemaleGenderIcon /> },
        { label: t("prospecting.Both"), value: "both", icon: <BothGenderIcon /> }
    ];

    const PostTargetData = [
        {
            label: "Comment",
            value: "Comment"
        },
        {
            label: "Like",
            value: "Like"
        }
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
            <h2 className="text-[24px] font-[500] mb-5">{t("prospecting.Filters")}</h2>

            <div className="grid grid-cols-2 gap-5">
                {/* Gender Filter */}
                <div className="border border-gray-300 px-4 pt-3 pb-5 rounded-lg">
                    <p className="font-medium text-[20px] mb-3 text-gray-800">{t("prospecting.Gender")}</p>
                    <div className="grid grid-cols-1 gap-3">
                        {genders.map((gender) => (
                            <button
                                key={gender.value}
                                className={`relative flex justify-center min-h-[52px] rounded-[10px] items-center gap-1 px-4 py-3 border text-[#0087FF] cursor-pointer w-full ${propGender === gender.value ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
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
                {
                    postType && !["post", "post-like"].includes(postType.toString().toLowerCase())
                        ?
                        <div className="border border-gray-300 px-4 pt-3 pb-5 rounded-lg">
                            <p className="font-[500] text-[20px] text-gray-800 mb-3 flex items-center">{t("prospecting.Keywords")}</p>
                            <div className="relative">
                                <button
                                    className="flex justify-between items-center px-4 py-3 rounded-[10px] border text-[#0087FF] w-full cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    {keyword && updatedKeywordList.find(k => k.id == keyword)?.name || "Select Keyword"}
                                    <UpperArrowIcon className={`transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {dropdownOpen && (
                                    <div ref={dropdownRef} className="absolute w-full bg-white border border-[#DADADA] mt-2 rounded-md shadow-md z-10">
                                        {updatedKeywordList.map((option) => {
                                            const isSelected = (option.id === "none" && keyword === null) || keyword === option.id;
                                            const valueToUpdate = option.id === "none" ? null : option.id;

                                            return (
                                                <button
                                                    key={option.id}
                                                    className={`relative flex items-center justify-between px-4 py-3 rounded-md cursor-pointer w-full ${isSelected ? "bg-[#CCE7FF] border-[#DADADA]" : "bg-white border-[#0087FF]"}`}
                                                    onClick={() => handleUpdate("keyword", valueToUpdate)}
                                                >
                                                    {option.name}
                                                    {isSelected && (
                                                        <span className="absolute right-2">
                                                            <TickFillIcon />
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <div className="border border-gray-300 p-4 rounded-lg mb-4">
                            <p className="font-medium text-gray-800 mb-2 flex items-center">
                                Which one to Target ?
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                {PostTargetData.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`relative flex items-center justify-center px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${post_target == option.value
                                            ? "bg-[#CCE7FF] border-[#CCE7FF]"
                                            : "bg-white border-[#0087FF]"
                                            }`}
                                        onClick={() => updateProspection({
                                            ...prospection,
                                            post_target: option.value
                                        })}
                                    >
                                        {option.label}
                                        {post_target === option.value && (
                                            <span className="absolute -right-2 -top-2">
                                                <TickFillIcon />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

Filters.propTypes = {
    keyWordList: PropTypes.array,
    postType: PropTypes.string,
    onComplete: PropTypes.func,
};

export default Filters;
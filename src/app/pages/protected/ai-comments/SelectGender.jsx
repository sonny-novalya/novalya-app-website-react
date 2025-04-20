import { useState } from "react";
import { FemaleGenderActiveIcon, FemaleGenderIcon, MaleGenderActiveIcon, MaleGenderIcon } from "../../common/icons/icons";

const SelectGender = () => {
    const [gender, setGender] = useState("male");

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[20px] font-[500] mb-5">
                Select Your Gender
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.0026 14.1666C11.4084 14.1666 14.1693 11.4057 14.1693 7.99992C14.1693 4.59416 11.4084 1.83325 8.0026 1.83325C4.59685 1.83325 1.83594 4.59416 1.83594 7.99992C1.83594 11.4057 4.59685 14.1666 8.0026 14.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"/>
                    <path d="M8 7.87524V11.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"/>
                    <path d="M8.00521 6.45866C8.46545 6.45866 8.83854 6.08556 8.83854 5.62533C8.83854 5.16509 8.46545 4.79199 8.00521 4.79199C7.54497 4.79199 7.17188 5.16509 7.17188 5.62533C7.17188 6.08556 7.54497 6.45866 8.00521 6.45866Z" fill="black" fill-opacity="0.75"/>
                </svg>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setGender("male")}
                    className={`flex items-center justify-center space-x-3 px-4 py-2.5 border rounded-[6px] cursor-pointer w-[120px]  
            ${gender === "male" ? "border-[#0087FF] text-white bg-[#0087FF]" : "border-[#0087FF] text-[#0087FF]"}`}
                >
                    {
                        gender === "male" 
                        ? <MaleGenderActiveIcon />
                        : <MaleGenderIcon />
                    }
                    <span className="text-[14px]">Male</span>
                </button>
                <button
                    onClick={() => setGender("female")}
                    className={`flex items-center justify-center space-x-2 px-4 py-2 border rounded-[6px] cursor-pointer w-[120px]  
            ${gender === "female" ? "border-[#0087FF] text-white bg-[#0087FF]" : "border-[#0087FF] text-[#0087FF]"}`}
                >
                    {
                        gender === "female" 
                            ? <FemaleGenderActiveIcon />
                            : <FemaleGenderIcon />
                    }
                    <span className="text-[14px]">Female</span>
                </button>
            </div>
        </div>
    );
};

export default SelectGender;

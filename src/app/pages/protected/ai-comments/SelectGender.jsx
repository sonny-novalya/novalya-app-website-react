import { useState } from "react";
import { FemaleGenderActiveIcon, FemaleGenderIcon, MaleGenderActiveIcon, MaleGenderIcon } from "../../common/icons/icons";

const SelectGender = () => {
    const [gender, setGender] = useState("male");

    return (
        <div className="space-y-4">
            <div className="text-lg font-semibold">Select Your Gender</div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setGender("male")}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-md cursor-pointer  
            ${gender === "male" ? "border-[#0087FF] text-white bg-[#0087FF]" : "border-[#0087FF] text-[#0087FF]"}`}
                >
                    {
                        gender === "male" 
                        ? <MaleGenderActiveIcon />
                        : <MaleGenderIcon />
                    }
                    <span>Male</span>
                </button>
                <button
                    onClick={() => setGender("female")}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-md cursor-pointer   
            ${gender === "female" ? "border-[#0087FF] text-white bg-[#0087FF]" : "border-[#0087FF] text-[#0087FF]"}`}
                >
                    {
                        gender === "female" 
                            ? <FemaleGenderActiveIcon />
                            : <FemaleGenderIcon />
                    }
                    <span>Female</span>
                </button>
            </div>
        </div>
    );
};

export default SelectGender;

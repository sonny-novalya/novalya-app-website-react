import { t } from "i18next";
import { TickFillIcon } from "../../../common/icons/icons";

// eslint-disable-next-line react/prop-types
const AddTag = ({ selectedTag, setSelectedTag }) => {
    const tagOptions = ["Yes", "No"];

    return (
        <div className="border border-[#DADADA] px-4 pt-4 pb-3 rounded-[6px]">

            <div class="flex items-center gap-[6px] mb-4">
                <p className="text-xl mb-0 font-[500]">{t("prospecting.Do you want to add a tag?")}</p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"></path>
                    <path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"></path><path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"></path>
                </svg>
            </div>

            
            <div className="grid gap-2.5">
                {tagOptions.map((tag) => (
                    <button
                        key={tag}
                        type="default"
                        className={`relative flex items-center justify-between px-4 py-3 rounded-[10px] border text-[#0087FF] cursor-pointer ${selectedTag === tag ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                        onClick={() => setSelectedTag(tag)}
                    >
                        <span className="flex items-center space-x-2 mx-auto">
                            {tag}
                        </span>
                        {selectedTag === tag && (
                            <span className="absolute -top-1.5 -right-1.5">
                                <TickFillIcon />
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddTag;

import { TickFillIcon } from "../../../common/icons/icons";

// eslint-disable-next-line react/prop-types
const AddTag = ({ selectedTag, setSelectedTag }) => {
    const tagOptions = ["Yes", "No"];

    return (
        <div className="border border-[#DADADA] p-4 rounded-lg">
            <p className="font-medium mb-2">Do you want to add a tag?</p>
            <div className="grid gap-4">
                {tagOptions.map((tag) => (
                    <button
                        key={tag}
                        type="default"
                        className={`relative flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedTag === tag ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
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

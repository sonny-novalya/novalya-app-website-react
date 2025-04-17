/* eslint-disable react/prop-types */
import { FeedPostIcon, MessengerIcon, TickFillIcon } from "../../../common/icons/icons";

const WishTypeSelector = ({ selectedWishType, setSelectedWishType }) => {
    return (
        <div className="border border-[#DADADA] p-4 rounded-lg mb-4">
            <p className="font-medium mb-2">Select How You’d Like to Wish</p>
            <div className="flex w-full space-x-4">
                <button
                    type="default"
                    className={`relative w-1/2 flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedWishType === "message" ? "bg-[#CCE7FF] border-[#CCE7FF] " : "bg-white border-[#0087FF]"}`}
                    onClick={() => setSelectedWishType("message")}
                >
                    <span className="flex items-center space-x-2 mx-auto">
                        <MessengerIcon />
                        <span>Inbox Direct Messages</span>
                    </span>
                    {selectedWishType === "message" && (
                        <span className=" absolute -top-1.5 -right-1.5">
                            <TickFillIcon />
                        </span>
                    )}
                </button>

                <button
                    type="default"
                    className={`relative w-1/2 flex items-center justify-between px-4 py-3 rounded-md border text-[#0087FF] cursor-pointer ${selectedWishType === "feed" ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                    onClick={() => setSelectedWishType("feed")}
                >
                    <span className="flex items-center space-x-2 mx-auto">
                        <FeedPostIcon />
                        <span>Feed Post</span>
                    </span>
                    {selectedWishType === "feed" && (
                        <span className=" absolute -top-1.5 -right-1.5">
                            <TickFillIcon />
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default WishTypeSelector

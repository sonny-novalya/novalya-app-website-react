/* eslint-disable react/prop-types */
import { FeedPostIcon, MessengerIcon, TickFillIcon } from "../../../common/icons/icons";

const WishTypeSelector = ({ selectedWishType, setSelectedWishType }) => {
    return (
        <div className="border border-[#DADADA] px-4 pt-4 pb-6 rounded-lg mb-4">
            <div className="flex items-center gap-[6px] mb-4">
                <p className="text-xl mb-0">Select How You’d Like to Wish</p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.9987 13.1666C10.4045 13.1666 13.1654 10.4057 13.1654 6.99992C13.1654 3.59416 10.4045 0.833252 6.9987 0.833252C3.59294 0.833252 0.832031 3.59416 0.832031 6.99992C0.832031 10.4057 3.59294 13.1666 6.9987 13.1666Z" stroke="black" stroke-opacity="0.75" stroke-width="0.9"/>
                <path d="M7 6.87524V10.2086" stroke="black" stroke-opacity="0.75" stroke-linecap="round"/>
                <path d="M6.9974 5.45866C7.45763 5.45866 7.83073 5.08556 7.83073 4.62533C7.83073 4.16509 7.45763 3.79199 6.9974 3.79199C6.53716 3.79199 6.16406 4.16509 6.16406 4.62533C6.16406 5.08556 6.53716 5.45866 6.9974 5.45866Z" fill="black" fill-opacity="0.75"/>
                </svg>
            </div>
            <div className="flex w-full gap-7.5">
                <button
                    type="default"
                    className={`relative w-1/2 flex items-center justify-between px-4 py-2.5 rounded-md border text-[#0087FF] cursor-pointer ${selectedWishType === "message" ? "bg-[#CCE7FF] border-[#CCE7FF] " : "bg-white border-[#0087FF]"}`}
                    onClick={() => setSelectedWishType("message")}
                >
                    <span className="flex items-center space-x-2 mx-auto">
                        <MessengerIcon />
                        <span className="text-lg">Inbox Direct Messages</span>
                    </span>
                    {selectedWishType === "message" && (
                        <span className=" absolute -top-1.5 -right-1.5">
                            <TickFillIcon />
                        </span>
                    )}
                </button>

                <button
                    type="default"
                    className={`relative w-1/2 flex items-center justify-between px-4 py-2.5 rounded-md border text-[#0087FF] cursor-pointer ${selectedWishType === "feed" ? "bg-[#CCE7FF] border-[#CCE7FF]" : "bg-white border-[#0087FF]"}`}
                    onClick={() => setSelectedWishType("feed")}
                >
                    <span className="flex items-center space-x-2 mx-auto">
                        <FeedPostIcon />
                        <span className="text-lg">Feed Post</span>
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

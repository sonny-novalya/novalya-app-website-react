const FollowUpPanel = () => {
    return (
        <div className="bg-white rounded-[10px] p-4 h-full">
            <h4 className="font-[500] text-[24px] text-[#0087FF] mb-2.5">Software status</h4>
            <div className="rounded-[10px] bg-[#0087FF33] px-4 py-5">
                <div className="flex items-center justify-between mb-5">
                    <span className="text-[20px] font-[500]">Installed</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#21BF7C"/>
                    </svg>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <span className="text-[20px] font-[500">Latest version</span>
                    <span className="block w-5 h-5 rounded-full border-2 border-[#FF0000]"></span>
                </div>
                <button className="w-full bg-[#0087FF] text-white rounded px-2 py-2 text-[12px]">Update now</button>
            </div>
        </div>
    );
};

export default FollowUpPanel;
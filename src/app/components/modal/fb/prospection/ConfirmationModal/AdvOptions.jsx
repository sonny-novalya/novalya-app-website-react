const AdvOptions = () => {
    return (
        <main className="">
            <h2 className="font-medium text-lg">Advance Options</h2>
            <div className="flex justify-between border border-[#00000014] rounded-md p-4">
                <div className="flex flex-col flex-1 pr-4 space-y-2">
                    <h3 className="font-medium">Retarget same user</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">No</p>
                </div>
                <div className="border-l-2 border-[#00000014] px-5 space-y-2 flex-1">
                    <h3 className="font-medium">Existing conversation</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">No</p>
                </div>
            </div>
        </main>
    );
};

export default AdvOptions;

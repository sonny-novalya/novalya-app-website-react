
const Settings = () => {
    return (
        <main className="">
            <h2 className="font-medium text-lg">Settings</h2>
            <div className="flex justify-between border border-[#00000014] rounded-md p-4">
                <div className="flex flex-col flex-1 pr-4 space-y-2">
                    <h3 className="font-medium" >Strategy</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">Follow + Message</p>
                </div>
                <div className="border-x-2 border-[#00000014] px-5 space-y-2">
                    <h3 className="font-medium" >How many Requests</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">10</p>
                </div>
                <div className="flex-1 pl-4 space-y-2">
                    <h3 className="font-medium" >Interval</h3>
                    <div className="flex space-x-5 items-center">
                        <p className="whitespace-nowrap">2 to 4 Minutes</p>
                        <p className="w-full text-center border border-[#00000014] rounded-md p-2 ">Fast</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Settings;

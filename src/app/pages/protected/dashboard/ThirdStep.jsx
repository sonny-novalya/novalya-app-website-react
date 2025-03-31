import FacebookCard from "./FacebookCard";
import FollowUpPanel from "./FollowUpPanel";
import InstagramCard from "./InstagramCard";
import MonthlyUsage from "./MonthlyUSage";
import TargetedPromotion from "./TargetPromotion";

const ThirdStep = () => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col lg:flex-row gap-4">
                <FacebookCard />
                <InstagramCard />

                <div className="flex-1 bg-green-400 text-white rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Promote and get paid</h3>
                        <p className="mt-2 text-sm">
                            By sharing your affiliate link to others you get paid up to 60%. Share it to the world now.
                        </p>
                    </div>
                    <button className="mt-4 bg-white text-green-700 font-bold py-2 px-4 rounded shadow">
                        My Affiliate Links
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <div className="grid grid-cols-7 gap-5">
                    <div className="col-span-5 px-4">
                        <MonthlyUsage />
                        <TargetedPromotion />
                    </div>
                    <div className="col-span-2 h-full">
                        <FollowUpPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThirdStep;
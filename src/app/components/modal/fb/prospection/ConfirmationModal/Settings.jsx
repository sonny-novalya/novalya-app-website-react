import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
// import SettingStore from "../../../../../../store/prospection/settings-store";

const Settings = () => {

    // const { prospection, updateProspection } = SettingStore();
    // const handleClick = (field, value) => {
    //     updateProspection({
    //         ...prospection,
    //         [field]: value
    //     });
    // };
    return (
        <main className="">
            <div className="flex gap-3 items-center">
                <h2 className="font-medium text-lg">Settings</h2>
                <span 
                    className="cursor-pointer" 
                    // onClick={handleClick("step", 2)}
                    >
                    <EditIconSquaredIcon />
                </span>
            </div>
            <div className="flex justify-between border border-[#00000014] rounded-md p-4">
                <div className="flex flex-col flex-1 pr-4 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.Strategy")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">{t("prospecting.Follow + Message")}</p>
                </div>
                <div className="border-x-2 border-[#00000014] px-5 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.How many Requests")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">10</p>
                </div>
                <div className="flex-1 pl-4 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.Interval")}</h3>
                    <div className="flex space-x-5 items-center">
                        <p className="whitespace-nowrap">{t("prospecting.2 to 4 minutes")}</p>
                        <p className="w-full text-center border border-[#00000014] rounded-md p-2 ">Fast</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Settings;

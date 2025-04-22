import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
// import SettingStore from "../../../../../../store/prospection/settings-store";

const Settings = ({ stratagy, norequest, interval, handleOpen }) => {

    // const { prospection, updateProspection } = SettingStore();
    // const handleClick = (field, value) => {
    //     updateProspection({
    //         ...prospection,
    //         [field]: value
    //     });
    // };

    const strategies = [
        { value: 0, label: t("prospecting.Follow + Message") },
        { value: 1, label: t("prospecting.Message Only") },
    ];

    const intervalOptions = [
        { label: t("prospecting.Medium"), value: "1-3", time: "1 to 3 minutes" },
        { label: t("prospecting.Slow"), value: "3-5", time: "3 to 5 minutes" },
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
        { label: t("prospecting.Fast"), value: "2-4", time: t("prospecting.2 to 4 minutes") },
        { label: t("prospecting.Medium"), value: "4-6", time: t("prospecting.4 to 6 minutes") },
        { label: t("prospecting.Slow"), value: "6-10", time: t("prospecting.6 to 10 minutes") },
    ];

    const selectedInterval =  intervalOptions?.find((item) => item.value === interval)

    return (
        <main className="">
            <div className="flex gap-3 items-center">
                <h2 className="font-medium text-lg">Settings</h2>
                <span 
                    className="cursor-pointer" 
                    onClick={() => handleOpen(2)}>
                    <EditIconSquaredIcon />
                </span>
            </div>
            <div className="flex justify-between border border-[#00000014] rounded-md p-4">
                <div className="flex flex-col flex-1 pr-4 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.Strategy")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">
                        {
                            strategies?.find((item) => item.value === stratagy)?.label
                        }
                    </p>
                </div>
                <div className="border-x-2 border-[#00000014] px-5 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.How many Requests")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">{norequest}</p>
                </div>
                <div className="flex-1 pl-4 space-y-2">
                    <h3 className="font-medium" >{t("prospecting.Interval")}</h3>
                    <div className="flex space-x-5 items-center">
                        <p className="whitespace-nowrap">{selectedInterval?.time}</p>
                        <p className="w-full text-center border border-[#00000014] rounded-md p-2 ">{selectedInterval?.label}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

Settings.propTypes = {
    stratagy: PropTypes.number,
    norequest: PropTypes.string,
    interval: PropTypes.string,
    handleOpen: PropTypes.func,
};

export default Settings;

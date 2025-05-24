import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
// import SettingStore from "../../../../../../store/prospection/settings-store";

const Settings = ({ selectedStrategy, selectedRequest, selectedInterval, handleOpen }) => {

    const strategies = [
        { value: 1, label: t("prospecting.Message + Request") },
        { value: 0, label: t("prospecting.Message Only") },
    ];

    const intervalOptions = [
        { label: t("prospecting.Medium"), value: "1-3", time: t("prospecting.1 to 3 minutes") },
        { label: t("prospecting.Slow"), value: "3-5", time: t("prospecting.3 to 5 minutes") },
        { label: t("prospecting.Very Slow"), value: "10-15", time: t("prospecting.10 to 15 minutes") },
        { label: t("prospecting.Fast"), value: "2-4", time: t("prospecting.2 to 4 minutes") },
        { label: t("prospecting.Medium"), value: "4-6", time: t("prospecting.4 to 6 minutes") },
        { label: t("prospecting.Slow"), value: "6-10", time: t("prospecting.6 to 10 minutes") },
    ];

    const selectedIntervalData =  intervalOptions?.find((item) => item.value === selectedInterval)
    const selectedStratagy = strategies?.find((item) => item.value == selectedStrategy)?.label
    return (
        <main className="">
            <div className="flex gap-5 items-center mb-5">
                <h2 className="font-[500] text-[24px]">{t("prospecting.Settings")}</h2>
                <span 
                    className="cursor-pointer" 
                    onClick={() => handleOpen(2)}>
                    <EditIconSquaredIcon />
                </span>
            </div>
            <div className="flex justify-start border border-[#00000014] rounded-[6px] px-5 pt-3 pb-5">
                <div className="w-[35%] flex flex-col pr-6">
                    <h3 className="font-[500] text-[20px] mb-2" >{t("prospecting.Strategy")}</h3>
                    <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">
                        {selectedStratagy}
                    </p>
                </div>
                <div className="w-[24%] border-x-2 border-[#00000014] px-6">
                    <h3 className="text-center font-[500] text-[20px] mb-2" >{t("prospecting.How many Requests")}</h3>
                    <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">{selectedRequest}</p>
                </div>
                <div className="w-[30%] pl-6">
                    <h3 className="font-[500] text-[20px] mb-2" >{t("prospecting.Interval")}</h3>
                    <div className="flex space-x-3 items-center">
                        <p className="whitespace-nowrap text-[#808183]">{selectedIntervalData?.time}</p>
                        <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">{selectedIntervalData?.label}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

Settings.propTypes = {
    selectedStrategy: PropTypes.number,
    selectedRequest: PropTypes.string,
    selectedInterval: PropTypes.string,
    handleOpen: PropTypes.func,
};

export default Settings;

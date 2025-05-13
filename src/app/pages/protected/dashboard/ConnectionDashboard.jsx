import { Spin } from "antd";
import ConnectionFirstStep from "./ConnectionFirstStep";
import ConnectionSecondStep from "./ConnectionSecondStep";
import VideoSection from "./VideoSection";
import { t } from "i18next";
import PropTypes from "prop-types";

const ConnectionDashboard = ({
    isFbConnected,
    isIgConnected,
    isLoading,
    isExtConnected,
    handleHideConnection,
    loginUserData
}) => {
    // Button is enabled when either Facebook or Instagram is connected
    const shouldEnableButton = isExtConnected && (isFbConnected || isIgConnected);
    
    return (
        <div>
            <h3 className="text-[24px] font-[600] mb-5 pl-5 mt-1.5 tracking-[0.02em]">Hello {loginUserData?.firstname}</h3>
            <div className="bg-white p-5 rounded-[10px]">
                <div className="flex flex-col gap-6">
                    <h2 className="font-medium text-[24px]">{t("dashboard.Setup Your Account")}</h2>
                    <div className="grid grid-cols-2 gap-[20px]">
                        {isLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                                <Spin size="large" />
                            </div>
                        )}
                        <ConnectionFirstStep />
                        <VideoSection />
                    </div>
                </div>
                <div className="py-6.5 rounded-[10px] flex flex-col gap-3 relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                            <Spin size="large" />
                        </div>
                    )}
                    <ConnectionSecondStep />
                </div>
                <div className="flex justify-center items-center w-full mb-1.5">
                    <button id="confirm-dashboard-btn"
                        className={`flex items-center justify-center w-93.5 py-3 bg-blue-500 text-white rounded-md focus:outline-none cursor-pointer ${shouldEnableButton ? "" : "disable-confirm-dashboard-btn"
                            }`}
                        onClick={handleHideConnection}
                    >
                        {t("dashboard.Confirm")}
                    </button>
                </div>
            </div>
        </div>
    );
};

ConnectionDashboard.propTypes = {
    isFbConnected: PropTypes.bool,
    isIgConnected: PropTypes.bool,
    isLoading: PropTypes.bool,
    isExtConnected: PropTypes.bool,
    handleHideConnection: PropTypes.func,
    loginUserData: PropTypes.obj,
};

export default ConnectionDashboard;

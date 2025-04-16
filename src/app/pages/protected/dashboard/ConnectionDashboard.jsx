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
    handleHideConnection
}) => {
    // Button is enabled when either Facebook or Instagram is connected
    const shouldEnableButton = isExtConnected && (isFbConnected || isIgConnected);
    
    return (
        <div>
            <h3 className="text-lg font-bold mb-5">{`${t("dashboard.Hello")} Anima`}</h3>

            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <h2 className="font-medium text-lg">{t("dashboard.Setup Your Account")}</h2>
                <div className="flex gap-4 h-80 relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                            <Spin size="large" />
                        </div>
                    )}
                    <ConnectionFirstStep />
                    <VideoSection />
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex flex-col gap-3 relative">
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 opacity-50 z-50 rounded-lg">
                        <Spin size="large" />
                    </div>
                )}
                <ConnectionSecondStep />
            </div>

            <div className="flex justify-center items-center w-full mt-5">
                <button id="confirm-dashboard-btn"
                    className={`flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none cursor-pointer ${shouldEnableButton ? "" : "disable-confirm-dashboard-btn"
                        }`}
                    onClick={handleHideConnection}
                >
                    {t("dashboard.Confirm")}
                </button>
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
};

export default ConnectionDashboard;

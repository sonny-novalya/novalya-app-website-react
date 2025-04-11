import { useEffect } from "react"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store"
import { useExtensionStore } from "../../../../store/extension/extension-store"
import Layout from "../Layout"
import ConnectionFirstStep from "./ConnectionFirstStep"
import ConnectionSecondStep from "./ConnectionSecondStep"
import VideoSection from "./VideoSection"
import { useNavigate } from "react-router-dom"
import { Spin } from "antd"

const ConnectionDashboard = () => {
    const { fetchSocialAccounts, isFbConnected, isIgConnected, loading, error } = useSocialAccountsStore();
    const { isExtConnected, fetchExtInstalledStatus } = useExtensionStore()
    const shouldShowDashboard = isExtConnected && (isFbConnected || isIgConnected)
    const navigate = useNavigate() ;

    useEffect(() => {
        fetchSocialAccounts();
        fetchExtInstalledStatus()
    }, []);

    useEffect(() => {
        if (shouldShowDashboard) {
            navigate("/")
        }
    }, [shouldShowDashboard]);

    if (loading) 
        return <div className="w-full h-full flex items-center justify-center">
            <Spin />
        </div>;
    if (error) return "Alert";

    return (
        <Layout>
            <h3 className="text-lg font-bold mb-5">Hello Anima</h3>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <h2 className="font-medium text-lg">Setup Your Account</h2>
                <div className="flex gap-4 h-80">
                    <ConnectionFirstStep />
                    <VideoSection />
                </div>
            </div>
            <div className="bg-white p-3 rounded-lg flex flex-col gap-3">
                <ConnectionSecondStep />
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                <button
                    className={`flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 cursor-pointer ${shouldShowDashboard
                        ? "opacity-100"
                        : "opacity-60"
                        }`}
                    onClick={() => {
                        if (shouldShowDashboard) {
                            navigate("/")
                        }
                    }}
                    disabled={!shouldShowDashboard}
                >
                    Confirm
                </button>
            </div>
        </Layout>
    )
}

export default ConnectionDashboard

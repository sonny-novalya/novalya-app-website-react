import { useState } from "react"
import Layout from "../Layout"
import ConnectionDashboard from "./ConnectionDashboard"
import SocialDashboard from "./SocialDashboard"
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store"
import { useEffect } from "react"
import Loader from "../../../../helpers/Loader"

const NewDashboard = () => {
    const [iFbConnected, setIsFbConnected] = useState(false)
    const { fetchSocialAccounts, socialAccountsData, loading, error } = useSocialAccountsStore();

    const { facebook_data, instagram_data, limit_data } = socialAccountsData || {}

    useEffect(() => {
        fetchSocialAccounts();
    }, []);

    if (loading) return <Loader />;
    if (error) return "Alert";

    return (
        <Layout>
            {
                iFbConnected
                    ? <SocialDashboard 
                        facebook_data={facebook_data}
                        instagram_data={instagram_data}
                        limit_data={limit_data} />
                    : 
                    <>
                        <ConnectionDashboard />
                        <div className="flex justify-center items-center w-full mt-5">
                            <button className="flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 cursor-pointer"
                            onClick={()=> setIsFbConnected(true)}>
                                Confirm
                            </button>
                        </div>
                    </>
            }
        </Layout>
    )
}

export default NewDashboard

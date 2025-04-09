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
                    : <ConnectionDashboard />
            }
        </Layout>
    )
}

export default NewDashboard

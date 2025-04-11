import { useEffect } from "react";
import Layout from "../Layout";
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { useExtensionStore } from "../../../../store/extension/extension-store";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import MonthlyUsage from "./MonthlyUsage";
import TargetedPromotion from "./TargetPromotion";
import FollowUpPanel from "./FollowUpPanel";
import InstaEmptyCard from "./InstaEmptyCard";
import InstagramCard from "./InstagramCard";
import FacebookEmptyCard from "./FacebookEmptyCard";
import FacebookCard from "./FacebookCard";

const Dashboard = () => {
  const { isExtConnected, fetchExtInstalledStatus } = useExtensionStore()
  const { fetchSocialAccounts, socialAccountsData, loading, error, isFbConnected, isIgConnected } = useSocialAccountsStore();

  const navigate = useNavigate() ;
  const { facebook_data, instagram_data, limit_data } = socialAccountsData || {};
  
  const shouldShowDashboard = isExtConnected && (isFbConnected || isIgConnected)

  useEffect(() => {
    fetchSocialAccounts();
    fetchExtInstalledStatus()
  }, []);

  useEffect(() => {
    if(!shouldShowDashboard){
      navigate("/connection")
    } 
  }, [shouldShowDashboard]);

  if (loading)
    return <div className="w-full h-full flex items-center justify-center">
      <Spin />
    </div>;
  if (error) return "Alert";

  return (
    <Layout>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">My Social Networks</h3>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            {
              facebook_data
                ? <FacebookCard data={facebook_data} />
                : <FacebookEmptyCard />
            }

            {
              instagram_data
                ? <InstagramCard data={instagram_data} />
                : <InstaEmptyCard />
            }

            <div className="flex-1 bg-green-400 text-white rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">Promote and get paid</h3>
                <p className="mt-2 text-sm">
                  sharing_link_feature
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
                <MonthlyUsage data={limit_data} />
                <TargetedPromotion />
              </div>
              <div className="col-span-2 h-full">
                <FollowUpPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

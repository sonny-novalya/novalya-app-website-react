import { useState, useEffect } from "react";
import Layout from "../Layout";
import ConnectionDashboard from "./ConnectionDashboard";
import SocialDashboard from "./SocialDashboard";
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import Loader from "../../../../helpers/Loader";

const Dashboard = () => {
  const [isSocialDashboard, setIsSocialDashboard] = useState(false);
  const [facebookButtonDisabled, setFacebookButtonDisabled] = useState(false);
  const [instaButtonDisabled, setInstaButtonDisabled] = useState(false);

  const { fetchSocialAccounts, socialAccountsData, loading, error, planLimit } =
    useSocialAccountsStore();

  const { facebook_data, instagram_data, limit_data } = socialAccountsData || {};

  useEffect(() => {
    fetchSocialAccounts();
  }, []);

  useEffect(() => {
    if (planLimit?.new_packages?.connection_type === 1) {
      if (socialAccountsData.facebook_data) {
        setFacebookButtonDisabled(false);
        setInstaButtonDisabled(true);
      } else if (socialAccountsData.instagram_data) {
        setFacebookButtonDisabled(true);
        setInstaButtonDisabled(false);
      } else {
        setFacebookButtonDisabled(false);
        setInstaButtonDisabled(false);
      }
    } else {
      setFacebookButtonDisabled(false);
      setInstaButtonDisabled(false);
    }
  }, [
    socialAccountsData.facebook_data,
    socialAccountsData.instagram_data,
    planLimit,
  ]);

  if (loading) return <Loader />;
  if (error) return "Alert";

  return (
    <Layout>
      {
        isSocialDashboard ? (
          <SocialDashboard
            facebook_data={facebook_data}
            instagram_data={instagram_data}
            limit_data={limit_data}
          />
        ) : (
          <>
            <ConnectionDashboard />
            <div className="flex justify-center items-center w-full mt-5">
              <button
                className={`flex items-center justify-center w-96 py-1.5 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 cursor-pointer ${facebookButtonDisabled
                  ? "opacity-60"
                  : "opacity-100"
                  }`}
                onClick={() => setIsSocialDashboard(true)}
                disabled={facebookButtonDisabled}
              >
                Confirm
              </button>
            </div>
          </>
        )}
    </Layout>
  );
};

export default Dashboard;

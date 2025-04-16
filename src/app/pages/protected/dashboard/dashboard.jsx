import { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import ConnectionDashboard from "./ConnectionDashboard";
import SocialDashboard from "./SocialDashboard";
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { useExtensionStore } from "../../../../store/extension/extension-store";

const Dashboard = () => {
  const [connectionStep, setConnectionStep] = useState(false);
  const [facebookButtonDisabled, setFacebookButtonDisabled] = useState(false);
  const [instaButtonDisabled, setInstaButtonDisabled] = useState(false);
  const { isExtConnected, fetchExtInstalledStatus } = useExtensionStore();

  const { fetchSocialAccounts, socialAccountsData, isFbConnected, isIgConnected, loading, error, planLimit, isDataFetched } = useSocialAccountsStore();

  const { facebook_data, instagram_data, limit_data } = socialAccountsData || {};

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchSocialAccounts();
      fetchExtInstalledStatus();
      hasFetched.current = true; 
    }
  }, [fetchSocialAccounts, fetchExtInstalledStatus]); 

  useEffect(() => {
    if (planLimit?.new_packages?.connection_type === 1) {
      if (isFbConnected) {
        setFacebookButtonDisabled(false);
        setInstaButtonDisabled(true);
      } else if (isIgConnected) {
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
    console.log("step", isDataFetched, isExtConnected, isFbConnected, isIgConnected, facebook_data)


    if(isDataFetched){
      if(isExtConnected && (isFbConnected || isIgConnected)){
        console.log("stats")
        setConnectionStep(false)
      }else{
        console.log("Initial")
        setConnectionStep(true)
      }
    }

     
  }, [isIgConnected, isFbConnected, planLimit, isExtConnected, isDataFetched]);

  const handleShowConnection = () => setConnectionStep(true);
  const handleHideConnection = () => setConnectionStep(false);
  const confirmNextScreen = () => {
    moveToTop();
    fetchSocialAccounts();
    setConnectionStep(false);
  }

  const moveToTop = () => {
    console.log("move")
    // window.scrollTo({ top: 0, behavior: "smooth" });
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;
  }
  if (error) return "Alert";

  return (
    <Layout>
      {connectionStep ? (
        <ConnectionDashboard
          isLoading={loading}
          isFbConnected={isFbConnected}
          isIgConnected={isIgConnected}
          isExtConnected={isExtConnected}
          facebookButtonDisabled={facebookButtonDisabled}
          instaButtonDisabled={instaButtonDisabled}
          handleHideConnection={confirmNextScreen}
        />
      ) : (
        <SocialDashboard
          facebook_data={facebook_data}
          instagram_data={instagram_data}
          limit_data={limit_data}
          isLoading={loading}
          handleShowConnection={handleShowConnection}
        />
      )}
    </Layout>
  );
};

export default Dashboard;

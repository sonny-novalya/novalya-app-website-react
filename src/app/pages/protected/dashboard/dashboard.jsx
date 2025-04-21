import { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import ConnectionDashboard from "./ConnectionDashboard";
import SocialDashboard from "./SocialDashboard";
import { useSocialAccountsStore } from "../../../../store/dashboard/dashboard-store";
import { useExtensionStore } from "../../../../store/extension/extension-store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [connectionStep, setConnectionStep] = useState(false);
  const [facebookButtonDisabled, setFacebookButtonDisabled] = useState(false);
  const [instaButtonDisabled, setInstaButtonDisabled] = useState(false);
  const { isExtConnected, fetchExtInstalledStatus } = useExtensionStore();

  const { fetchSocialAccounts, socialAccountsData, isFbConnected, isIgConnected, loading, error, planLimit, isDataFetched } = useSocialAccountsStore();

  const { facebook_data, instagram_data, limit_data } = socialAccountsData || {};

  const hasFetched = useRef(false);
  const  islogged =localStorage.getItem("loggedin")
 
  

  const navigate = useNavigate()

  
 

  useEffect(() => {
    if (!hasFetched.current) {
      fetchSocialAccounts();
      fetchExtInstalledStatus();
      hasFetched.current = true; 
    }
    if(islogged){
      navigate('/?loggedin=true')
      localStorage.removeItem("loggedin")
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


    if(isDataFetched){
      if(isExtConnected && (isFbConnected || isIgConnected)){
        setConnectionStep(false)
      }else{
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

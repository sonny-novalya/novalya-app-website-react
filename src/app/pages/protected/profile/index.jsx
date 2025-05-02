import { useEffect, useState } from 'react';
import Layout from '../Layout';
import BillingDetails from './BillingDetails';
import Invoice from './Invoice';
import Password from './Password';
import ProfileComponent from './ProfileComponent';
import useLoginUserDataStore from '../../../../store/loginuser/loginuserdata';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile Page");
  const { loginUserData, fetchLoginUserData, loading } = useLoginUserDataStore();

  if (!loginUserData) return 
  
  const renderContent = () => {
    switch (activeTab) {
      case "Profile Page":
        return <ProfileComponent loginUserData={loginUserData} userDataLoading={loading} />;
      case "Password":
        return <Password userMail={loginUserData?.email} />;
      case "Billing details":
        return <BillingDetails />;
      case "Invoice":
        return <Invoice />;
      default:
        return null;
    }
  };

  const tabs = ["Profile Page", "Password", "Billing details", "Invoice"];

  useEffect(() => {
    fetchLoginUserData({})
  }, [])

  return (
    <Layout>
        <h3 className="text-[24px] font-[600] mb-5 pl-5 mt-1.5 tracking-[0.02em]">
          Profile
        </h3>
        <div className='p-4 rounded-md bg-white'>

          <div className="flex space-x-4 ">
            {tabs.map((tab, index) => {
              return <div className='flex flex-col' key={index}>
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md border bg-white cursor-pointer 
                ${activeTab === tab ? "border-[#0087FF33] text-[#0087FF] border-b-0 rounded-b-none" : "border-[#DADADA] text-black"}`}
                >
                  {tab}
                </button>
                <div
                  key={tab + "-div"}
                  className={` h-4 
                ${activeTab === tab ? "bg-white visible border-x border-[#0087FF33]" : "invisible border-none"}`}
                ></div>
              </div>
            })}
          </div>

          <div className=''>
            {renderContent()}
          </div>
        </div>
    </Layout>
  );
};

export default Profile;

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

  useEffect(() => {
    fetchLoginUserData({});
  }, []);

  if (!loginUserData) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "Profile Page":
        return <ProfileComponent loginUserData={loginUserData} userDataLoading={loading} />;
      case "Password":
        return <Password userMail={loginUserData?.email} />;
      case "Billing details":
        return <BillingDetails userMail={loginUserData?.email} />;
      case "Invoice":
        return <Invoice userMail={loginUserData?.email} />;
      default:
        return null;
    }
  };

  const tabs = [
    "Profile Page",
    "Password",
    "Billing details",
    "Invoice"
  ];

  return (
    <Layout>
      <h3 className="text-[24px] font-[600] mb-5 pl-5 mt-1.5 tracking-[0.02em]">
        Profile
      </h3>
      <div className='p-4 rounded-md bg-white'>
        <div className="flex space-x-4">
          {tabs.map((name, index) => {
            const isActive = activeTab === name;

            return (
              <div className='flex flex-col' key={index}>
                <button
                  onClick={() => setActiveTab(name)}
                  className={`px-4 py-2 rounded-md border bg-white cursor-pointer  
                    ${isActive
                      ? "border-[#0087FF33] text-[#0087FF] border-b-0 rounded-b-none"
                      : "border-[#DADADA] text-black"}`}
                >
                  {name}
                </button>
                <div
                  className={`h-4 ${isActive ? "bg-white visible border-x border-[#0087FF33]" : "invisible border-none"}`}
                ></div>
              </div>
            );
          })}
        </div>

        <div>
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

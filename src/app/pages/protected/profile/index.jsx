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
        return <BillingDetails userMail = {loginUserData?.email}  />;
      case "Invoice":
        return <Invoice userMail={loginUserData?.email} />;
      default:
        return null;
    }
  };

  const tabs = [
    { name: "Profile Page", disabled: false },
    { name: "Password", disabled: false },
    { name: "Billing details", disabled: true },
    { name: "Invoice", disabled: false }
  ];
  
  useEffect(() => {
    fetchLoginUserData({})
  }, [])

  return (
    <Layout>
        <h3 className="text-[24px] font-[600] mb-5 pl-5 mt-1.5 tracking-[0.02em]">
          Profile
        </h3>
        <div className='p-4 rounded-md bg-white'>

        <div className="flex space-x-4">
          {tabs.map((tabObj, index) => {
            const { name, disabled } = tabObj;
            const isActive = activeTab === name;

            return (
              <div className='flex flex-col' key={index}>
                <button
                  onClick={() => {
                    if (!disabled) setActiveTab(name);
                  }}
                  className={`px-4 py-2 rounded-md border bg-white 
                      ${disabled ? "cursor-not-allowed text-gray-400 border-[#DADADA]"
                      : isActive ? "border-[#0087FF33] text-[#0087FF] border-b-0 rounded-b-none cursor-pointer"
                      : "border-[#DADADA] text-black cursor-pointer"}`}
                  disabled={disabled}
                >
                  {name}
                </button>
                <div
                  className={`h-4 ${isActive && !disabled ? "bg-white visible border-x border-[#0087FF33]" : "invisible border-none"}`}
                ></div>
              </div>
            );
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

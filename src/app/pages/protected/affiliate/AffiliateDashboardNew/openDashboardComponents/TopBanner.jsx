import { useState } from 'react';
import { LockAffiliateIcon, TickIconLargeIcon } from '../../../../common/icons/icons';
import { message } from 'antd';
import UnlockAgreementModal from '../UnlockAgreementModal';
import useLoginUserDataStore from '../../../../../../store/loginuser/loginuserdata';
import useAffiliateStore from '../../../../../../store/affiliate/affiliate';


const TopBanner = () => {

    const {becomeAffiliate,openAgreementModal,setOpenAgreementModal}=useAffiliateStore()
    const {loginUserData}=useLoginUserDataStore()

    const features = [
        "Custom Funnels & Email Campaigns",
        "Private Bonuses & Advanced Trainings",
        "Personalized Dashboard & Affiliate Tools",
        "Customized Affiliate Code"
    ];

  

    const handleUnlock = () => {
        setOpenAgreementModal(true);
    };

    const handleProceed = async () => {
        const data = {
                customerid: loginUserData?.customerid,
                item_price_id: 'Affiliate-Fee-EUR-Yearly',
              }
        const res = await becomeAffiliate(data)
     
        if (res.status === 200) {
            message.success('Processing Affiliate PRO subscription');
            window.location.href = res?.data?.data?.hosted_page?.url
            setOpenAgreementModal(false);
        }

      
    };

    return (
        <>
            <div className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded-lg text-white mb-8 flex items-center h-[350px] space-x-20 justify-center">
                <div className="space-y-3 w-96">
                    <div className="flex items-center gap-3">
                        <div>
                            <LockAffiliateIcon />
                        </div>
                        <h3 className="text-[44px] font-bold">Become an Affiliate PRO</h3>
                    </div>
                    <p className="text-white/90 text-2xl">
                        Unlock exclusive tools to scale your commissions like a pro.
                    </p>
                </div>

                <div className="space-y-3">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <TickIconLargeIcon />
                            <span className='text-[22px]'>{feature}</span>
                        </div>
                    ))}
                    <div className="mt-10">
                        <button
                            className="bg-white text-[#005199] font-medium px-6 py-2 rounded hover:bg-white/90 transition-colors"
                            onClick={handleUnlock}
                        >
                            Unlock for $60/year
                        </button>
                    </div>
                </div>
            </div>

            {/* Affiliate Agreement Modal */}
            <UnlockAgreementModal
                visible={openAgreementModal}
                onCancel={() => setOpenAgreementModal(false)}
                onProceed={handleProceed}
            />
        </>
    );
};

export default TopBanner;
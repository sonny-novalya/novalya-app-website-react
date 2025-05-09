import { LockAffiliateIcon, TickIconLargeIcon } from '../../../../common/icons/icons';

const TopBanner = () => {
    const features = [
        "Custom Funnels & Email Campaigns",
        "Private Bonuses & Advanced Trainings",
        "Personalized Dashboard & Affiliate Tools",
        "Customized Affiliate Code"
    ];

    return (
        <div className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded-lg text-white mb-8 flex items-center h-[350px] space-x-20 justify-center">
            <div className="space-y-3 w-96">
                <div className="flex items-center gap-3">
                    <div>
                        <LockAffiliateIcon />
                    </div>
                    <h3 className="text-[44px] font-bold">Become an Affiliate PRO</h3>
                </div>
                <p className="text-white/90 text-2xl ">
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
                    <button className="bg-white text-[#005199] font-medium px-6 py-2 rounded hover:bg-white/90 transition-colors">
                        Unlock for $60/year
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopBanner
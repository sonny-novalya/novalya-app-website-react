import { Modal } from "antd";
import useUpgradeModalStore from "../../../../../store/modals/UpgradeToPro";
import useAffiliateStore from "../../../../../store/affiliate/affiliate";

const UpgradeToProModal = () => {
    const { isVisible, hideModal } = useUpgradeModalStore();
    const {setOpenAgreementModal}=useAffiliateStore()


    return (
        <Modal
            open={isVisible}
            onCancel={hideModal}
            footer={null}
            width={700}
            centered
            closeIcon={null}
        >
                <div className="flex flex-col items-center p-6">
                    {/* Info Icon */}
                <svg width="75" height="74" viewBox="0 0 75 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.5685 71.2268C56.4951 71.2268 71.8382 55.8838 71.8382 36.9572C71.8382 18.0306 56.4951 2.6875 37.5685 2.6875C18.6419 2.6875 3.29883 18.0306 3.29883 36.9572C3.29883 55.8838 18.6419 71.2268 37.5685 71.2268Z" stroke="#0087FF" strokeOpacity="0.75" strokeWidth="4.89567" />
                    <path d="M37.5742 36.2637V54.7878" stroke="#0087FF" strokeOpacity="0.75" strokeWidth="7.3435" strokeLinecap="round" />
                    <path d="M37.5568 28.3988C40.1145 28.3988 42.1879 26.3254 42.1879 23.7678C42.1879 21.2101 40.1145 19.1367 37.5568 19.1367C34.9992 19.1367 32.9258 21.2101 32.9258 23.7678C32.9258 26.3254 34.9992 28.3988 37.5568 28.3988Z" fill="#0087FF" fillOpacity="0.75" />
                </svg>


                    {/* Title */}
                    <h2 className="text-2xl font-medium text-center my-6 tracking-wide">
                        This Feature is Available for Affiliate Pro
                    </h2>

                    {/* Buttons */}
                    <div className="flex w-full gap-4 px-10">
                        <button
                        className="flex-1 bg-gradient-to-r from-[#005199] to-[#0087FF] textOWhite py-3 px-4 rounded-md text-white font-medium"
                        onClick={()=>{
                            setOpenAgreementModal(true)
                            hideModal()
                            }}
                        >
                            Upgrade
                        </button>
                        <button
                            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-md font-medium"
                            onClick={hideModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
    );
};

export default UpgradeToProModal;
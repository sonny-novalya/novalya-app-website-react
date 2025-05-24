import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const AdvOptions = ({ existingConvo, reTargetSameUser, handleOpen }) => {
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === 'ig'

    return (
        <main className="">
            <div className="flex gap-5 items-center mb-5">
                <h2 className="font-[500] text-[24px]">{t("prospecting.Advance Options")}</h2>
                <span
                    className="cursor-pointer"
                    onClick={() => handleOpen(isInstagram ? 3 : 4)}>
                    <EditIconSquaredIcon />
                </span>
            </div>
            <div className="flex justify-start border border-[#00000014] rounded-[6px] px-5 pt-3 pb-5">
                <div className="w-[35%] flex flex-col pr-6">
                    <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Retarget same user")}</h3>
                    <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">
                        {reTargetSameUser}
                    </p>
                </div>
                <div className="bg-[#00000014] w-[1px]"></div>
                <div className="w-[45%] flex flex-col pl-6">
                    <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Existing conversation")}</h3>
                    <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">{existingConvo === 1 ? t("prospecting.Yes") : t("prospecting.No")}</p>
                </div>
            </div>
        </main>
    );
};

AdvOptions.propTypes = {
    existingConvo: PropTypes.number,
    reTargetSameUser: PropTypes.string,
    handleOpen: PropTypes.func,
};

export default AdvOptions;

import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const AdvOptions = ({ pro_convo, prospect, handleOpen }) => {
    const location = useLocation();
    const isInstagram = location.pathname.split("/")[1] === 'ig'

    return (
        <main className="">
            <div className="flex gap-3 items-center">
                <h2 className="font-medium text-lg">{t("prospecting.Advance Options")}</h2>
                <span
                    className="cursor-pointer"
                    onClick={() => handleOpen(isInstagram ? 3 : 4)}>
                    <EditIconSquaredIcon />
                </span>
            </div>
            <div className="flex justify-between border border-[#00000014] rounded-md p-4">
                <div className="flex flex-col flex-1 space-y-2 pr-5">
                    <h3 className="font-medium">{t("prospecting.Retarget same user")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2 capitalize">
                        {prospect}
                    </p>
                </div>
                <div className="bg-[#00000014] w-[1px] mx-4"/>
                <div className=" space-y-2 flex-1">
                    <h3 className="font-medium">{t("prospecting.Existing conversation")}</h3>
                    <p className="w-full text-center border border-[#00000014] rounded-md p-2">{pro_convo === 1 ? t("prospecting.Yes") : t("prospecting.No")}</p>
                </div>
            </div>
        </main>
    );
};

AdvOptions.propTypes = {
    pro_convo: PropTypes.number,
    prospect: PropTypes.string,
    handleOpen: PropTypes.func,
};

export default AdvOptions;

import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";

const Filters = ({ gender, keyword, handleOpen }) => {
  
  return (
    <main className="">
      <div className="flex gap-3 items-center">
        <h2 className="font-medium text-lg">{t("prospecting.Filters")}</h2>
        <span 
          className="cursor-pointer"
          onClick={() => handleOpen(3)}>
            <EditIconSquaredIcon />
          </span>
      </div>
      <div className="flex justify-between border border-[#00000014] rounded-md p-4">
        <div className="flex flex-col flex-1 pr-4 space-y-2">
          <h3 className="font-medium">{t("prospecting.Gender")}</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2">
            {/* {gender} */}
            {t(`prospecting.${gender.charAt(0).toUpperCase() + gender.slice(1)}`)}
          </p>
        </div>
        <div className="border-l-2 border-[#00000014] px-5 space-y-2 flex-1">
          <h3 className="font-medium">{t("prospecting.Keywords")}</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2">
            {keyword}
          </p>
        </div>
      </div>
    </main>
  );
};

Filters.propTypes = {
  gender: PropTypes.string,
  keyword: PropTypes.string,
  handleOpen: PropTypes.func,
};

export default Filters;

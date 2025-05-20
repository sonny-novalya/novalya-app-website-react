import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";

const Filters = ({ gender, keyword, postTarget, handleOpen, postType }) => {
  
  return (
    <main className="">
      <div className="flex gap-5 items-center mb-5">
        <h2 className="font-[500] text-[24px]">{t("prospecting.Filters")}</h2>
        <span 
          className="cursor-pointer"
          onClick={() => handleOpen(3)}>
            <EditIconSquaredIcon />
          </span>
      </div>
      <div className="flex justify-start border border-[#00000014] rounded-[6px] px-5 pt-3 pb-5">
        <div className="w-[35%] flex flex-col pr-6">
          <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Gender")}</h3>
          <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2 capitalize">
            {gender}
          </p>
        </div>
        {
          postType && !["post", "post-like"].includes(postType.toString().toLowerCase()) 
          ? <div className="w-[22%] border-l-2 border-[#00000014] pl-6">
            <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Keywords")}</h3>
            <p className="leading-none text-center flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">
              {keyword}
            </p>
          </div>
            : <div className="w-[22%] flex flex-col pr-6 space-y-2">
              <h3 className="font-[500] text-[20px] mb-2">Which one to target?</h3>
              <p className="leading-none text-center flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2 capitalize">
                {postTarget}
              </p>
            </div>
        }
      </div>
    </main>
  );
};

Filters.propTypes = {
  gender: PropTypes.string,
  keyword: PropTypes.string,
  postType: PropTypes.string,
  postTarget: PropTypes.string,
  handleOpen: PropTypes.func,
};

export default Filters;

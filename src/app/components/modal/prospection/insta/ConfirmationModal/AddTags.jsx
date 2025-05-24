import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const AddTags = ({ action = 'no', CRMList, handleOpen }) => {

  let parsedAction;
  try {
    parsedAction = action !== 'no' ? JSON.parse(action) : 'no';
  } catch (error) {
    console.error('Error parsing action:', error);
    parsedAction = 'no';
  }

  const isNoAction =
    parsedAction === "no" ||
    (parsedAction &&
      parsedAction.moveGroupId === null &&
      parsedAction.moveStageId === null &&
      parsedAction.stage_num === null);
      
  const actionType = isNoAction ? "no" : "yes";

  const selectedGroupData = CRMList.find((item) => item.id == parsedAction?.moveGroupId);
  const stageData = selectedGroupData?.stage?.find((item) => item.id == parsedAction?.moveStageId);
  const StageName = stageData?.name || "Stage 1";

  return (
    <main className="">
      <div className="flex gap-5 items-center mb-5">
        <h2 className="font-[500] text-[24px]">{t("prospecting.Add Tags")}</h2>
        <span
          className="cursor-pointer"
          onClick={() => handleOpen(4)}>
          <EditIconSquaredIcon />
        </span>
      </div>
      <div className="flex justify-start border border-[#00000014] rounded-[6px] px-5 pt-3 pb-5">
        <div className="w-[35%] flex flex-col pr-6">
          <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Do you want to add a tag?")}</h3>
          <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2 capitalize">
            {actionType}
          </p>

        </div>
        {actionType === 'no'
          ? <div />
          : <div className="w-[45%] border-l-2 border-[#00000014] px-5">
            <h3 className="font-[500] text-[20px] mb-2">{t("prospecting.Select Group")}</h3>
            <div className="flex gap-6">
              <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">{selectedGroupData?.name || "Group Name"}</p>
              <p className="flex justify-center items-center w-full border border-[#DBDBDB] text-[#808183] min-h-[50px] rounded-[10px] p-2">{StageName}</p>
            </div>
          </div>
        }
      </div>
    </main>
  );
};

AddTags.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleOpen: PropTypes.func,
  CRMList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      stage: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default AddTags;

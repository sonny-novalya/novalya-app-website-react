import { t } from "i18next";
import { EditIconSquaredIcon } from "../../../../../pages/common/icons/icons";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const AddTags = ({ action = 'no', CRMList, handleOpen }) => {
  const location = useLocation();
  const isInstagram = location.pathname.split("/")[1] === 'ig'

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
      <div className="flex gap-3 items-center">
        <h2 className="font-medium text-lg">{t("prospecting.Add Tags")}</h2>
        <span
          className="cursor-pointer"
          onClick={() => handleOpen(isInstagram ? 4 : 5)}>
          <EditIconSquaredIcon />
        </span>
      </div>
      <div className="flex justify-between border border-[#00000014] rounded-md p-4">
        <div className="flex flex-col flex-1 pr-4 space-y-2">
          <h3 className="font-medium">{t("prospecting.Do you want to add a tag?")}</h3>
          <p className="w-full text-center border border-[#00000014] rounded-md p-2 capitalize">
            {actionType}
          </p>

        </div>
        {actionType === 'no'
          ? <div />
          : <div className="border-l-2 border-[#00000014] px-5 space-y-2 flex-1">
            <h3 className="font-medium">{t("prospecting.Select Group")}</h3>
            <div className="flex space-x-2">
              <p className="w-full text-center border border-[#00000014] rounded-md p-2">{selectedGroupData?.name || "Group Name"}</p>
              <p className="w-full text-center border border-[#00000014] rounded-md p-2">{StageName}</p>
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

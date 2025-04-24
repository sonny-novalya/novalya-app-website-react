import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { TwoUsersIcon } from "../../../common/icons/icons";
import { t } from "i18next";

const TopbarRightSection = ({ companyName, leadsCount, onAddStage, setSortedStages, selectedGrpData }) => {
    // const [searchValue, setSearchValue] = useState("");



    const handleAddStage = () => {
        if (onAddStage) onAddStage();
    };
    const handleSearch = (value) => {
        const fakeLeads = (id) => {
            const leads = selectedGrpData?.taggedUsers?.filter(
                (data) => data?.stage_id === id && data.fb_name.toLowerCase().includes(value?.toLowerCase())
            );
            return leads;
        };
        let newStages = [...selectedGrpData.stage]
        newStages = newStages?.map((element) => {
            return { ...element, leads: fakeLeads(element.id) };
        });
        setSortedStages(newStages)


    }
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">{companyName}</span>
                <div className="flex items-center bg-[#CCE7FF] px-2 space-x-1 rounded">
                    <TwoUsersIcon />
                    <span className="text-[#0087FF]">
                        {leadsCount}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Input.Search
                    placeholder={t("crm.Search...")}
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    style={{ width: 200 }}
                    allowClear
                />
                <Button type="primary" onClick={handleAddStage}>
                    +{" "}{t("crm.Add Stage")}
                </Button>
            </div>
        </div>
    );
};

TopbarRightSection.propTypes = {
    companyName: PropTypes.string,
    onSearch: PropTypes.func,
    onAddStage: PropTypes.func,
    leadsCount: PropTypes.number,
};

export default TopbarRightSection;

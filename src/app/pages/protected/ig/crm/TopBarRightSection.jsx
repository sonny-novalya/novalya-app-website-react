import PropTypes from "prop-types";
import { Input, Button } from "antd";
import { TwoUsersIcon } from "../../../common/icons/icons";
import { t } from "i18next";
import { SearchOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";

const TopbarRightSection = ({ companyName, leadsCount, onAddStage, setSortedStages, selectedGrpData }) => {
    // const [searchValue, setSearchValue] = useState("");



    const handleAddStage = () => {
        if (onAddStage) onAddStage();
    };
    const handleSearch = (value) => {
        const fakeLeads = (id) => {
            const leads = selectedGrpData?.taggedUsers?.filter(
                (data) => data?.stage_id === id && data.insta_name.toLowerCase().includes(value?.toLowerCase())
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
        <div className="flex justify-between items-center pr-4 py-5 bg-white">
            <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-700">{companyName}</span>
                <div className="flex items-center bg-[#CCE7FF] px-2 space-x-1 rounded">
                    <TwoUsersIcon />
                    <span className="text-[#0087FF]">
                        {leadsCount}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 justify-end items-center gap-5">
                <Input
                    placeholder={t("crm.Search...")}
                    prefix={<SearchOutlined />}
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                    className="w-1/3 px-3 py-1 !rounded-[4px] border border-[#CCCDCD] h-[34px] ctm-search flex-grow w-full max-w-[300px]"
                    style={{ width: 200 }}
                    allowClear
                />
                <Button className="min-h-[34px] bg-[#0087FF] !px-2 text-[12px] flex !gap-1" type="primary" onClick={handleAddStage}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 4.73926C7.5 4.60665 7.55268 4.47947 7.64645 4.3857C7.74022 4.29194 7.86739 4.23926 8 4.23926C8.13261 4.23926 8.25979 4.29194 8.35355 4.3857C8.44732 4.47947 8.5 4.60665 8.5 4.73926V8.23926H12C12.1326 8.23926 12.2598 8.29194 12.3536 8.3857C12.4473 8.47947 12.5 8.60665 12.5 8.73926C12.5 8.87187 12.4473 8.99904 12.3536 9.09281C12.2598 9.18658 12.1326 9.23926 12 9.23926H8.5V12.7393C8.5 12.8719 8.44732 12.999 8.35355 13.0928C8.25979 13.1866 8.13261 13.2393 8 13.2393C7.86739 13.2393 7.74022 13.1866 7.64645 13.0928C7.55268 12.999 7.5 12.8719 7.5 12.7393V9.23926H4C3.86739 9.23926 3.74021 9.18658 3.64645 9.09281C3.55268 8.99904 3.5 8.87187 3.5 8.73926C3.5 8.60665 3.55268 8.47947 3.64645 8.3857C3.74021 8.29194 3.86739 8.23926 4 8.23926H7.5V4.73926Z" fill="white"/>
                    </svg>
                    {" "}{t("crm.Add Stage")}
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

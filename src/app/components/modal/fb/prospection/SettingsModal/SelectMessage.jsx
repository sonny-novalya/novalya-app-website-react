import { useEffect, useMemo, useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { EditIcon, PreviewIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";
import PropTypes from "prop-types";
import SettingStore from "../../../../../../store/prospection/settings-store";
import useMessageSteps from "../../../../../../store/messageTemp/MessageTemp";

const SelectMessage = ({ tempMessageList }) => {
    const {
        setIsMessage,
        setStep,
        setBackStep,
        setPreviewMessage,
        setSelecetdMessage
    } = useMessageSteps();

    const { prospection, updateProspection } = SettingStore();
    const { message } = prospection;

    console.log("messagess",message)
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleUpdate = (field, value) => {
        updateProspection({
            ...prospection,
            [field]: value
        });
    };

    const handlePreview = (data) => {
        setPreviewMessage(data);
        setIsMessage(true);
        setBackStep(0);
        setStep(5);
    };

    const handleEdit = (data) => {
        setSelecetdMessage(data);
        setIsMessage(true);
        setStep(7);
    };

    const handleRowClick = (id) => {
        setSelectedRow(id);
        handleUpdate("message", id);
    };

    const filteredMessages = useMemo(() => {
        return tempMessageList?.filter((msg) =>
            msg?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, tempMessageList]);

    useEffect(()=>{
        setSelectedRow(message ? message :  (tempMessageList.length > 0 ? tempMessageList[0].id : null))
    }, [message])


    return (
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
            <h2 className="font-medium text-lg">{t("prospecting.Select Message")}</h2>
            <div className="flex gap-4 mt-2">
                <Input placeholder="Search messages" prefix={<SearchOutlined />} className="w-full" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsMessage(true)}>
                    Create New Message
                </Button>
            </div>

            <div className="flex-1 overflow-auto my-5">
                {filteredMessages?.map((record) => (
                    <div
                        key={record?.id}
                        className={`cursor-pointer flex w-full items-center justify-between p-2 border ${selectedRow == record?.id ? "bg-blue-100 rounded-xl border-[#0087FF]" : "border-white"}`}
                        onClick={() => handleRowClick(record?.id)}
                    >
                        <h2>
                            {record?.title}
                        </h2>
                        <div>
                            <div className="flex justify-end items-center gap-2">
                                <button className="flex items-center bg-white px-3 py-2 rounded-full cursor-pointer" onClick={() => handleEdit(record)}>
                                    <span><EditIcon /></span>
                                    <span>{t("prospecting.Edit")}</span>
                                </button>
                                <button className="flex items-center bg-white px-3 py-2 rounded-full cursor-pointer" onClick={() => handlePreview(record)}>
                                    <span><PreviewIcon /></span>
                                    <span>{t("prospecting.Preview")}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

SelectMessage.propTypes = {
    tempMessageList: PropTypes.object,
};

export default SelectMessage;

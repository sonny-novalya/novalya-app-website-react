import { useState } from "react";
import { Input, Button, Select } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { EditIcon, PreviewIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";

const SelectMessage = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    const messages = new Array(8).fill(null).map((_, index) => ({
        key: index,
        id: `#12536`,
    }));

    const handleRowClick = (key) => {
        setSelectedRow(key);
    };

    return (
        <div className="w-full h-full bg-white rounded-lg flex flex-col">
            <h2 className="font-medium text-lg">{t("prospecting.Select Message")}</h2>
            <div className="flex gap-4 mt-2">
                <Input placeholder="Search messages" prefix={<SearchOutlined />} className="w-full" />
                <Select placeholder="Sort By" className="w-40">
                    <Select.Option value="recent">Recent</Select.Option>
                    <Select.Option value="oldest">Oldest</Select.Option>
                </Select>
                <Button type="primary" icon={<PlusOutlined />}>
                    Create New Message
                </Button>
            </div>

            <div className="flex-1 overflow-auto my-5">
                        {messages.map((record) => (
                            <div
                                key={record.key}
                                className={`cursor-pointer flex w-full items-center justify-between p-2 border ${selectedRow === record.key ? "bg-blue-100 rounded-xl border-[#0087FF]" : "border-white"}`}
                                onClick={() => handleRowClick(record.key)}
                            >
                                <h2
                                >
                                    {record.id}
                                </h2>
                                <div
                                >
                                    <div className="flex justify-end items-center gap-2">
                                        <button className="flex items-center bg-white px-3 py-2 rounded-full cursor-pointer">
                                            <span><EditIcon /></span>
                                            <span>{t("prospecting.Edit")}</span>
                                        </button>
                                        <button className="flex items-center bg-white px-3 py-2 rounded-full cursor-pointer">
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

export default SelectMessage;

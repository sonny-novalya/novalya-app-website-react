import { useState } from "react";
import { Input, Button, Select, Table } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { EditIcon, PreviewIcon } from "../../../../../pages/common/icons/icons";
import { t } from "i18next";

const SelectMessage = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    const messages = new Array(8).fill(null).map((_, index) => ({
        key: index,
        id: `#12536`,
    }));

    const columns = [
        {
            title: "Message",
            dataIndex: "id",
            key: "id",
            render: (text, record) => (
                <div
                    className={`cursor-pointer ${selectedRow === record.key ? "bg-blue-100" : "bg-gray-100"
                        }`}
                    onClick={() => setSelectedRow(record.key)}
                >
                    {text}
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: () => (
                <div className="flex justify-center items-center gap-2">
                    <Button className="flex items-center">
                        <span><EditIcon /></span>
                        <span>{t("prospecting.Edit")}</span>
                    </Button>
                    <Button className="flex items-center">
                        <span><PreviewIcon /></span>
                        <span>{t("prospecting.Preview")}</span>
                    </Button>
                </div>
            ),

        },
    ];

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

            <div className="flex-1 overflow-auto my-3">
                <Table
                    columns={columns}
                    dataSource={messages}
                    pagination={false}
                    rowClassName={(record) => (selectedRow === record.key ? "bg-blue-100" : "")}
                />
            </div>

        </div>
    );
};

export default SelectMessage;

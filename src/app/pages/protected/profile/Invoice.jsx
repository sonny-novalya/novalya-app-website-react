import React from "react";
import { Table, Button } from "antd";
import { DownloadOutlined  } from "@ant-design/icons";
import { BasicPlanIcon } from "../../common/icons/icons";

const Invoice = ({ userMail }) => {
  const columns = [
    {
      title: "",
      dataIndex: "icon",
      key: "icon",
      render: () => (
        <BasicPlanIcon />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: <span className="font-semibold">Invoice no</span>,
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: <span className="font-semibold">Download</span>,
      dataIndex: "download",
      key: "download",
      render: () => (
        <button  className="flex space-x-1.5 px-1.6 py-1 hover:bg-blur-300">
        <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17M7 11L12 16M12 16L17 11M12 16V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
          <span>Download</span>
        </button>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      type: "Basic plan",
      amount: "$77",
      date: "Oct 14, 2024",
      invoiceNo: "# 20241030-21504",
    },
    {
      key: 2,
      type: "Basic plan",
      amount: "$77",
      date: "Oct 14, 2024",
      invoiceNo: "# 20241030-21504",
    },
    {
      key: 3,
      type: "Basic plan",
      amount: "$77",
      date: "Oct 14, 2024",
      invoiceNo: "# 20241030-21504",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
      <p className="text-gray-600 text-[16px] mb-4">
        <span className="font-semibold">Email :</span> {userMail}
      </p>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="custom-invoice-table"
      />

      <div className="flex justify-end mt-4 mr-20">
        <button className="px-10 py-1 bg-blue-500 text-white rounded-md">
          See more
        </button>
      </div>
    </div>
  );
};

export default Invoice;

import React from 'react'
import "./levelCommission.css"
import AfiliateTopBar from '../../../../components/affilliate/shared/affiliateTopBar'
import { Table, Button, Tabs, Input, Select } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

const LevelCommission = () => {
  const data = [
    {
      key: "1",
      amount: "$2316",
      currency: "Dollars $",
      sender: "Name",
      type: "Nov 29, 2024",
      payout: "25%",
      date: "02/12/2024",
    },
  ];

  const columns = [
    { title: "#", dataIndex: "key", key: "key" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "% Payout", dataIndex: "payout", key: "payout" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
  <>
      <div className="p-6 bg-gray-100 min-h-screen">
  
      <AfiliateTopBar/>

      {/* Level Commission Section */}
      <div className="bg-white p-6 shadow rounded-md">
        <h2 className="text-lg font-semibold mb-4">Level Commission</h2>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Level 1" key="1" />
          <TabPane tab="Level 2" key="2" />
          <TabPane tab="Others" key="3" />
        </Tabs>

        <div className="flex justify-between items-center my-4">
          <Input placeholder="Search" className="w-1/3" />
          <div className="flex space-x-2">
            <Select defaultValue="February">
              <Option value="January">January</Option>
              <Option value="February">February</Option>
            </Select>
            <Select defaultValue="2025">
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
            </Select>
          </div>
        </div>

        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  </>
  );
}

export default LevelCommission
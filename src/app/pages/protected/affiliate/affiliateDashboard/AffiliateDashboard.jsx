import React from "react";
import { Card,Table,Progress,Tabs} from "antd";
import "./AffiliateDashboard.css"
import AfiliateTopBar from "../../../../components/affilliate/shared/affiliateTopBar";
const { TabPane } = Tabs;

const AffiliateDashboard = () => {
    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Plan", dataIndex: "plan", key: "plan" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Status", dataIndex: "status", key: "status", render: (text) => <span className="text-green-500 font-semibold">{text}</span> },
      ];
    
      const data = Array(7).fill({
        key: Math.random(),
        name: "Vikki New",
        plan: "Unlimited",
        price: "$231.6",
        status: "Active",
      });
    
      return (
        <div className="p-6 bg-gray-100 min-h-screen">
          {/* Header Section */}
        <AfiliateTopBar/>
    
          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border border-red-500" title="Lifetime Earning">$23.06</Card>
            <Card className="border border-green-500" title="Last Month Earning">$23.06</Card>
            <Card className="border border-blue-500" title="Total Payment">$23.06</Card>
          </div>
    
          {/* Sales Bonus */}
          <Card className="mb-6">
            <h2 className="text-lg font-semibold mb-4">My Sales Bonus</h2>
            <Progress percent={40} strokeColor="#1890ff" />
            <p className="text-center mt-2">4/10 Sales Needed Till Next Payout</p>
          </Card>
    
          {/* Earnings Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border border-gray-300" title="Level 01">$23.6</Card>
            <Card className="border border-gray-300" title="Level 02">$18.3</Card>
            <Card className="border border-green-500" title="Total Earnings">$38.3</Card>
          </div>
    
          {/* Tabs for Customers */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="New Trials" key="1">
              <Table columns={columns} dataSource={data} pagination={false} />
            </TabPane>
            <TabPane tab="Active Customers" key="2">
              <Table columns={columns} dataSource={data} pagination={false} />
            </TabPane>
            <TabPane tab="Cancelled Trials" key="3">
              <Table columns={columns} dataSource={data} pagination={false} />
            </TabPane>
            <TabPane tab="Cancelled Customers" key="4">
              <Table columns={columns} dataSource={data} pagination={false} />
            </TabPane>
          </Tabs>
        </div>
      )
};

export default AffiliateDashboard;

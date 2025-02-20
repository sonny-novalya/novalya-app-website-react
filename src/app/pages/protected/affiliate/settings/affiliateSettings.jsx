import React from 'react'
import './affiliateSettings.css'
import AfiliateTopBar from '../../../../components/affilliate/shared/affiliateTopBar'
import { Button, Input, Select, Upload, Radio, message } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

const AffiliateSettings = () => {
  const handleUpload = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <>
     <AfiliateTopBar/>
     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* KYC Status Section */}
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">KYC Status</h2>
        <Button type="primary" danger className="mr-2">Not Verified</Button>
        <Button type="default">Not Setup</Button>
      </div>
      
      {/* Verification Document Section */}
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
        <h2 className="text-lg font-semibold mb-4">Start Verification Document</h2>
        <Radio.Group defaultValue="id-card" className="mb-4">
          <Radio value="id-card">ID Card</Radio>
          <Radio value="passport">Passport</Radio>
        </Radio.Group>

        <div className="grid grid-cols-2 gap-4">
          <Upload className="w-full" onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Upload Front Image</Button>
          </Upload>
          <Upload className="w-full" onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Upload Back Image</Button>
          </Upload>
        </div>

        <Button type="primary" className="mt-4 bg-green-500">Submit</Button>
      </div>

      {/* Payment Information Section */}
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
        <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
        <Radio.Group defaultValue="europe" className="mb-4">
          <Radio value="europe">Europe</Radio>
          <Radio value="outside-eu">Outside EU</Radio>
        </Radio.Group>
        <div className="flex items-center bg-blue-100 p-3 rounded-md text-blue-700">
          <InfoCircleOutlined className="mr-2" />
          Payment is made in Euro and EUR 5 will be deducted as a processing fee.
        </div>
      </div>
      
      {/* Bank Details Section */}
      <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
        <h2 className="text-lg font-semibold mb-4">Bank Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select placeholder="Select Country" className="w-full">
            <Option value="US">United States</Option>
            <Option value="UK">United Kingdom</Option>
          </Select>
          <Input placeholder="Your Full Name" />
          <Input placeholder="Bank Account IBAN" />
          <Input placeholder="Bank Account BIC" />
          <Input placeholder="Personal Address" />
          <Input placeholder="City" />
          <Input placeholder="Zip Code" />
          <Input placeholder="Country" />
        </div>
        <Button type="primary" className="mt-4 bg-green-500">Submit</Button>
      </div>
    </div>


    </>
  )
}

export default AffiliateSettings



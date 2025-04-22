import React from 'react'
import './affiliateLinks.css'
import AfiliateTopBar from '../../../../components/affilliate/shared/affiliateTopBar'
import {  Button,  Input, Select } from "antd";

const { Option } = Select;

const AffiliateLinks = () => {
  return (<>
  <div className="p-6 bg-gray-100 h-screen overflow-s">
  <AfiliateTopBar/>
    {/* Affiliate Code Section */}
    <div className="bg-white p-6 shadow rounded-md mt-6">
        <h2 className="text-lg font-semibold mb-4">My Affiliate Code is:</h2>
        <div className="flex items-center space-x-4">
          <div className="border-2 border-dashed border-blue-400 p-4 rounded-md text-lg font-semibold">
            CDKCDCDCDCDC
          </div>
          <Button type="primary">Update Affiliate Code</Button>
        </div>
        
        <h3 className="text-md font-semibold mt-6 mb-2">Select Language of Your Affiliate Links</h3>
        <Select defaultValue="US English" className="w-1/3">
          <Option value="US English">US English</Option>
        </Select>
      </div>

      {/* Affiliate Links Section */}
      <div className="bg-white p-6 shadow rounded-md mt-6">
        {["Official Website", "Sales Funnel", "Pricing Page"].map((title, index) => (
          <div key={index} className="flex items-center space-x-4 border p-4 rounded-md mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <Input value="https://app.novalya.com/signup/UBH52R2VJJ" disabled className="my-2" />
              <div className="flex space-x-2">
                <Button>Email</Button>
                <Button>Messenger</Button>
                <Button>WhatsApp</Button>
                <Button>Telegram</Button>
              </div>
            </div>
            <Button type="primary" className="bg-green-500">Copy link</Button>
          </div>
        ))}
      </div>
      </div>
  </>
  
  )
}

export default AffiliateLinks
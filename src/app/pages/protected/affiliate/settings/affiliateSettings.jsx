import React from 'react'
import './affiliateSettings.css'
import AfiliateTopBar from '../../../../components/affilliate/shared/affiliateTopBar'
import { Button, Input, Select, Upload, message } from "antd";
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
    <div className="p-6 bg-gray-100 min-h-screen mb-4">
      <AfiliateTopBar/>
      <div className="flex gap-4">
        <div className='flex-1'>
          {/* KYC Section */}
          <div className='bg-white px-5 py-7 rounded-[10px]'>

              <div className='grid grid-cols-[40%_60%] items-center gap-4 items-center mb-6'>
                  <h4 className='font-medium text-[20px] leading-[150%]'>KYC Status</h4>
                  <div>
                    <button className='font-medium text-[14px] leading-[150%] border border-[#0087FF] text-[#0087FF] rounded-[6px] px-5 py-2.5'>Not Verified</button>
                  </div>
              </div>

              <div className='grid grid-cols-[40%_60%] items-center gap-4 items-center mb-6'>
                  <h4 className='font-medium text-[20px] leading-[150%]'>Bank Review Status</h4>
                  <div>
                    <button className='font-medium text-[14px] leading-[150%] border border-[#0087FF] text-[#0087FF] rounded-[6px] px-5 py-2.5'>Not Setup</button>
                  </div>
              </div>

              <div className='grid grid-cols-[40%_60%] items-center gap-4 items-center'>
                <h4 className='font-medium text-[20px] leading-[150%]'>Start Verification Document</h4>
                <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-5'>
                    <input className='transform scale-[1.35]' type='radio' id='ID-Card' name='kyc-varification'/>
                    <label className='ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer' for='ID-Card'>ID Card</label>
                  </div>
                  <h5 className='font-medium text-[20px] leading-[150%] text-black'>Or</h5>
                  <div className='flex items-center gap-5'>
                    <input className='transform scale-[1.35]' type='radio' id='Passport' name='kyc-varification'/>
                    <label className='ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer' for='Passport'>Passport</label>
                  </div>
                </div>
              </div>
              
              <div className='grid grid-cols-2 gap-5 mt-7'>
                <div>
                  <h6 className='font-normal text-[14px] leading-[150%] mb-[10px]'>Select front image</h6>
                  <Upload className="w-full ctm-upload" onChange={handleUpload}>
                    <Button icon={<UploadOutlined />}>Drag and Drop files here or Choose File</Button>
                  </Upload>
                  <div className='flex items-center justify-between mt-[10px]'>
                    <span className='text-[12px] leading-[150%] text-black/50'>Supported Format: JPEG, PNG, PDF</span>
                    <span className='text-[12px] leading-[150%] text-black/50'>Maximum size: 5MB</span>
                  </div>
                  <div className='p-6'>
                    <img className='border border-[#00000042] rounded-[12px] min-h-[125px]' src='' alt='id-1'></img>
                  </div>
                </div>
                <div>
                  <h6 className='font-normal text-[14px] leading-[150%] mb-[10px]'>Select back image</h6>
                  <Upload className="w-full ctm-upload" onChange={handleUpload}>
                    <Button icon={<UploadOutlined />}>Drag and Drop files here or Choose File</Button>
                  </Upload>
                  <div className='flex items-center justify-between mt-[10px]'>
                    <span className='text-[12px] leading-[150%] text-black/50'>Supported Format: JPEG, PNG, PDF</span>
                    <span className='text-[12px] leading-[150%] text-black/50'>Maximum size: 5MB</span>
                  </div>
                  <div className='p-6'>
                    <img className='border border-[#00000042] rounded-[12px] min-h-[125px]' src='' alt='id-1'></img>
                  </div>
                </div>
              </div>

              <div>
                <button className='bg-[#21BF7C] font-[Outfit] font-medium text-[14px] leading-[150%] text-white px-9 py-2.5 rounded-[6px] cursor-pointer'>Submit</button>
              </div>

              <div className="border border-dashed border-[#0087FF] bg-[#0087FF33] rounded-[10px] mt-[20px] px-[30px] py-[20px] flex items-center gap-[16px]">
                <InfoCircleOutlined className="affi-svg" />
                <span className='font-medium text-[14px] leading-[150%] text-[#0087FF]'>Please verify your KYC to set up your payment method for payouts.</span>
              </div>

              <h4 class="font-medium text-[20px] leading-[150%] my-4 ">Payment Information</h4>
              <div className='flex items-center gap-5'>
                  <div className='flex items-center gap-5'>
                    <input className='transform scale-[1.35]' type='radio' id='Europe' name='country'/>
                    <label className='ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer' for='Europe'>Europe</label>
                  </div>
                  <div className='flex items-center gap-5'>
                    <input className='transform scale-[1.35]' type='radio' id='Outside-EU' name='country'/>
                    <label className='ctm-label font-medium text-[14px] leading-[150%] bg-white text-[#0087FF] px-7 py-2.5 rounded-[6px] border border-[#0087FF] cursor-pointer' for='Outside-EU'>Outside EU</label>
                  </div>
                </div>

                <div className="border border-dashed border-[#0087FF] bg-[#0087FF33] rounded-[10px] mt-[20px] px-[30px] py-[20px] flex items-center gap-[16px]">
                  <InfoCircleOutlined className="affi-svg" />
                  <span className='font-medium text-[14px] leading-[150%] text-[#0087FF]'>Payment are made in Euro and EUR 5 will be deduct as fee of the process. Receiver bank may take some fees.</span>
                </div>

                <div className='mt-6'>
                  <h2 className="text-[20px] font-semibold mb-4">Bank Details</h2>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Bank Account Country</label>
                      <Select placeholder="Select Country" className="w-full ctm-select">
                        <Option value="US">United States</Option>
                        <Option value="UK">United Kingdom</Option>
                      </Select>
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Your Full Name</label>
                      <Input className='ctm-input' />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Bank Account IBAN</label>
                      <Input className='ctm-input' />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Bank Account BIC</label>
                      <Input className='ctm-input' />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Personal Address</label>
                      <Input className='ctm-input' />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>City</label>
                      <Input className='ctm-input' />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Zip Code</label>
                      <Input className='ctm-input'  />
                    </div>
                    <div>
                      <label className='text-[14px] leading-[150%] mb-[10px] block'>Country</label>
                      <Input className='ctm-input'  />
                    </div>
                  </div>
                  <Button type="primary" className="mt-4 !bg-[#21BF7C] font-medium text-[14px] leading-[150%] !px-[30px] !py-[10px] !min-h-[40px]">Submit</Button>
                </div>

          </div>

          {/* KYC Status Section */}
          {/* <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl">
            <h2 className="text-lg font-semibold mb-4">KYC Status</h2>
            <Button type="primary" danger className="mr-2">Not Verified</Button>
            <Button type="default">Not Setup</Button>
          </div> */}
          
          {/* Verification Document Section */}
          {/* <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
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
          </div> */}

          {/* Payment Information Section */}
          {/* <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <Radio.Group defaultValue="europe" className="mb-4">
              <Radio value="europe">Europe</Radio>
              <Radio value="outside-eu">Outside EU</Radio>
            </Radio.Group>
            <div className="flex items-center bg-blue-100 p-3 rounded-md text-blue-700">
              <InfoCircleOutlined className="mr-2" />
              Payment is made in Euro and EUR 5 will be deducted as a processing fee.
            </div>
          </div> */}
          
          {/* Bank Details Section */}
          {/* <div className="bg-white p-6 shadow rounded-md w-full max-w-4xl mt-6">
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
          </div> */}
        </div>
        <div className='bg-[#0087FF33] border border-[#0087FF] rounded-[10px] p-5 h-[250px] flex flex-col justify-center items-center gap-4'>
          <h3 className='font-medium text-[20px] leading-[150%]'>Documents</h3>
          <button className='font-medium text-[14px] leading-[150%] bg-[#0087FF] border border-[#0087FF] text-white w-full px-8 py-2.5 rounded-md cursor-pointer'>Affiliate Agreement</button>
          <button className='font-medium text-[14px] leading-[150%] bg-[#0087FF] border border-[#0087FF] text-white w-full px-8 py-2.5 rounded-md cursor-pointer'>Compensation Plan</button>
        </div>
      </div>
    </div>

    </>
  )
}

export default AffiliateSettings



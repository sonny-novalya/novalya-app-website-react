import React from 'react'
import { Input, Button, List, Card, Dropdown, Menu } from 'antd';
import { SearchOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import './messageIndex.css'

const MessageIndex = () => {
    const messages = Array(10).fill({
        id: '#12536',
        platform: 'Facebook',
      });
    
      const renderPlatformButton = (platform) => {
        const platformClass =
          platform === 'Facebook' ? 'bg-blue-600' : 'bg-red-500';
        return (
          <Button className={`${platformClass} !text-[#1877F2] !border-[#1877F2] px-3 py-1 !rounded-[25px] !font-medium text-[14px] leading-[21px] tracking-normal gap-[4px] p-[6px_12px] flex !h-9`}>
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3567_13827)">
              <path d="M22.5 11C22.5 4.92491 17.5751 0 11.5 0C5.42491 0 0.5 4.92491 0.5 11C0.5 16.4904 4.52256 21.0412 9.78125 21.8664V14.1797H6.98828V11H9.78125V8.57656C9.78125 5.81969 11.4235 4.29688 13.9362 4.29688C15.1396 4.29688 16.3984 4.51172 16.3984 4.51172V7.21875H15.0114C13.6449 7.21875 13.2188 8.0667 13.2188 8.93664V11H16.2695L15.7818 14.1797H13.2188V21.8664C18.4774 21.0412 22.5 16.4905 22.5 11Z" fill="#1877F2"/>
              <path d="M15.7779 14.1797L16.2656 11H13.2148V8.93664C13.2148 8.06661 13.641 7.21875 15.0075 7.21875H16.3945V4.51172C16.3945 4.51172 15.1357 4.29688 13.9322 4.29688C11.4196 4.29688 9.77734 5.81969 9.77734 8.57656V11H6.98438V14.1797H9.77734V21.8664C10.3459 21.9555 10.9206 22.0001 11.4961 22C12.0716 22.0001 12.6463 21.9555 13.2148 21.8664V14.1797H15.7779Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_3567_13827">
              <rect width="22" height="22" fill="white" transform="translate(0.5)"/>
              </clipPath>
              </defs>
            </svg>
            {platform}
          </Button>
        );
      };
  return (
    <>
    <div className='message-main-wraper'>
      <div className="px-6 py-5 bg-gray-100 min-h-screen">
        <h1 className='font-medium text-[24px] leading-[1.3] mb-5'>Messages Templates</h1>
        <div className="flex gap-12 mb-4">
          <Button className="flex-1 !font-medium !text-[18px] leading-[24px] !text-[#797979] border border-[#9C9C9C] !p-[12px] !h-12 hover:!text-white hover:!bg-[#0087FF]">
            Message
          </Button>
          <Button className="flex-1 !font-medium !text-[18px] leading-[24px] !text-[#797979] border border-[#9C9C9C] !p-[12px] !h-12 hover:!text-white hover:!bg-[#0087FF]">
            Keywords
          </Button>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              className="w-1/2 !rounded-[4px] min-h-[44px]"
            />
            <div className="flex gap-2.5 ml-[10px]">
              <Button icon={<FilterOutlined />} className="!text-[16px] !rounded-[4px] px-4 min-h-[44px] min-w-[155px] !text-[#808183]">
                Filter
              </Button>
              <Button type="primary" className="!text-[16px] flex align-center gap-2.5 !rounded-[6px] px-4 min-h-[44px] min-w-[155px] !text-white">
                <span>+</span> Create New
              </Button>
            </div>
          </div>
          <div className='bg-[#E6F1FB] text-[14px] leading-[21px] tracking-[2%] flex items-center gap-[10px] p-[16px_20px] mb-5'> Name 
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 2.91675V16.9417" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <List
            bordered
            className="rounded-2xl ctm-list-design"
            dataSource={messages}
            renderItem={(item) => (
              <List.Item className="flex justify-between items-center">
                <span>Message {item.id}</span>
                <div className="flex gap-4 items-center">
                  {renderPlatformButton(item.platform)}
                  <Button icon={<EditOutlined />} className="!text-[#808183] !rounded-[25px] !font-medium !text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover">
                  
                  Edit
                  </Button>
                  <Button icon={<EyeOutlined />} className="!text-[#808183] !rounded-[25px] !font-medium !!text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover">
                    Preview
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  
    </>
  )
}

export default MessageIndex
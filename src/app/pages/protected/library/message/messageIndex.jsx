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
          <Button className={`${platformClass} text-white px-3 py-1 rounded-lg`}>
            {platform}
          </Button>
        );
      };
  return (
    <>
         <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h1>Message</h1>
        <div className="flex justify-between items-center mb-4">
          <Button type="primary" className="rounded-2xl px-5 py-2">
            Message
          </Button>
          <Button type="primary" className="rounded-2xl px-5 py-2">
            Keywords
          </Button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            className="w-1/2 rounded-2xl"
          />
          <div className="flex gap-2">
            <Button icon={<FilterOutlined />} className="rounded-2xl px-4">
              Filter
            </Button>
            <Button type="primary" className="rounded-2xl px-5">
              + Create New
            </Button>
          </div>
        </div>
        <List
          bordered
          className="rounded-2xl"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item className="flex justify-between items-center">
              <span>Message {item.id}</span>
              <div className="flex gap-2 items-center">
                {renderPlatformButton(item.platform)}
                <Button icon={<EditOutlined />} className="rounded-2xl px-4">
                  Edit
                </Button>
                <Button icon={<EyeOutlined />} className="rounded-2xl px-4">
                  Preview
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  
    </>
  )
}

export default MessageIndex
import React from 'react'
import { Input, Button, List} from 'antd';
import { SearchOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import '../message/messageIndex.css'
import useMessageSteps from '../../../../../store/messageTemp/MessageTemp';

const Keywords = () => {
  const {setIsMessage} = useMessageSteps()

    const messages = Array(10).fill({
        id: '#12536',
        platform: 'Facebook',
      });
    
  return (
    <>
    <div className='message-main-wraper'>
      <div className="px-6 py-5 bg-gray-100 min-h-screen">
        <h1 className='font-medium text-[24px] leading-[1.3] mb-5'>Keywords</h1>
      
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
              <Button type="primary" onClick={()=>setIsMessage(true)} className="!text-[16px] flex align-center gap-2.5 !rounded-[6px] px-4 min-h-[44px] min-w-[155px] !text-white">
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
                <span>Keywords {item.id}</span>
                <div className="flex gap-4 items-center">
                  {/* {renderPlatformButton(item.platform)} */}
                  <Button icon={<EditOutlined />} className="!text-[#808183] !rounded-[25px] !font-medium !text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover">
                  
                  Edit
                  </Button>
                  <Button icon={<EyeOutlined />} className="!text-[#808183] !rounded-[25px] !font-medium !!text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover">
                   Duplicate
                  </Button>
                  <Button icon={<EyeOutlined />} className="!text-[#808183] !rounded-[25px] !font-medium !!text-[14px] leading-[21px] tracking-normal gap-[4px] p-[8px_12px] flex !h-9 btn-hover">
                   Delete
                  </Button>
                </div>
              </List.Item>
            )}
          />
          <div className='ctm-pagination flex items-center gap-[10px] justify-between border-t-[3px] border-[#E0E0E0] mt-5 pt-5'>
            <div className='flex items-center gap-[10px]'>
              <span className='text-[#000] text-[14px]'>Rows per pages</span>
              <select className='border border-[#E0E0E0] px-2 py-1 text-[14px] rounded-[4px] text-black focus-visible:outline-none'>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className='text-[#8C8C8C] text-[14px]' >25 Rows selected</span>
            </div>
            <div className='pagination-wrap flex items-center gap-[10px] '>
              <button className='flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100'>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.37822 5.65751L6.03522 0.000514861L7.44922 1.41451L2.49922 6.36452L7.44922 11.3145L6.03522 12.7285L0.37822 7.07151C0.190749 6.88399 0.0854331 6.62968 0.0854331 6.36452C0.0854331 6.09935 0.190749 5.84504 0.37822 5.65751Z" fill="#404040"/>
                </svg>
                Previous
              </button>
              <ul className='pagination-list flex items-center gap-[10px] mx-1.5'>
                <li className='active flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white hover:border-[#008801]'><button>1</button></li>
                <li className='flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white !hover:border-[#008801]'><button>2</button></li>
                <li className='flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white !hover:border-[#008801]'><button>3</button></li>
                <li className='flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white !hover:border-[#008801]'><button>4</button></li>
                <li className='flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white !hover:border-[#008801]'><button>...</button></li>
                <li className='flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white !hover:border-[#008801]'><button>16</button></li>
              </ul>
              <button className='flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100'>Next 
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15694 7.71163L1.49994 13.3686L0.0859375 11.9546L5.03594 7.00462L0.0859375 2.05463L1.49994 0.640625L7.15694 6.29763C7.34441 6.48515 7.44972 6.73946 7.44972 7.00462C7.44972 7.26979 7.34441 7.5241 7.15694 7.71163Z" fill="#404040"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default Keywords
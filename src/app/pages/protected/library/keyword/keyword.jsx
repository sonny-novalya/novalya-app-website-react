import React, { useEffect, useRef, useState } from 'react'
import { Input, Button, List, message} from 'antd';
import { SearchOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import '../message/messageIndex.css'
import KeywordPop from '../../../../components/keyWords/keywordPop';
import useKeyWordStore from '../../../../../store/keyword/keywordStore';
import { useDebounce } from '../../../../../hooks/debounce';
import KeywordUpdatePop from '../../../../components/keyWords/keyWordUpdate';

const Keywords = () => {
  const {flow,setFlow,keyWordList,fetchKeywords,deleteKeyWords,duplicateKeyWords,loading,totalPages,createKeyWords,setSelectedKeyword,actionLoader}= useKeyWordStore()
   const [isDelete, setIsDelete] = useState({val:false,id:null});
    const [sort, setSort] = useState(false);
    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
    });
    const delTime = useRef();
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);
    const containerRef = useRef(null)
    const [data,setData]=useState({
      name:'',
      negative_keyword:[],
      positive_keyword:[],
      types:["facebook"]
    })

    const handleClickOutside = (event) => {
      if (containerRef.current &&!containerRef.current.contains(event.target)) {
        setFlow(0);
        setSelectedKeyword(null)
      }
    };
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside)
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])


    useEffect(() => {
      fetchKeywords(pagination,debouncedQuery,sort)
    }, [pagination,debouncedQuery,sort])
    
 
const handleDelete =async  (id) =>{
  if(isDelete.val && isDelete.id ===id ){
    const res = await deleteKeyWords(id)
    if (res?.status === 200) {
      message.success("Message deleted Sucessfully")
      fetchKeywords(pagination,debouncedQuery,sort)
    }
    clearIsDelete();
  }else{
    clearTimeout(delTime.current);
  
    setIsDelete({val:true,id:id});
    delTime.current = setTimeout(() => {
      setIsDelete({val:true,id:null});
    }, 3000);
  }

}



const clearIsDelete = () => {
  setIsDelete({val:false,id:null});
  clearTimeout(delTime.current);
};

 const handleDuplicate = async (id)=>{
  const res = await duplicateKeyWords(id)
  if (res?.status === 200) {
    message.success("Message duplicated Sucessfully")
    fetchKeywords(pagination,debouncedQuery,sort)
  }
 }
 const reanderPaginationButton = (num) => {
  const data =(num/pagination.limit) || 1
  num = Math.ceil(data) || 1
  const btnArray = Array(num).fill(null);

  return (
    <>
      {btnArray.map((_, i) => {
        return (
          <li className={`${pagination.page === i+1 && "active"} flex items-center justify-center w-6 h-6 border border-[#8C8C8C] font-medium text-[14px] rounded-[4px] hover:bg-[#0087FF] hover:text-white hover:border-[#008801]`}>
            <button
              onClick={() => setPagination({ ...pagination, page: (i + 1 )})}
            >
              {i + 1}
            </button>
          </li>
        );
      })}
    </>
  );
};

const handleCreate =async ()=>{
  const paylaod = {
    ...data,
    negative_keyword:JSON.stringify(data.negative_keyword),
    positive_keyword:JSON.stringify(data.positive_keyword),
  }

  if(!paylaod.name){
    message.error("Keyword Name is required")
    return
  }
  if(!data.positive_keyword.length && !data.negative_keyword.length){
    message.error("Positive or Negitive Keywords are required")
    return
  }
  const res = await createKeyWords(paylaod)

 if(res?.status === 200){
  message.success("Message Created")
   setFlow(0)
  
  fetchKeywords(pagination,debouncedQuery,sort)
 }
}

const handleUpdate =(item)=>{
  const params = {
    ...item,
    negative_keyword:JSON.parse(item?.negative_keyword),
    positive_keyword:JSON.parse(item?.positive_keyword),
  }
  setSelectedKeyword(params)
  setFlow(2)
}


    
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
              onChange={(e)=>setQuery(e.target.value)}
            />
            <div className="flex gap-2.5 ml-[10px]">
              
              <Button type="primary" onClick={()=>setFlow(1)} className="!text-[16px] flex align-center gap-2.5 !rounded-[6px] px-4 min-h-[44px] min-w-[155px] !text-white">
                <span>+</span> Create New
              </Button>
            </div>
          </div>
          <div className='bg-[#E6F1FB] text-[14px] leading-[21px] tracking-[2%] flex items-center gap-[10px] p-[16px_20px] mb-2.5'> Name 
          <span onClick={()=>setSort(!sort)} className={`${ sort ?"rotate-180":""} cursor-pointer`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.062 12.0249L10.0036 17.0832L4.94531 12.0249" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 2.91675V16.9417" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          </div>
          <List
            bordered
            loading={loading}
            className="rounded-2xl ctm-list-design"
            dataSource={keyWordList}
            renderItem={(item) => (
              <List.Item key={item.id} className="flex justify-between items-center">
                <span>{item?.name}</span>
                <div className="flex gap-4 items-center">
                  {/* {renderPlatformButton(item.platform)} */}
                  <Button onClick={()=>handleUpdate(item)} icon={<EditOutlined />} className="ctm-green-btn !rounded-[25px] !font-medium !text-[14px] leading-[21px] gap-[4px] p-[8px_12px] flex !h-9">
                    Edit
                  </Button>
                  <Button icon={<EyeOutlined />} onClick={()=>handleDuplicate(item.id)}  className="ctm-blue-btn !rounded-[25px] !font-medium !!text-[14px] leading-[21px] gap-[4px] p-[8px_12px] flex !h-9">
                   Duplicate
                  </Button>
                  <Button icon={<EyeOutlined />}   onClick={()=>handleDelete(item.id)} className="ctm-red-btn !rounded-[25px] !font-medium !!text-[14px] leading-[21px] gap-[4px] p-[8px_12px] flex !h-9">
                   {isDelete.val && isDelete.id === item.id?"Really ?":"Delete"}
                  </Button>
                </div>
              </List.Item>
            )}
          />
             <div className="ctm-pagination flex items-center gap-[10px] justify-between border-t-[3px] border-[#E0E0E0] mt-5 pt-5">
              <div className="flex items-center gap-[10px]">
                <span className="text-[#000] text-[14px]">Rows per pages</span>
                <select
                  value={pagination?.limit}
                  onChange={(e) =>
                    setPagination({
                      ...pagination,
                      limit: Number(e.target.value),
                    })
                  }
                  className="border border-[#E0E0E0] px-2 py-1 text-[14px] rounded-[4px] text-black focus-visible:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                {/* <span className='text-[#8C8C8C] text-[14px]' >25 Rows selected</span> */}
              </div>
              <div className="pagination-wrap flex items-center gap-[10px] ">
                <button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      page: pagination.page - 1,
                    })
                  }
                  className="flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100"
                >
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M0.37822 5.65751L6.03522 0.000514861L7.44922 1.41451L2.49922 6.36452L7.44922 11.3145L6.03522 12.7285L0.37822 7.07151C0.190749 6.88399 0.0854331 6.62968 0.0854331 6.36452C0.0854331 6.09935 0.190749 5.84504 0.37822 5.65751Z"
                      fill="#404040"
                    />
                  </svg>
                  Previous
                </button>
                <ul className="pagination-list flex items-center gap-[10px] mx-1.5">
                  {reanderPaginationButton(totalPages)}
                </ul>
                <button
                  onClick={() =>
                    setPagination({
                      ...pagination,
                      page: pagination.page + 1,
                    })
                  }
                  className="flex items-center gap-[10px] font-medium text-[16px] leading-[1.5] text-[#404040] opacity-50 hover:opacity-100"
                >
                  Next
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clipRule="evenodd"
                      d="M7.15694 7.71163L1.49994 13.3686L0.0859375 11.9546L5.03594 7.00462L0.0859375 2.05463L1.49994 0.640625L7.15694 6.29763C7.34441 6.48515 7.44972 6.73946 7.44972 7.00462C7.44972 7.26979 7.34441 7.5241 7.15694 7.71163Z"
                      fill="#404040"
                    />
                  </svg>
                </button>
              </div>
            </div>


        </div>
      </div>
    </div>
   { flow === 1 && <KeywordPop containerRef={containerRef} setData={setData} handleCreate={handleCreate}  actionLoader={actionLoader} data={data}/>}
   { flow === 2 &&  <KeywordUpdatePop containerRef={containerRef}/>}
  
    </>
  )
}

export default Keywords
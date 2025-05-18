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
    <div className="pl-10 pr-8 py-8 bg-[#f2f2f2] h-screen overflow-auto message-main-wraper">
      <h1 className='font-[500] text-[24px] leading-[1.3] mb-6'>Keywords</h1>
    
      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4.5">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            className="w-1/2 !rounded-[4px] min-h-[44px]"
            onChange={(e)=>setQuery(e.target.value)}
          />
          <div className="flex gap-2.5 ml-[10px]">
            <Button className="!text-[16px] !rounded-[4px] !p-2.5 min-h-[44px] min-w-[155px] !text-[#808183] !justify-start">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33333 10.8203H4.66667C5.125 10.8203 5.5 10.4453 5.5 9.98698C5.5 9.52865 5.125 9.15365 4.66667 9.15365H1.33333C0.875 9.15365 0.5 9.52865 0.5 9.98698C0.5 10.4453 0.875 10.8203 1.33333 10.8203ZM0.5 1.65365C0.5 2.11198 0.875 2.48698 1.33333 2.48698H14.6667C15.125 2.48698 15.5 2.11198 15.5 1.65365C15.5 1.19531 15.125 0.820312 14.6667 0.820312H1.33333C0.875 0.820312 0.5 1.19531 0.5 1.65365ZM1.33333 6.65365H9.66667C10.125 6.65365 10.5 6.27865 10.5 5.82031C10.5 5.36198 10.125 4.98698 9.66667 4.98698H1.33333C0.875 4.98698 0.5 5.36198 0.5 5.82031C0.5 6.27865 0.875 6.65365 1.33333 6.65365Z" fill="black"/>
                </svg>
                Sort by
            </Button>
            <Button type="primary" onClick={()=>setFlow(1)} className="!text-[16px] flex align-center gap-2.5 !rounded-[6px] px-4 min-h-[44px] min-w-[162px] !text-white">
              <span>+</span> Create New
            </Button>
          </div>
        </div>
        <div className='bg-[#E6F1FB] text-[14px] leading-[21px] tracking-[2%] flex items-center gap-[10px] p-[16px_20px] mb-4.5'> Name 
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
                <Button onClick={()=>handleUpdate(item)} 
                // icon={<EditOutlined />} 
                className="ctm-green-btn  min-w-[86px] !rounded-[25px] !font-medium !text-[14px] leading-[21px] !gap-[4px] p-[8px_12px] flex !h-9 border !border-[transparent]">
                <svg className="fill-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.2578 16.1724H2.9797C2.65207 16.1737 2.3275 16.1093 2.02524 15.9829C1.72298 15.8565 1.44917 15.6707 1.22005 15.4365C0.989234 15.204 0.806779 14.9281 0.683222 14.6247C0.559665 14.3213 0.497456 13.9964 0.500188 13.6689V4.3987C0.496102 4.07259 0.558538 3.74907 0.683682 3.4479C0.808825 3.14673 0.994051 2.87423 1.22804 2.64705C1.45571 2.41621 1.7278 2.23391 2.02788 2.11115C2.33189 1.98402 2.65818 1.91877 2.98769 1.91919H6.53899C6.69809 1.91919 6.85067 1.98239 6.96317 2.09489C7.07567 2.20739 7.13887 2.35997 7.13887 2.51907C7.13887 2.67817 7.07567 2.83075 6.96317 2.94325C6.85067 3.05575 6.69809 3.11895 6.53899 3.11895H2.98769C2.81566 3.12363 2.6455 3.15604 2.48379 3.21493C2.24811 3.31441 2.04715 3.48143 1.90624 3.69494C1.76533 3.90844 1.69077 4.15888 1.69195 4.4147V13.6849C1.68995 13.8567 1.72215 14.0272 1.78669 14.1865C1.85123 14.3458 1.94681 14.4907 2.06788 14.6127C2.18892 14.7328 2.33248 14.8278 2.49032 14.8923C2.64816 14.9568 2.81718 14.9895 2.98769 14.9886H12.2658C12.4362 14.9886 12.6042 14.9566 12.7617 14.8926C12.9186 14.8296 13.0603 14.7342 13.1777 14.6127C13.2992 14.4953 13.3946 14.3536 13.4576 14.1967C13.5283 14.0383 13.5638 13.8664 13.5616 13.6929V10.1416C13.5616 9.98246 13.6248 9.82988 13.7373 9.71738C13.8498 9.60488 14.0024 9.54168 14.1615 9.54168C14.3206 9.54168 14.4732 9.60488 14.5856 9.71738C14.6981 9.82988 14.7614 9.98246 14.7614 10.1416V13.7168C14.7627 14.0445 14.6983 14.369 14.5719 14.6713C14.4455 14.9736 14.2597 15.2474 14.0255 15.4765C13.7959 15.707 13.5244 15.8916 13.2257 16.0204C12.9161 16.1324 12.5874 16.1844 12.2578 16.1724Z" fill="#21BF7C"></path>
                  <path d="M16.3458 2.94296C16.2643 2.73702 16.1387 2.55139 15.9779 2.39907L14.2582 0.679414C14.1059 0.518601 13.9203 0.393028 13.7143 0.311488C13.4049 0.181091 13.0634 0.146448 12.7341 0.212033C12.4047 0.277617 12.1026 0.440416 11.8667 0.679414L10.499 2.04714V2.08713L4.30822 8.26991C3.99567 8.5846 3.82028 9.01014 3.82031 9.45367V11.1893C3.82242 11.6363 4.0009 12.0643 4.31694 12.3804C4.63299 12.6964 5.06103 12.8749 5.50798 12.877H7.24363C7.46402 12.8773 7.68225 12.8336 7.88552 12.7484C8.08879 12.6633 8.27302 12.5384 8.4274 12.3811L14.6182 6.19032L15.9939 4.81459C16.1555 4.66262 16.2818 4.47706 16.3618 4.2707C16.4534 4.06557 16.5007 3.84346 16.5007 3.61883C16.5007 3.3942 16.4534 3.17209 16.3618 2.96696L16.3458 2.94296ZM15.242 3.7828C15.2161 3.84323 15.178 3.89768 15.1301 3.94277L14.1543 4.91857L11.7547 2.51905L12.7385 1.53524C12.833 1.44385 12.959 1.3923 13.0905 1.39127C13.1538 1.39233 13.2164 1.40592 13.2744 1.43126C13.3363 1.45739 13.3896 1.49472 13.4344 1.54324L15.1621 3.2629C15.2056 3.30988 15.2408 3.36399 15.266 3.42287C15.2779 3.48362 15.2779 3.54608 15.266 3.60683C15.2691 3.66647 15.2609 3.72615 15.242 3.7828Z" fill="#21BF7C"></path>
                </svg>
                Edit
                </Button>
                <Button 
                  // icon={<EyeOutlined />} 
                  onClick={()=>handleDuplicate(item.id)}  
                  className="ctm-blue-btn !rounded-[25px] !font-medium !!text-[14px] leading-[21px] !gap-[4px] p-[8px_12px] flex !h-9 border !border-[transparent]">
                  <svg className="fill-svg" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 0.429688H9.444C7.606 0.429688 6.15 0.429688 5.011 0.582688C3.839 0.740688 2.89 1.07269 2.141 1.82069C1.393 2.56969 1.061 3.51869 0.903 4.69069C0.75 5.83069 0.75 7.28569 0.75 9.12369V15.1797C0.749821 16.0732 1.06866 16.9373 1.6491 17.6166C2.22954 18.2959 3.03343 18.7455 3.916 18.8847C4.053 19.6487 4.318 20.3007 4.848 20.8317C5.45 21.4337 6.208 21.6917 7.108 21.8137C7.975 21.9297 9.078 21.9297 10.445 21.9297H13.555C14.922 21.9297 16.025 21.9297 16.892 21.8137C17.792 21.6917 18.55 21.4337 19.152 20.8317C19.754 20.2297 20.012 19.4717 20.134 18.5717C20.25 17.7047 20.25 16.6017 20.25 15.2347V10.1247C20.25 8.75769 20.25 7.65469 20.134 6.78769C20.012 5.88769 19.754 5.12969 19.152 4.52769C18.621 3.99769 17.969 3.73269 17.205 3.59569C17.0659 2.71311 16.6162 1.90922 15.9369 1.32879C15.2577 0.748347 14.3935 0.429508 13.5 0.429688ZM15.63 3.45069C15.4779 3.00669 15.1909 2.62135 14.8089 2.34861C14.427 2.07588 13.9693 1.9294 13.5 1.92969H9.5C7.593 1.92969 6.239 1.93169 5.21 2.06969C4.205 2.20469 3.625 2.45869 3.202 2.88169C2.779 3.30469 2.525 3.88469 2.39 4.88969C2.252 5.91869 2.25 7.27269 2.25 9.17969V15.1797C2.24971 15.649 2.39619 16.1067 2.66892 16.4886C2.94166 16.8705 3.327 17.1576 3.771 17.3097C3.75 16.6997 3.75 16.0097 3.75 15.2347V10.1247C3.75 8.75769 3.75 7.65469 3.867 6.78769C3.987 5.88769 4.247 5.12969 4.848 4.52769C5.45 3.92569 6.208 3.66769 7.108 3.54669C7.975 3.42969 9.078 3.42969 10.445 3.42969H13.555C14.33 3.42969 15.02 3.42969 15.63 3.45069ZM5.908 5.58969C6.185 5.31269 6.573 5.13269 7.308 5.03369C8.062 4.93269 9.064 4.93069 10.499 4.93069H13.499C14.934 4.93069 15.935 4.93269 16.691 5.03369C17.425 5.13269 17.813 5.31369 18.09 5.58969C18.367 5.86669 18.547 6.25469 18.646 6.98969C18.747 7.74369 18.749 8.74569 18.749 10.1807V15.1807C18.749 16.6157 18.747 17.6167 18.646 18.3727C18.547 19.1067 18.366 19.4947 18.09 19.7717C17.813 20.0487 17.425 20.2287 16.69 20.3277C15.935 20.4287 14.934 20.4307 13.499 20.4307H10.499C9.064 20.4307 8.062 20.4287 7.307 20.3277C6.573 20.2287 6.185 20.0477 5.908 19.7717C5.631 19.4947 5.451 19.1067 5.352 18.3717C5.251 17.6167 5.249 16.6157 5.249 15.1807V10.1807C5.249 8.74569 5.251 7.74369 5.352 6.98869C5.451 6.25469 5.632 5.86669 5.908 5.58969Z" fill="#0087FF"/>
                  </svg>
                  Duplicate
                </Button>
                <Button 
                  // icon={<EyeOutlined />}   
                  onClick={()=>handleDelete(item.id)} 
                  className="ctm-red-btn !rounded-[25px] !font-medium !!text-[14px] leading-[21px] !gap-[7px] p-[8px_12px] flex !h-9 border !border-[transparent]">
                    <svg className="fill-svg" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.61601 16.1802C2.17134 16.1802 1.79101 16.0218 1.47501 15.7052C1.15901 15.3885 1.00067 15.0088 1.00001 14.5662V2.18016H0.500007C0.358007 2.18016 0.23934 2.13216 0.144007 2.03616C0.0486736 1.94016 0.000673516 1.82116 6.84931e-06 1.67916C-0.000659817 1.53716 0.0473403 1.41849 0.144007 1.32316C0.240674 1.22782 0.35934 1.18016 0.500007 1.18016H4.00001C4.00001 0.97349 4.07667 0.79349 4.23001 0.640156C4.38334 0.486823 4.56334 0.410156 4.77001 0.410156H9.23001C9.43667 0.410156 9.61668 0.486823 9.77001 0.640156C9.92334 0.79349 10 0.97349 10 1.18016H13.5C13.642 1.18016 13.7607 1.22816 13.856 1.32416C13.9513 1.42016 13.9993 1.53916 14 1.68116C14.0007 1.82316 13.9527 1.94182 13.856 2.03716C13.7593 2.13249 13.6407 2.18016 13.5 2.18016H13V14.5652C13 15.0092 12.8417 15.3892 12.525 15.7052C12.2083 16.0212 11.8283 16.1795 11.385 16.1802H2.61601ZM5.30801 13.1802C5.45001 13.1802 5.56901 13.1322 5.66501 13.0362C5.76101 12.9402 5.80867 12.8215 5.80801 12.6802V4.68016C5.80801 4.53816 5.76001 4.41949 5.66401 4.32416C5.56801 4.22882 5.44901 4.18082 5.30701 4.18016C5.16501 4.17949 5.04634 4.22749 4.95101 4.32416C4.85567 4.42082 4.80801 4.53949 4.80801 4.68016V12.6802C4.80801 12.8222 4.85601 12.9408 4.95201 13.0362C5.04801 13.1322 5.16667 13.1802 5.30801 13.1802ZM8.69301 13.1802C8.83501 13.1802 8.95367 13.1322 9.04901 13.0362C9.14434 12.9402 9.19201 12.8215 9.19201 12.6802V4.68016C9.19201 4.53816 9.14401 4.41949 9.04801 4.32416C8.95201 4.22816 8.83334 4.18016 8.69201 4.18016C8.55001 4.18016 8.43101 4.22816 8.33501 4.32416C8.23901 4.42016 8.19134 4.53882 8.19201 4.68016V12.6802C8.19201 12.8222 8.24001 12.9408 8.33601 13.0362C8.43201 13.1315 8.55101 13.1795 8.69301 13.1802Z" fill="#FF0000"/>
                    </svg>
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
   { flow === 1 && <KeywordPop containerRef={containerRef} setData={setData} handleCreate={handleCreate}  actionLoader={actionLoader} data={data}/>}
   { flow === 2 &&  <KeywordUpdatePop containerRef={containerRef}/>}
  
    </>
  )
}

export default Keywords
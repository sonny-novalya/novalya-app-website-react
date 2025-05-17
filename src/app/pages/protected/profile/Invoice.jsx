import  { useEffect, useState } from "react";
import { Table } from "antd";
import { BasicPlanIcon } from "../../common/icons/icons";
import useLoginUserDataStore from "../../../../store/loginuser/loginuserdata";
import { formatUnixDate } from "../../../../helpers/helper";

const Invoice = ({ userMail }) => {

  const {getInvoiceList,downloadInvoice} = useLoginUserDataStore()
  const [data,setData]=useState([])
  const [isLoading,setIsLoading]=useState(false)
   const checkCurr = (str,price)=>{
    price=price/100
  if (str.includes("USD")) {
    return `$${price}`
  }else{
    return `€${price}`
  }
  }
  const columns = [
    {
      title: "",
      dataIndex: "icon",
      key: "icon",
      render: () => (
        <BasicPlanIcon />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount_paid",
      key: "amount_paid",
        render :(val,row)=>(
        <>
          {checkCurr(row?.currency_code,val)  || 0}
        </>
      )
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render :(val)=>(
        <>
          {formatUnixDate(val)}
        </>
      )
    },
    {
      title: <span className="font-semibold">Invoice no</span>,
      dataIndex: "id",
      key: "id",
      render:(val)=>(
        <># {val}</>
      )
    },
    {
      title: <span className="font-semibold">Download</span>,
      dataIndex: "id",
      key: "id",
      render: (val) => (
        <button  className="flex cursor-pointer space-x-1.5 px-1.6 py-1 hover:bg-blur-300" onClick={()=>handleDownload(val)}>
        <span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17M7 11L12 16M12 16L17 11M12 16V4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
          <span>Download</span>
        </button>
      ),
    },
  ]

  useEffect(() => {
  fetchInvoiceData()
  }, [])

 

  const fetchInvoiceData = async()=>{
    setIsLoading(true)
    const  res = await getInvoiceList()
   if(res?.status === 200){
     setData(res?.data?.data)
   }
   setIsLoading(false)
  }

  const handleDownload = async(id)=>{
    setIsLoading(true)
    const  res = await downloadInvoice(id) 
    if (res?.status === 200) {
      const fileUrl = res?.data?.data?.download_url
      const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', ''); // You can set a specific filename if the backend doesn't force one
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }
    setIsLoading(false)
  }
  
  

 

  return (
    <div className="bg-white p-5 rounded-md rounded-tl-none shadow-md border border-[#0087FF33]">
      <p className="text-gray-600 text-[16px] mb-4">
        <span className="font-semibold">Email :</span> {userMail}
      </p>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={isLoading}
        className="custom-invoice-table"
      />

      <div className="flex justify-end mt-4 mr-20">
        <button className="px-10 py-1 bg-blue-500 text-white rounded-md">
          See more
        </button>
      </div>
    </div>
  );
};

export default Invoice;

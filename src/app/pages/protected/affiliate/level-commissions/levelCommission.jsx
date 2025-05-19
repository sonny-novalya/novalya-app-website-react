import { useEffect, useState } from 'react'
import "./levelCommission.css"
import { Table, Input, Select, Button } from "antd";
import useAffiliateStore from '../../../../../store/affiliate/affiliate';
import useUpgradeModalStore from '../../../../../store/modals/UpgradeToPro';
import UpgradeToProModal from '../AffiliateDashboardNew/UpgradeToProModal';
import useLoginUserDataStore from '../../../../../store/loginuser/loginuserdata';
import { months } from '../../../../../helpers/helperData';


const { Option } = Select;

const LevelCommission = () => {
  const { fetchCommissionData, affiliateComList, affiliateComLoader } = useAffiliateStore()
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();


  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [years, setYears] = useState([]);
  const [search, setSearch] = useState("")
  const [isPro, setIsPro] = useState(false)
  const { loginUserData, fetchLoginUserData } = useLoginUserDataStore();

  const data = affiliateComList?.filter(item => item?.sender?.toLowerCase().includes(search.toLowerCase()))
  const { showModal } = useUpgradeModalStore();

  const columns = [
    { title: "#", dataIndex: "indx", key: "key" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
    // { title: "Type", dataIndex: "type", key: "type" },
    // { title: "% Payout", dataIndex: "payout", key: "payout" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const handleAllYears = () => {
    const YearList = []
    for (let i = 2023; i <= currentYear; i++) {
      YearList.push({ label: i, value: i })
    }
    setYears(YearList)

  }


  useEffect(() => {
    fetchLoginUserData({});
  }, []);

  useEffect(() => {
    if (loginUserData?.user_type?.toLowerCase() !== "distributor") {
      setIsPro(true);
    } else {
      setIsPro(false);
    }
  }, [loginUserData]);
  
  useEffect(() => {
    const PayLoad = { month: selectedMonth, year: selectedYear }
    fetchCommissionData(PayLoad)
    handleAllYears()
  }, [])

  const onGo = () => {
    const PayLoad = { month: selectedMonth, year: selectedYear }
    fetchCommissionData(PayLoad)
  }


  if (!loginUserData) return

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">

        <h2 className="font-medium text-2xl mb-5">Level Commission</h2>
        <div className=' bg-white p-6 shadow rounded-md relative'>

        <div className="">

          <h2 className="text-lg font-semibold mb-4">Commission</h2>


          <div className="flex justify-between items-center my-4 gap-1">
            <div className="relative w-full">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>


            <div className="flex space-x-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="" disabled>All Years</option>
                {years.map((year) => (
                  <option key={year.value} value={year.value}>{year.label}</option>
                ))}
              </select>

            </div>
            <button onClick={onGo} className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300">Go</button>
          </div>
        </div>
                  {isPro && (
                    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                      <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium" onClick={showModal}>
                        Unlock to Pro
                      </button>
                    </div>
                  )}
        <Table columns={columns} dataSource={data} pagination={false} loading={affiliateComLoader} />
                </div>
        <UpgradeToProModal />
      </div>
    </>
  );
}



export default LevelCommission
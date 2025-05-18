import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { t } from "i18next";
import { useFbDeactivateListStore } from "../../../../../store/fb/deactivate-list";
import { DeleteOutlined } from "@ant-design/icons"; // Import the refresh icon

const Deactivated = () => {

  const [searchKeyword, setSearchKeyword] = useState("");
  const { deactivatedFriends, loading, error, totalRecords, fetchFbDeactivatedFriends, fbRemoveDeactivated } = useFbDeactivateListStore();
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 25
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFbDeactivatedFriends(pagination.current, pagination.pageSize);
  }, []);

    const columns = [
        {
          title: "Member",
          dataIndex: "user_name",
          width: 300,
          render: (_, record) => (
              <div className="flex items-center space-x-2">
                <a
                  href={`https://facebook.com/${record.fbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                  style={{gap:"10px"}}
                >
                  <img src={record.image} alt="" className="w-10 h-10 object-cover" style={{borderRadius: "4px"}} />
                  <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{record.user_name}</span>
                </a>
              </div>
          )
        },
        { 
          title: "Mutual Friends", 
          dataIndex: "mutual_friend",
          width: 220,
          render: (_, record) => (
            record.mutual_friend ? record.mutual_friend : 0
          )
        },
        { 
          title: "Gender", 
          dataIndex: "gender",
          width: 220,
          render: (_, record) => (
              record.gender ? record.gender === "male" ? "Male" : "Female" : "-"
          )
        },
        { 
          title: "Lives In", 
          dataIndex: "lived",
          render: (_, record) => (
            record?.lived?.trim() || "-"
          )
        }      
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
        console.log("Selected Row Keys:", selectedKeys);
      },
      // hideSelectAll: true,
    };

    const fetchNewPageData = async (page, pageSize) => {
      await fetchFbDeactivatedFriends(page, pageSize);
      setPagination((prev) => ({ ...prev, current: page, pageSize }));
    };

    const applySearch = async (value) => {
      setSearchKeyword(value);
      await fetchFbDeactivatedFriends(1, pagination.pageSize, value);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }

    return (
      <>
        <div className="pl-10 pr-8 py-8 bg-[#f2f2f2] h-screen overflow-auto">
        <h2 className="text-[24px] font-[500] mb-7 pl-7">List of Deactivated Friends</h2>
          <div className="bg-white p-2 p-5 rounded-[16px]">
            <div className="flex items-center justify-between mb-3">
                <Input
                    placeholder="Search novalya"
                    prefix={<SearchOutlined />}
                    value={searchKeyword}
                    onChange={(e) => applySearch(e.target.value)}
                    className="w-1/3 px-3 py-2 !rounded-[4px] border border-[#CCCDCD] min-h-[44px] ctm-search w-full max-w-[320px]"
                    
                />
                <Button 
                  className="px-5 py-[10px] min-h-[44px] gap-[10px] min-w-[120px] "
                  type="primary" 
                  danger
                  ghost
                  // icon={<DeleteOutlined />}
                  id="async_decativated"
                  attr-data={JSON.stringify({
                    userIds: selectedRowKeys,
                  })}
                >
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.52001 20.0001C2.96418 20.0001 2.48876 19.8022 2.09376 19.4063C1.69876 19.0105 1.50084 18.5359 1.50001 17.9826V2.5001H0.875009C0.697509 2.5001 0.549175 2.4401 0.430009 2.3201C0.310842 2.2001 0.250842 2.05135 0.250009 1.87385C0.249175 1.69635 0.309175 1.54801 0.430009 1.42885C0.550842 1.30968 0.699175 1.2501 0.875009 1.2501H5.25001C5.25001 0.991764 5.34584 0.766764 5.53751 0.575098C5.72917 0.383431 5.95418 0.287598 6.21251 0.287598H11.7875C12.0458 0.287598 12.2708 0.383431 12.4625 0.575098C12.6542 0.766764 12.75 0.991764 12.75 1.2501H17.125C17.3025 1.2501 17.4508 1.3101 17.57 1.4301C17.6892 1.5501 17.7492 1.69885 17.75 1.87635C17.7508 2.05385 17.6908 2.20218 17.57 2.32135C17.4492 2.44051 17.3008 2.5001 17.125 2.5001H16.5V17.9813C16.5 18.5364 16.3021 19.0113 15.9063 19.4063C15.5104 19.8013 15.0354 19.9993 14.4813 20.0001H3.52001ZM6.88501 16.2501C7.06251 16.2501 7.21126 16.1901 7.33126 16.0701C7.45126 15.9501 7.51084 15.8018 7.51001 15.6251V5.6251C7.51001 5.4476 7.45001 5.29926 7.33001 5.1801C7.21001 5.06093 7.06126 5.00093 6.88376 5.0001C6.70626 4.99926 6.55793 5.05926 6.43876 5.1801C6.31959 5.30093 6.26001 5.44927 6.26001 5.6251V15.6251C6.26001 15.8026 6.32001 15.9509 6.44001 16.0701C6.56001 16.1901 6.70834 16.2501 6.88501 16.2501ZM11.1163 16.2501C11.2938 16.2501 11.4421 16.1901 11.5613 16.0701C11.6804 15.9501 11.74 15.8018 11.74 15.6251V5.6251C11.74 5.4476 11.68 5.29926 11.56 5.1801C11.44 5.0601 11.2917 5.0001 11.115 5.0001C10.9375 5.0001 10.7888 5.0601 10.6688 5.1801C10.5488 5.3001 10.4892 5.44843 10.49 5.6251V15.6251C10.49 15.8026 10.55 15.9509 10.67 16.0701C10.79 16.1893 10.9388 16.2493 11.1163 16.2501Z" fill="#FF0000"/>
                  </svg> <span className="text-[#FF0000] font-[500]">Delete</span>
                </Button>
            </div>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }} className="ctm-friend-table">
              <Table 
                rowKey="id" 
                rowSelection={rowSelection}
                columns={columns} 
                dataSource={deactivatedFriends} 
                loading={loading}
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: totalRecords, 
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50'],
                  showTotal: (total, range) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      {/* <span>{range[0]}-{range[1]} of {total}</span> */}
                      {selectedRowKeys.length > 0 && (
                        <span style={{ fontWeight: 'bold' }}>
                          {selectedRowKeys.length} rows selected
                        </span>
                      )}
                    </div>
                  ),
                }}
                onChange={(pagination) => fetchNewPageData(pagination.current, pagination.pageSize)}
                className="custom-table" 
              />
            </div>
          </div>
        </div>
      </>
    );
}

export default Deactivated;
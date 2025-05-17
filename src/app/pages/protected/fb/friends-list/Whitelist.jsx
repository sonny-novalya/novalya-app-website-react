import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { t } from "i18next";
import { useFbWhiteListStore } from "../../../../../store/fb/whitelist";
import { CloseOutlined } from "@ant-design/icons"; // Import the refresh icon
import { message } from "antd";

const Whitelist = () => {

    const [searchKeyword, setSearchKeyword] = useState("");
    const { whitelistedFriends, loading, error, totalRecords, fetchFbWhitelistedFriends, removeFbWhitelist } = useFbWhiteListStore();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 25
    });
    const navigate = useNavigate();

    useEffect(() => {
      fetchFbWhitelistedFriends(pagination.current, pagination.pageSize);
    }, []);

    const removeWhitelist = async () => {

      console.log("abc")
      if(selectedRowKeys.length == 0){
        message.error("Select user(s) first.")
        return
      }
      
      removeFbWhitelist(selectedRowKeys).then(() => {
        setSelectedRowKeys([]);
        message.success("User removed from Whitelist");
        fetchFbWhitelistedFriends(1, pagination.pageSize,searchKeyword);
        setPagination((prev) => ({ ...prev, current: 1 }));
      })
      .catch((error) => {
        console.log("Error removing from whitelist:", error); // Handle errors properly
        message.error("There was an error")
      });;
    }

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
            record.mutual_friends ? record.mutual_friends : 0
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
      await fetchFbWhitelistedFriends(page, pageSize);
      setPagination((prev) => ({ ...prev, current: page, pageSize }));
    };

    const applySearch = async (value) => {
      setSearchKeyword(value);
      await fetchFbWhitelistedFriends(1, pagination.pageSize, value);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }

    return (
      <>
        <div className="pl-10 pr-8 py-8 bg-[#f2f2f2] h-screen overflow-auto">
        <h2 className="text-[24px] font-[500] mb-7 pl-7">List of Whitelisted Friends</h2>
          <div className="bg-white p-5 rounded-[16px]">
            
            <div className="flex items-center justify-between mb-4">
                <Input
                    placeholder="Search novalya"
                    prefix={<SearchOutlined />}
                    value={searchKeyword}
                    onChange={(e) => applySearch(e.target.value)}
                    className="w-1/3 px-3 py-2 !rounded-[4px] border border-[#CCCDCD] min-h-[44px] ctm-search w-full max-w-[320px]"
                   
                />
                <Button 
                  className="px-5 py-[10px] min-h-[44px] gap-[10px] min-w-[110px]"
                  type="primary" 
                  danger
                  ghost
                  icon={<CloseOutlined />}
                  onClick={removeWhitelist}
                >
                  Remove
                </Button>
            </div>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }} className="ctm-friend-table">
              <Table 
                rowKey="id" 
                rowSelection={rowSelection}
                columns={columns} 
                dataSource={whitelistedFriends} 
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

export default Whitelist;



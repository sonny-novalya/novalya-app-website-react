import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { t } from "i18next";
import FbFriendListLayout from "../../helpersLayout/FbFriendListLayout";
import { useFbWhiteListStore } from "../../../../../store/fb/whitelist";
import { CloseOutlined } from "@ant-design/icons"; // Import the refresh icon

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
        alert("Select user(s) first.")
        return
      }
      
      removeFbWhitelist(selectedRowKeys).then(() => {
        setSelectedRowKeys([]);
        alert("User removed from Whitelist");
        fetchFbWhitelistedFriends(1, pagination.pageSize,searchKeyword);
        setPagination((prev) => ({ ...prev, current: 1 }));
      })
      .catch((error) => {
        console.log("Error removing from whitelist:", error); // Handle errors properly
        alert("There was an error")
      });;
    }

    const columns = [
        {
          title: "Member",
          dataIndex: "user_name",
          render: (_, record) => (
              <div className="flex items-center space-x-2">
                  <img src={record.image} alt="" className="w-10 h-10 object-cover" style={{borderRadius: "4px"}} />
                  <span className="font-semibold max-w-72 overflow-hidden text-ellipsis whitespace-nowrap">{record.user_name}</span>
              </div>
          )
        },
        { 
          title: "Mutual Friends", 
          dataIndex: "mutual_friend",
          render: (_, record) => (
            record.mutual_friend ? record.mutual_friend : 0
          )
        },
        { 
          title: "Gender", 
          dataIndex: "gender",
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
      <FbFriendListLayout>
        <div className="bg-white p-2">
          
          <div className="flex items-center justify-between mb-4">
              <Input
                  placeholder="Search novalya"
                  prefix={<SearchOutlined />}
                  value={searchKeyword}
                  onChange={(e) => applySearch(e.target.value)}
                  className="w-1/3 px-3 py-2 rounded-md border border-gray-300"
                  style={{maxWidth: "290px"}}
              />
              <Button 
                type="primary" 
                danger
                ghost
                icon={<CloseOutlined />}
                onClick={removeWhitelist}
              >
                Remove
              </Button>
          </div>
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
            }}
            onChange={(pagination) => fetchNewPageData(pagination.current, pagination.pageSize)}
            className="custom-table"  
          />
        </div>
      </FbFriendListLayout>
    );
}

export default Whitelist;



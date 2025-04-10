import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { t } from "i18next";
import FbFriendListLayout from "../../helpersLayout/FbFriendListLayout";
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
      await fetchFbDeactivatedFriends(page, pageSize);
      setPagination((prev) => ({ ...prev, current: page, pageSize }));
    };

    const applySearch = async (value) => {
      setSearchKeyword(value);
      await fetchFbDeactivatedFriends(1, pagination.pageSize, value);
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
                icon={<DeleteOutlined />}
                id="async_decativated"
                attr-data={JSON.stringify({
                  userIds: selectedRowKeys,
                })}
              >
                Delete
              </Button>
          </div>
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
            }}
            onChange={(pagination) => fetchNewPageData(pagination.current, pagination.pageSize)}
            className="custom-table" 
          />
        </div>
      </FbFriendListLayout>
    );
}

export default Deactivated;
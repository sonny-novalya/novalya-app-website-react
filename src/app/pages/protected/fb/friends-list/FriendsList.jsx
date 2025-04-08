import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFbFriendListStore } from "../../../../../store/fb/friend-list";
import { t } from "i18next";
import FbFriendListLayout from "../../helpersLayout/FbFriendListLayout";
import { ReloadOutlined } from "@ant-design/icons"; // Import the refresh icon
import AssignGroupModal from "./AssignGroupModal";

const FriendsList = () => {

    const [searchKeyword, setSearchKeyword] = useState("")
    const [isPremium, setIsPremium] = useState(false);
    const { friends, loading, error, totalRecords, fetchFbFriends, fbAddToWhitelist } = useFbFriendListStore();
    // const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedProfileIds, setSelectedProfileIds] = useState([]);

    const [openAssignGroupModal, setOpenAssignGroupModal] = useState(false);
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 25
    });
    const navigate = useNavigate();

    
    useEffect(() => {
      fetchFbFriends(pagination.current, pagination.pageSize);
    }, []);


    const fakeDataMap = {
      gender: ["Male", "Female"],
      age: ["18", "22", "25", "28", "30", "35", "40", "45", "50", "55"],
      birthday: [
        "1990-01-15", "1995-06-22", "1988-09-10", "2000-03-05", "1992-12-30",
        "1985-07-17", "1998-11-25", "1993-05-14", "2001-08-09", "1996-04-21"
      ],
      hometown: ["New York", "Paris", "Tokyo", "Sydney", "Berlin", "Toronto", "Los Angeles", "Mumbai", "London", "Dubai"],
      lived: ["USA", "France", "Japan", "Australia", "Germany", "Canada", "India", "UK", "UAE", "Brazil"],
      locale: ["English", "French", "Japanese", "Spanish", "German", "Chinese", "Russian", "Portuguese", "Arabic", "Italian"],
      email: [
        "user1@example.com", "john.doe@gmail.com", "alice.smith@yahoo.com", "random.person@outlook.com",
        "demo.account@live.com", "test.user@mail.com", "contact.me@aol.com", "guest.email@ymail.com",
        "someone.else@protonmail.com", "trial.account@gmail.com"
      ],
      contact: [
        "+1 202-555-0123", "+44 7911 123456", "+91 98765 43210", "+33 6 12 34 56 78", "+49 151 12345678",
        "+61 400 123 456", "+81 90-1234-5678", "+55 21 99999-9999", "+971 50 123 4567", "+86 138 1234 5678"
      ]
    };
    
    
    // Function to Get Random Fake Data
    const getFakeData = (key) => {
      const values = fakeDataMap[key];
      return values ? values[Math.floor(Math.random() * values.length)] : "Unknown";
    };

    function getLanguageName(locale) {
      try {
        return new Intl.DisplayNames(['en'], { type: 'language' }).of(locale.split('_')[0]);
      } catch (error) {
        console.error('Invalid locale:', locale);
        return null;
      }
    }

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
          title: "Tag", 
          dataIndex: "taggedusers",
          render: (_, record) => {
            const tag = record.taggedusers ? record.taggedusers?.assignTag : null;
            return tag ? (
              <span
                className="fb-group-icon"
                style={{
                  border: "1px solid",
                  borderColor: tag.custom_color,
                  color: tag.custom_color,
                }}
              >
                {tag.name?.slice(0, 2).toUpperCase()}
              </span>
            ) : null;
          }
        },
        { 
          title: "Mutual Friends", 
          dataIndex: "mutual_friend"
        },
        { 
          title: "Gender", 
          dataIndex: "gender",
          render: (_, record) => (
              isPremium ? record.gender ? record.gender === "male" ? "Male" : "Female" : "-" : getFakeData("gender")
          )
        },
        { 
          title: "Birthday", 
          dataIndex: "birthday",
          render: (_, record) => (
            isPremium ? record?.birthday?.trim() || "-" : getFakeData("birthday")
          )
        },
        { 
          title: "Age", 
          dataIndex: "age",
          render: (_, record) => (
            isPremium ? record?.age?.trim() || "-" : getFakeData("age")
          )
        },
        { 
          title: "Hometown", 
          dataIndex: "hometown",
          render: (_, record) => (
            isPremium ? record.hometown?.trim() || "-" : getFakeData("hometown")
          )
        },
        { 
          title: "Lives In", 
          dataIndex: "lived",
          render: (_, record) => (
            isPremium ? record.lived?.trim() || "-" : getFakeData("lived")
          )
        },
        { 
          title: "Locale", 
          dataIndex: "locale",
          render: (_, record) => (
            isPremium ? record?.locale ? getLanguageName(record?.locale) : "-" : getFakeData("locale")
          )
        },
        { 
          title: "Email", 
          dataIndex: "email",
          render: (_, record) => (
            isPremium ? record.email?.trim() || "-" : getFakeData("email")
          )
        },
        { 
          title: "Phone", 
          dataIndex: "contact",
          render: (_, record) => (
            isPremium ? record.contact?.trim() || "-" : getFakeData("contact")
          )
        }        
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
        console.log("Selected Row Keys:", selectedKeys);
        prepareProfileSyncingIds(selectedKeys)
      },
    };

    const prepareProfileSyncingIds = (ids) => {
      const usernames = ids
      .map(id => {
        const match = friends.find(item => item.id === id);
        return match ? match.fbId : null;
      })
      .filter(username => username !== null); // Remove null values
      setSelectedProfileIds(usernames);
    }

    const showUpgradeAlert = () => {
      if(!isPremium){
        alert("Upgrade is required")
      }
    }
    

    const fetchNewPageData = async (page, pageSize) => {
      await fetchFbFriends(page, pageSize);
      setPagination((prev) => ({ ...prev, current: page, pageSize }));
    };

    const applySearch = async (value) => {
      setSearchKeyword(value);
      await fetchFbFriends(1, pagination.pageSize, value);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }



    const openGroupModal = () => {
      console.log("clicked")
      setOpenAssignGroupModal(true);
    }

    const addToWhitelist = () => {
      console.log(selectedRowKeys)
      if(selectedRowKeys.length == 0){
        return;
      } 

      fbAddToWhitelist(selectedRowKeys).then(() => {
        setSelectedRowKeys([]); // Clear selection
        alert("User Added to Whitelist");
      })
      .catch((error) => {
        console.log("Error adding to whitelist:", error); // Handle errors properly
        alert("There was an error")
      });


    }

    return (
      <FbFriendListLayout>
        <div className="bg-white p-2" style={{position:"relative"}}>
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
              ghost
              icon={<ReloadOutlined />}
              id="sync_fb_friends"
            >
              Start Process
            </Button>
          </div>
          <Table 
            rowKey="id" 
            rowSelection={rowSelection}
            columns={columns} 
            dataSource={friends} 
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

          {selectedRowKeys.length > 0 && <div className="overlayed-actions">
            <Button 
              type="primary" 
              ghost
              icon={<ReloadOutlined />}
              onClick={openGroupModal}
            >
              Add to group
            </Button>

            <Button 
              type="primary" 
              ghost
              icon={<ReloadOutlined />}
              id="async_unfriend"
              attr-data={JSON.stringify({
                userIds: selectedRowKeys,
              })}
            >
              Unfriend
            </Button>

            <Button 
              type="primary" 
              ghost
              icon={<ReloadOutlined />}
              onClick={addToWhitelist}
            >
              Add to Whitelist
            </Button>
            <Button 
              type="primary" 
              ghost
              icon={<ReloadOutlined />}
              id={isPremium ? "sync_friends_profiles" : ""}
              data-profiles={JSON.stringify(selectedProfileIds)}
              onClick={showUpgradeAlert}
            >
              Sync Details
            </Button>
          </div>}
        </div>


        {console.log('openAssignGroupModal', openAssignGroupModal)}
        {openAssignGroupModal && (
          <AssignGroupModal
            open={openAssignGroupModal}
            close={setOpenAssignGroupModal}
            usersToAdd={selectedRowKeys}
          />
        )}
      </FbFriendListLayout>
    );
}

export default FriendsList;

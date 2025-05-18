import { useEffect, useState } from "react";
import { Table, Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFbFriendListStore } from "../../../../../store/fb/friend-list";
import { t } from "i18next";
import { ReloadOutlined } from "@ant-design/icons"; // Import the refresh icon
import AssignGroupModal from "./AssignGroupModal";
import { message } from "antd";
import { upgradeToPremiumIcon } from "../../../common/icons/icons";
import './friendsList.css';


const FriendsList = () => {

    const [searchKeyword, setSearchKeyword] = useState("");
    // const [isPremium, setIsPremium] = useState(false);
    const { friends, loading, error, totalRecords, fetchFbFriends, fbAddToWhitelist, isPremium } = useFbFriendListStore();
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
        return null;
      }
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
          title: "Tag", 
          dataIndex: "taggedusers",
          width: 150,
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
          dataIndex: "mutual_friend",
          width: 150,
        },
        { 
          title: "Gender", 
          dataIndex: "gender",
          width: 150,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record.gender ? record.gender === "male" ? "Male" : "Female" : "-" : getFakeData("gender")}
            </div>
          )
        },
        { 
          title: "Birthday", 
          dataIndex: "birthday",
          width: 150,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record?.birthday?.trim() || "-" : getFakeData("birthday")}
            </div>
          )
        },
        { 
          title: "Age", 
          dataIndex: "age",
          width: 150,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record?.age?.trim() || "-" : getFakeData("age")}
            </div>
          )
        },
        { 
          title: "Hometown", 
          dataIndex: "hometown",
          width: 200,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record.hometown?.trim() || "-" : getFakeData("hometown")}
            </div>
          )
        },
        { 
          title: "Lives In", 
          dataIndex: "lived",
          width: 200,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record.lived?.trim() || "-" : getFakeData("lived")}
            </div>
          )
        },
        { 
          title: "Locale", 
          dataIndex: "locale",
          width: 150,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record?.locale ? getLanguageName(record?.locale) : "-" : getFakeData("locale")}
            </div>
          )
        },
        { 
          title: "Email", 
          dataIndex: "email",
          width: 200,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record.email?.trim() || "-" : getFakeData("email")}
            </div>
          )
        },
        { 
          title: "Phone", 
          dataIndex: "contact",
          width: 200,
          render: (_, record) => (
            <div className="blurry-effect">
              {isPremium ? record.contact?.trim() || "-" : getFakeData("contact")}
            </div>
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
        message.error("Upgrade is required")
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

    const refreshTableData = () => {
      fetchFbFriends(pagination.current, pagination.pageSize);
    }



    const openGroupModal = () => {
      setOpenAssignGroupModal(true);
    }

    const addToWhitelist = () => {
      if(selectedRowKeys.length == 0){
        return;
      } 

      fbAddToWhitelist(selectedRowKeys).then(() => {
        setSelectedRowKeys([]); // Clear selection
        message.success("User Added to Whitelist");
      })
      .catch((error) => {
        message.error("There was an error")
      });


    }


    return (
      <>
        <div className="pl-10 pr-8 py-8 bg-[#f2f2f2] h-screen overflow-auto">
          <h2 className="text-[24px] font-[500] mb-7 pl-7">List of Friends</h2>
          <div class="nv-content-wrapper"></div> {/* to display account syncing message */}
          <div className={`bg-white p-5 rounded-[16px]  ${!isPremium ? "friends-list-blurry" : ""}`} style={{position:"relative"}}>
            <div className="flex items-center justify-between mb-3">
              <Input
                  placeholder="Search novalya"
                  prefix={<SearchOutlined />}
                  value={searchKeyword}
                  onChange={(e) => applySearch(e.target.value)}
                  className="w-1/3 px-3 py-2 !rounded-[4px] border border-[#CCCDCD] min-h-[44px] ctm-search w-full max-w-[320px]"
              />
              <Button 
                className="px-5 py-[10px] min-h-[44px] gap-[10px] min-w-[130px]"
                type="primary" 
                ghost
                icon={<ReloadOutlined />}
                id="sync_fb_friends"
              >
                Start Process
              </Button>
            </div>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }} className="ctm-friend-table">
              {!isPremium && !loading && (friends.length > 0) && <div class='friends-list-bluredBtn'>
                  <button onClick={() => navigate('/upgrade')}
                    className="bg-[linear-gradient(to_bottom,_#005199,_#0087FF)] px-10 py-4 text-white rounded-lg flex items-center gap-[15px]"> {upgradeToPremiumIcon()} Upgrade to business</button> 
              </div>}
              <Table 
                rowKey="id" 
                rowSelection={rowSelection || []}
                columns={columns} 
                dataSource={friends} 
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
                scroll={{ x: 'max-content' }}
              />
            </div>
            {selectedRowKeys.length > 0 && <div className="overlayed-actions">
              <Button className="min-h-[50px] px-6 py-2 gap-2.5 rounded-[6px] flex border friend-group-btn"
                type="primary" 
                ghost
                onClick={openGroupModal}
              >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.00781 12.5001C7.00781 12.3012 7.08683 12.1104 7.22748 11.9698C7.36813 11.8291 7.5589 11.7501 7.75781 11.7501H11.2508V8.25708C11.2508 8.05817 11.3298 7.8674 11.4705 7.72675C11.6111 7.5861 11.8019 7.50708 12.0008 7.50708C12.1997 7.50708 12.3905 7.5861 12.5311 7.72675C12.6718 7.8674 12.7508 8.05817 12.7508 8.25708V11.7501H16.2438C16.4427 11.7501 16.6335 11.8291 16.7741 11.9698C16.9148 12.1104 16.9938 12.3012 16.9938 12.5001C16.9938 12.699 16.9148 12.8898 16.7741 13.0304C16.6335 13.1711 16.4427 13.2501 16.2438 13.2501H12.7508V16.7431C12.7508 16.942 12.6718 17.1328 12.5311 17.2734C12.3905 17.4141 12.1997 17.4931 12.0008 17.4931C11.8019 17.4931 11.6111 17.4141 11.4705 17.2734C11.3298 17.1328 11.2508 16.942 11.2508 16.7431V13.2501H7.75781C7.5589 13.2501 7.36813 13.1711 7.22748 13.0304C7.08683 12.8898 7.00781 12.699 7.00781 12.5001Z" fill="#7352C7"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.31569 4.26905C10.4282 3.92399 13.5692 3.92399 16.6817 4.26905C18.5087 4.47305 19.9837 5.91205 20.1977 7.74905C20.5677 10.906 20.5677 14.095 20.1977 17.252C19.9827 19.089 18.5077 20.527 16.6817 20.732C13.5692 21.0771 10.4282 21.0771 7.31569 20.732C5.48869 20.527 4.01369 19.089 3.79969 17.252C3.43135 14.0951 3.43135 10.906 3.79969 7.74905C4.01369 5.91205 5.48969 4.47305 7.31569 4.26905ZM16.5157 5.75905C13.5136 5.42627 10.4838 5.42627 7.48169 5.75905C6.92594 5.8207 6.4072 6.06792 6.00927 6.46076C5.61135 6.85361 5.35749 7.36913 5.28869 7.92405C4.93302 10.965 4.93302 14.0371 5.28869 17.078C5.3577 17.6328 5.61165 18.1481 6.00956 18.5407C6.40746 18.9334 6.92609 19.1804 7.48169 19.242C10.4587 19.574 13.5387 19.574 16.5157 19.242C17.0711 19.1802 17.5895 18.9331 17.9872 18.5404C18.3849 18.1478 18.6387 17.6326 18.7077 17.078C19.0634 14.0371 19.0634 10.965 18.7077 7.92405C18.6385 7.36964 18.3846 6.85469 17.9869 6.46227C17.5893 6.06985 17.071 5.82282 16.5157 5.76105" fill="#7352C7"/>
                </svg>

                <span className="text-[#7352C7]">Add to group</span>
              </Button>

              <Button className="min-h-[50px] px-6 py-2 gap-2.5 rounded-[6px] flex border friend-unfriend-btn" 
                type="primary" 
                ghost
                
                id="async_unfriend"
                attr-data={JSON.stringify({
                  userIds: selectedRowKeys,
                })}
              >
               <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.875 7.625L7.125 17.375M7.125 7.625L16.875 17.375" stroke="#FF0000" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

                <span className="text-[#FF0000]"> Unfriend</span>
              </Button>

              <Button className="min-h-[50px] px-6 py-2 gap-2.5 rounded-[6px] flex border friend-whitelist-btn"
                type="primary" 
                ghost
                onClick={addToWhitelist}
              >
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.50781 12.5001C7.50781 12.3012 7.58683 12.1104 7.72748 11.9698C7.86813 11.8291 8.0589 11.7501 8.25781 11.7501H11.7508V8.25708C11.7508 8.05817 11.8298 7.8674 11.9705 7.72675C12.1111 7.5861 12.3019 7.50708 12.5008 7.50708C12.6997 7.50708 12.8905 7.5861 13.0311 7.72675C13.1718 7.8674 13.2508 8.05817 13.2508 8.25708V11.7501H16.7438C16.9427 11.7501 17.1335 11.8291 17.2741 11.9698C17.4148 12.1104 17.4938 12.3012 17.4938 12.5001C17.4938 12.699 17.4148 12.8898 17.2741 13.0304C17.1335 13.1711 16.9427 13.2501 16.7438 13.2501H13.2508V16.7431C13.2508 16.942 13.1718 17.1328 13.0311 17.2734C12.8905 17.4141 12.6997 17.4931 12.5008 17.4931C12.3019 17.4931 12.1111 17.4141 11.9705 17.2734C11.8298 17.1328 11.7508 16.942 11.7508 16.7431V13.2501H8.25781C8.0589 13.2501 7.86813 13.1711 7.72748 13.0304C7.58683 12.8898 7.50781 12.699 7.50781 12.5001Z" fill="#21BF7C"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81569 4.26905C10.9282 3.92399 14.0692 3.92399 17.1817 4.26905C19.0087 4.47305 20.4837 5.91205 20.6977 7.74905C21.0677 10.906 21.0677 14.095 20.6977 17.252C20.4827 19.089 19.0077 20.527 17.1817 20.732C14.0692 21.0771 10.9282 21.0771 7.81569 20.732C5.98869 20.527 4.51369 19.089 4.29969 17.252C3.93135 14.0951 3.93135 10.906 4.29969 7.74905C4.51369 5.91205 5.98969 4.47305 7.81569 4.26905ZM17.0157 5.75905C14.0136 5.42627 10.9838 5.42627 7.98169 5.75905C7.42594 5.8207 6.9072 6.06792 6.50927 6.46076C6.11135 6.85361 5.85749 7.36913 5.78869 7.92405C5.43302 10.965 5.43302 14.0371 5.78869 17.078C5.8577 17.6328 6.11165 18.1481 6.50956 18.5407C6.90746 18.9334 7.42609 19.1804 7.98169 19.242C10.9587 19.574 14.0387 19.574 17.0157 19.242C17.5711 19.1802 18.0895 18.9331 18.4872 18.5404C18.8849 18.1478 19.1387 17.6326 19.2077 17.078C19.5634 14.0371 19.5634 10.965 19.2077 7.92405C19.1385 7.36964 18.8846 6.85469 18.4869 6.46227C18.0893 6.06985 17.571 5.82282 17.0157 5.76105" fill="#21BF7C"/>
                </svg>

                <span className="text-[#21BF7C]"> Add to Whitelist</span>
               
              </Button>
              <Button className="min-h-[50px] px-6 py-2 gap-2.5 rounded-[6px] flex border friend-sync-btn"
                type="primary" 
                ghost
                id={isPremium ? "sync_friends_profiles" : ""}
                data-profiles={JSON.stringify(selectedProfileIds)}
                onClick={showUpgradeAlert}
              >
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 11L21 3.5M21 3.5H16M21 3.5V8.5M21 14.5V19.5C21 20.0304 20.7893 20.5391 20.4142 20.9142C20.0391 21.2893 19.5304 21.5 19 21.5H5C4.46957 21.5 3.96086 21.2893 3.58579 20.9142C3.21071 20.5391 3 20.0304 3 19.5V5.5C3 4.96957 3.21071 4.46086 3.58579 4.08579C3.96086 3.71071 4.46957 3.5 5 3.5H10" stroke="#0087FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span className="text-[#0087FF]">Sync Details</span>
                
              </Button>
            </div>}
          </div>
        </div>


        {openAssignGroupModal && (
          <AssignGroupModal 
            open={openAssignGroupModal}
            close={() => setOpenAssignGroupModal(false)}
            selectedUsers={selectedRowKeys}
            clearSelection={() => setSelectedRowKeys([])}
            refreshTableData={refreshTableData}
          />
        )}
      </>
    );
}

export default FriendsList;

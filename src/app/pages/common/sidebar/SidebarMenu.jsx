import SidebarItem from "./SidebarItem";
import { useEffect, useRef, useState } from "react";
import {
    DashboardIcon,
    FacebookIcon,
    InstagramIcon,
    AiCommentsIcon,
    LibraryIcon,
    TrainingVideosIcon,
    AffiliateIcon,
    // EventsIcon,
    UpgradeProIcon,
    UpperArrowIcon,
    DownArrowIcon,
    LogoutIcon,
    FriendlistIcon,
    CollapsedLeftIcon
} from "../icons/icons";
import NovaBlueLogo from "../../../../assets/img/nova-blue.png"
import SidebarActive from "../../../../assets/img/sidebar-active.jpeg"
import NovalyaBlueLogo from "../../../../assets/img/novalya-blue.png"
import LocalizationOptions from "../../../../helpers/shared/LocalizationOptions";
import { useLocation, useNavigate } from "react-router-dom";
import LocalizationOptionsIcons from "../../../../helpers/shared/LocalizationOptionsIcons";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { removeAllCookies } from "../../../../helpers/helper";
import useLoginUserDataStore from "../../../../store/loginuser/loginuserdata";

const SidebarMenu = () => {
    const [openSubNav, setOpenSubNav] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const toggleSidebar = () => setCollapsed(!collapsed);

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('loginUserData');
        removeAllCookies();
        window.location.reload()

    };

    const { loginUserData, fetchLoginUserData } = useLoginUserDataStore();

    const getUpdatedImageUrl = (url) => {
        if (!url) return '';
        const stagingBase = "https://stagingbackend.novalya.com";
        const prodBase = "https://api-v2.novalya.com";
        return url.includes(stagingBase) ? url.replace(stagingBase, prodBase) : url;
    };

    useEffect(() => {
        if (!loginUserData) {
            fetchLoginUserData();
        }
    }, [loginUserData, fetchLoginUserData]);

    const userData = loginUserData ? {
        name: `${loginUserData.firstname} ${loginUserData.lastname}`,
        url: getUpdatedImageUrl(loginUserData.profilepictureurl),
        plan: loginUserData.plan_pkg === "Unlimited_new"
            ? "Unlimited"
            : loginUserData.plan_pkg ?? "No Plan",
    } : null;

    const sidebarData = [
        { text: "dashboard", id: "dashboard", path: "/", icon: <DashboardIcon /> },
        {
            text: "facebook",
            id: "facebook",
            path: "/facebook",
            icon: <FacebookIcon />,
            subNav: [
                { text: "Prospecting", id: "prospecting", path: "/fb/prospecting" },
                { text: "Wish Birthday", id: "birthday", path: "/fb/birthday" },
                { text: "CRM", id: "crm", path: "/fb/crm" },
                { text: "Request", id: "fb-request", path: "/fb/request" },
            ]
        },
        {
            text: "instagram",
            id: "instagram",
            path: "/instagram",
            icon: <InstagramIcon />,
            subNav: [
                { text: "Prospecting", id: "prospecting", path: "/ig/prospecting" },
                { text: "CRM", id: "crm", path: "/ig/crm" },
            ]
        },
        { text: "AI Comments", id: "ai-comments", path: "/ai-comments", icon: <AiCommentsIcon /> },
        {
            text: "Library", id: "library", path: "/library/messages", icon: <LibraryIcon />,
            subNav: [
                { text: "Messages", id: "messages", path: "/library/messages" },
                { text: "Keywords", id: "keywords", path: "/library/keywords" },
            ]
        },
        // { text: "Training Videos", id: "training-videos", path: "/training-videos", icon: <TrainingVideosIcon /> },
        {
            text: "Affiliate",
            id: "affiliate",
            path: "/affiliate",
            icon: <AffiliateIcon />,
            subNav: [
                { text: "Dashboard", id: "af-Dashboard", path: "/affiliate/dashboard" },
                { text: "Level Commission", id: "af-commission", path: "/affiliate/level-commission" },
                { text: "Settings", id: "af-settings", path: "/affiliate/settings" },
            ]
        },
        {
            text: "FB Friendlist",
            id: "fb_friendlist",
            path: "/friendlist",
            icon: <FriendlistIcon />,
            subNav: [
                { text: "Friends", id: "fb-friends", path: "/friendlist/friends" },
                { text: "Unfriend", id: "fb-unfriend", path: "/friendlist/unfriend" },
                { text: "Deactivated", id: "fb-deactivated", path: "/friendlist/deactivated" },
                { text: "Whitelist", id: "fb-whitelist", path: "/friendlist/whitelist" }
            ]
        },
        // { text: "Up-Coming Events", id: "up-coming-events", path: "/up-coming-events", icon: <EventsIcon /> },
    ];
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current) {
            for (const item of sidebarData) {
                if (item.subNav?.some(subItem => (subItem.path === currentPath || `${subItem.path}/` === currentPath))) {
                    setOpenSubNav(item.id);
                    break;
                }
            }
            hasInitialized.current = true;
        }
    }, [currentPath]);

    const toggleSubNav = (e, id) => {
        e.preventDefault();
        setOpenSubNav(openSubNav === id ? null : id);
    };

    return (
        <div className={`relative `}>
            <div className={`bg-white text-black ${collapsed ? 'w-20' : 'w-63'} h-screen flex flex-col transition-all duration-300 relative overflow-visible`}>
                {
                    collapsed
                        ? <>
                        <div className={`flex items-center justify-between h-23 border-b border-[#0000001A] mb-4`}>
                            <img src={NovaBlueLogo} alt="logo" className={`w-full object-contain h-12`} />
                            <button onClick={toggleSidebar} className="absolute top-14 -right-3 z-50 bg-[#167AD3] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md scale-90 hover:scale-100 transition cursor-pointer">
                                <div className={`transition-transform duration-300 rotate-180`}>
                                    <CollapsedLeftIcon />
                                </div>
                            </button>
                        </div>

                            <div className="flex-1 overflow-y-auto hide_scrollbar px-4 ">
                            {sidebarData.map((item) => {
                                const isSubItemActive = item.subNav?.some(subItem => (currentPath === subItem.path || currentPath === `${subItem.path}/`));
                                const isActive = (currentPath === item.path || currentPath === `${item.path}/`) || isSubItemActive;

                                return (
                                    <div key={item.id} className="w-full mb-2 relative group">
                                        {item.subNav && collapsed ? (
                                            <Dropdown
                                                placement="rightTop"
                                                trigger={["click"]}
                                                overlay={
                                                    <Menu>
                                                        {item.subNav.map((subItem) => (
                                                            <Menu.Item key={subItem.id}>
                                                                <Link to={subItem.path} className={(currentPath === subItem.path || currentPath === `${subItem.path}/`) ? 'text-[#167AD3] ' : ''}>
                                                                    {subItem.text}
                                                                </Link>
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu>
                                                }
                                            >
                                                <button
                                                    className={`w-full rounded-[8px] px-3 py-3 flex justify-center items-center ${isActive ? 'bg-[#E6F1FB] text-[#167AD3]' : 'hover:bg-[#E6F1FB]'} cursor-pointer`}
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <span className="h-6 w-6">{item.icon}</span>
                                                </button>
                                            </Dropdown>
                                        ) : (
                                            <SidebarItem
                                                text={collapsed ? '' : item.text}
                                                path={item.path}
                                                icon={item.icon}
                                                isActive={(currentPath === item.path || currentPath === `${item.path}/`)}
                                            />
                                        )}

                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-auto flex flex-col items-center justify-center h-48 px-4 space-y-1">
                            <LocalizationOptionsIcons />
                            <div className="flex items-center justify-center mt-1 w-full cursor-pointer">
                                <UpgradeProIcon />
                            </div>
                            <div className="flex items-center justify-center mt-2 w-full">
                                {userData?.url ? (
                                    <img src={userData.url} className="h-10 w-10 rounded-sm" alt="user img" />
                                ) : (
                                        <div className="h-10 w-12 rounded-lg bg-purple-200  flex items-center justify-center">
                                        {userData?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                    className="flex items-center justify-center hover:bg-[#FF000012] w-12 p-2 mt-2 rounded-lg cursor-pointer  text-[#00000055] hover:text-[#00000085]"
                                onClick={onLogout}
                            >
                                <LogoutIcon />
                            </button>
                        </div>
                    </>
                        : <>
                        <div className={`flex items-center justify-between h-23 border-b border-[#0000001A] mb-7 relative`}>
                            <img src={NovalyaBlueLogo} alt="logo" className={`mx-auto w-full max-w-[186px] object-contain h-12`} />

                            <button onClick={toggleSidebar} className="absolute top-14 -right-3 z-50 bg-[#167AD3] text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md scale-90 hover:scale-100 transition cursor-pointer">
                                    <div className={`transition-transform duration-300 `}>
                                    <CollapsedLeftIcon />
                                </div>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto hide_scrollbar px-4">
                            {sidebarData.map((item) => {
                                const isSubItemActive = item.subNav?.some(subItem => (currentPath === subItem.path || currentPath === `${subItem.path}/`));
                                    const isActive = ( currentPath === item.path ||  currentPath === `${item.path}/`) || isSubItemActive;
                                const shouldSubNavOpen = openSubNav === item.id || isSubItemActive;

                                return (
                                        <div key={item.id} className="w-full mb-2 ">
                                        {item.subNav ? (
                                            <>
                                                <button

                                                        className={`w-full rounded-[8px] px-4 py-3 flex justify-between items-center  ${isActive ? 'bg-[#E6F1FB] text-[#167AD3]' : 'hover:bg-[#E6F1FB]'} cursor-pointer`}
                                                    onClick={(e) => toggleSubNav(e, item.id)}
                                                >
                                                    <div className="flex items-center space-x-5">
                                                        <span className="sidebar-icons h-6 w-6 flex items-enter justify-center">{item.icon}</span>
                                                        {!collapsed && (
                                                            <span className="capitalize text-black/45 font-[500]">{item.text}</span>
                                                        )}
                                                    </div>
                                                    {!collapsed && (
                                                        <span>{shouldSubNavOpen ? <UpperArrowIcon /> : <DownArrowIcon />}</span>
                                                    )}
                                                </button>

                                                    {/* SubNav items */}
                                                {shouldSubNavOpen && (
                                                    <div className={`pl-${collapsed ? '4' : '6'} my-3 pl-2 ml-[28px] flex flex-col space-y-1 border-l border-[#E6F1FB]`}>
                                                        {item.subNav.map((subItem) => (
                                                            <SidebarItem
                                                                key={subItem.id}
                                                                text={collapsed ? '' : subItem.text}
                                                                path={subItem.path}
                                                                isActive={(currentPath === subItem.path || currentPath === `${subItem.path}/`)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                {item.id === 'instagram' && <div className="h-[1px] bg-[#0000001A] w-full mt-3 scale-125" />}
                                            </>
                                        ) : (
                                            <SidebarItem
                                                text={collapsed ? '' : item.text}
                                                path={item.path}
                                                icon={item.icon}
                                                isActive={(currentPath === item.path || currentPath === `${item.path}/`)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-auto flex flex-col items-center justify-center px-4 gap-[8px] border-t border-t-[rgba(0,0,0,0.1)] pt-[12px]">
                            <div className="w-full mb-0 sidebar-lang">
                                <span className="font-[500]"><LocalizationOptions /> </span>
                            </div>
                                <div className="flex gap-5 items-center w-full px-3.5 py-3 text-black/45 font-[500] cursor-pointer" onClick={()=>navigate("/upgrade")}>
                                <span className="sidebar-icons h-6 w-6 flex items-enter justify-center"><UpgradeProIcon /></span>
                                Upgrade To Pro
                            </div>
                                <div className="flex space-x-3.5 items-center px-3 w-full mb-0 cursor-pointer hover:bg-blue-50" onClick={()=> navigate('/profile')}>
                                {userData?.url ? (
                                    <img src={userData.url} className="h-7.5 w-7.5 rounded-sm" alt="user img" />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-300 flex items-center justify-center text-white font-bold text-lg rounded-sm">
                                        {userData?.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="flex flex-col text-sm">
                                    <span className="text-[22px] font-[500] whitespace-nowrap overflow-hidden text-ellipsis w-[175px]">{userData?.name}</span>
                                    <span className="text-[13px] text-[#167AD3]">{userData?.plan}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex items-center space-x-5 hover:bg-[#FF000012] logout px-4 py-3 rounded-[8px] w-full cursor-pointer bg-white text-black/55 hover:text-[#00000085]"
                                onClick={onLogout}
                            >
                                <LogoutIcon />
                                    <span className="text-[16px] ">Logout</span>
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default SidebarMenu;

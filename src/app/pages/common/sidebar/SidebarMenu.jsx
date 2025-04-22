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

const SidebarMenu = () => {
    const [openSubNav, setOpenSubNav] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const toggleSidebar = () => setCollapsed(!collapsed);

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedLocale');
        navigate("/login");
    };

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
        { text: "Training Videos", id: "training-videos", path: "/training-videos", icon: <TrainingVideosIcon /> },
        { text: "Affiliate", id: "affiliate", path: "/affiliate", icon: <AffiliateIcon /> },
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
                                <div className="">
                                    <img src={NovaBlueLogo} alt="logo" className={`w-full object-contain h-12`} />
                                </div>
                                <button onClick={toggleSidebar} className="absolute top-12 -right-3 z-50 bg-[#167AD3] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-md scale-90 hover:scale-100 transition cursor-pointer">
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

                                                        className={`w-full rounded-[8px] px-3 py-3 flex justify-center items-center ${isActive ? 'bg-[#E6F1FB] text-[#167AD3]' : 'hover:bg-[#E6F1FB]'

                                                            } cursor-pointer`}
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
                                <div className="flex items-center justify-center mt-1 w-full ">
                                    <UpgradeProIcon />
                                </div>
                                <div className="flex items-center justify-center mt-2 w-full">
                                    <span className="h-10 w-12 rounded-lg bg-purple-200  flex items-center justify-center">
                                        J
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-[#FF000012] w-12 p-2 mt-2 rounded-lg cursor-pointer hover:bg-[#FF000018] text-[#00000055] hover:text-[#00000085]"
                                    onClick={onLogout}
                                >
                                    <LogoutIcon />
                                </button>
                            </div>
                        </>
                        : <>
                            <div className={`flex items-center justify-between h-23 border-b border-[#0000001A] mb-7 relative`}>
                                <img src={NovalyaBlueLogo} alt="logo" className={`mx-auto w-full max-w-[186px] object-contain h-12`} />
                                
                                <button onClick={toggleSidebar} className="absolute top-16 -right-3 z-50 bg-[#167AD3] text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md scale-90 hover:scale-100 transition cursor-pointer">
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
                                        <div key={item.id} className="w-full mb-2">
                                            {item.subNav ? (
                                                <>
                                                    <button

                                                        className={`w-full rounded-[8px] px-4 py-3 flex justify-between items-center ${isActive ? 'bg-[#E6F1FB] text-[#167AD3]' : 'hover:bg-[#E6F1FB]'

                                                            } cursor-pointer`}
                                                        onClick={(e) => toggleSubNav(e, item.id)}
                                                    >
                                                        <div className="flex items-center space-x-5">
                                                            <span className="h-6 w-6 flex items-enter justify-center">{item.icon}</span>
                                                            {!collapsed && (
                                                                <span className="capitalize text-black/55">{item.text}</span>
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
                            <div className="mt-auto flex flex-col items-center justify-center px-4  gap-[20px] mb-2 border-t border-t-[rgba(0,0,0,0.1)] pt-[12px]">
                                <div className="w-full mb-0 sidebar-lang">
                                    <LocalizationOptions />
                                </div>
                                <div className="flex gap-5 items-center w-full px-2 mt-1 mb-2">
                                    <UpgradeProIcon />
                                    <span className="text-base text-[#00000073]">Upgrade To Pro</span>
                                </div>
                                <div className="flex space-x-3 items-center w-full mb-0">
                                    <span className="h-10 w-10 rounded-lg bg-purple-200 flex items-center justify-center">
                                        J
                                    </span>
                                    <div className="flex flex-col text-sm">
                                        <span className="text-[24px] font-[500]">Anima Ag.</span>
                                        <span className="text-[13px] text-[#167AD3]">Basic Plan</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center space-x-5 bg-[#FF000012] px-4 py-3 rounded-[8px] w-full cursor-pointer hover:bg-[#FF000018] text-[#00000055] hover:text-[#00000085]"
                                    onClick={onLogout}
                                >
                                    <LogoutIcon />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default SidebarMenu;

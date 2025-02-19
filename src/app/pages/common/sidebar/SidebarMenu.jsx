import SidebarItem from "./SidebarItem";
import { useState } from "react";
import {
    DashboardIcon,
    FacebookIcon,
    InstagramIcon,
    AiCommentsIcon,
    LibraryIcon,
    TrainingVideosIcon,
    AffiliateIcon,
    EventsIcon,
    NovalyaFullBlackLogo,
    UpgradeProIcon,
    UpperArrowIcon,
    DownArrowIcon
} from "../icons/icons"; // Import icons

const SidebarMenu = () => {
    const [openSubNav, setOpenSubNav] = useState(null);

    const sidebarData = [
        { text: "dashboard", id: "dashboard", path: "/", icon: <DashboardIcon /> },
        {
            text: "facebook",
            id: "facebook",
            path: "/facebook",
            icon: <FacebookIcon />,
            subNav: [
                { text: "Prospecting", id: "prospecting", path: "/fb/prospecting" },
                { text: "Wish Birthday", id: "wish-birthday", path: "/fb/wish-birthday" },
                { text: "CRM", id: "crm", path: "/fb/crm" },
                { text: "FB Friends list", id: "fb-friends-list", path: "/fb/friends-list" },
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
        { text: "Library", id: "library", path: "/library", icon: <LibraryIcon /> },
        { text: "Training Videos", id: "training-videos", path: "/training-videos", icon: <TrainingVideosIcon /> },
        { text: "Affiliate", id: "affiliate", path: "/affiliate", icon: <AffiliateIcon /> },
        { text: "Up-Coming Events", id: "up-coming-events", path: "/up-coming-events", icon: <EventsIcon /> },
    ];

    const toggleSubNav = (event, id) => {
        event.preventDefault(); // Stop navigation if clicking on submenu toggle
        setOpenSubNav(openSubNav === id ? null : id);
    };

    return (
        <div className="bg-white text-black w-64 h-screen flex flex-col">
            <div className="flex items-center justify-center h-24 shrink-0">
                <NovalyaFullBlackLogo />
            </div>

            <div className="flex-1 overflow-y-auto hide_scrollbar px-4">
                {sidebarData.map((item) => (
                    <div key={item.id} className="w-full">
                        {item.subNav ? (
                            <button
                                className="w-full rounded px-3 py-2 flex justify-between items-center hover:bg-[#E6F1FB] cursor-pointer"
                                onClick={(e) => toggleSubNav(e, item.id)}
                            >
                                <div className="flex items-center space-x-5">
                                    <span className="h-6 w-6">{item.icon}</span>
                                    <span className="capitalize text-black/55">{item.text}</span>
                                </div>
                                <span>
                                    {
                                        openSubNav === item.id 
                                        ? <UpperArrowIcon/> 
                                        : <DownArrowIcon />
                                    }
                                </span>
                            </button>
                        ) : (
                            <SidebarItem text={item.text} path={item.path} icon={item.icon} />
                        )}
                        {item.subNav && openSubNav === item.id && (
                            <div className="pl-[45px] pr-2.5 mt-1 flex flex-col space-y-1">
                                {item.subNav.map((subItem) => (
                                    <SidebarItem key={subItem.id} text={subItem.text} path={subItem.path} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto flex flex-col items-center justify-center h-40 shrink-0">
                <div className="flex space-x-5">
                    <UpgradeProIcon />
                    <span>Upgrade To Pro</span>
                </div>
                <div className="flex space-x-5 items-center mt-3">
                    <span className="h-11 w-12 rounded-lg bg-purple-200 flex items-center justify-center">
                        J
                    </span>
                    <div className="flex flex-col">
                        <span className="text-xl">Anima Ag.</span>
                        <span className="text-[#167AD3]">Basic Plan</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;

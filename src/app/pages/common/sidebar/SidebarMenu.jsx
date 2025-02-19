import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { DashboardIcon, FacebookIcon, InstagramIcon, AiCommentsIcon, LibraryIcon, TrainingVideosIcon, AffiliateIcon, EventsIcon } from "../icons/icons"; // Import icons

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
                { text: "CRM", id: "crm", path: "/facebook/crm" },
                { text: "Prospecting", id: "prospecting", path: "/facebook/prospecting" },
                { text: "Wish Birthday", id: "wish-birthday", path: "/facebook/wish-birthday" },
            ]
        },
        {
            text: "instagram", id: "instagram", path: "/instagram", icon: <InstagramIcon />, subNav: [
                { text: "Prospecting", id: "prospecting", path: "/ig/prospecting" },
                { text: "CRM", id: "crm", path: "/ig/crm" },
            ] },
        { text: "AI Comments", id: "ai-comments", path: "/ai-comments", icon: <AiCommentsIcon />, },
        { text: "Library", id: "library", path: "/library", icon: <LibraryIcon />, },
        { text: "Training Videos", id: "training-videos", path: "/training-videos", icon: <TrainingVideosIcon />, },
        { text: "Affiliate", id: "affiliate", path: "/affiliate", icon: <AffiliateIcon />, },
        { text: "Up-Coming Events", id: "up-coming-events", path: "/up-coming-events", icon: <EventsIcon />, },
    ];

    const toggleSubNav = (event, id) => {
        event.preventDefault(); // Stop navigation if clicking on submenu toggle
        setOpenSubNav(openSubNav === id ? null : id);
    };

    return (
        <div className="bg-white text-black w-64 h-screen transition-all duration-300 p-4 flex flex-col">
            <nav className="flex flex-col space-y-4">
                {sidebarData.map((item) => (
                    <div key={item.id} className="w-full">
                        {item.subNav ? (
                            <button
                                className="w-full rounded px-3 py-1 flex justify-between items-center"
                                onClick={(e) => toggleSubNav(e, item.id)}
                            >
                                <div className="flex items-center space-x-2">
                                    {item.icon}
                                    <span className='capitalize'>{item.text}</span>
                                </div>
                                <span>{openSubNav === item.id 
                                    ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0005 11.8284L9.17203 14.6569L7.75781 13.2426L12.0005 9L16.2431 13.2426L14.8289 14.6569L12.0005 11.8284Z" fill="black" fillOpacity="0.75" />
                                    </svg>
 
                                    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0005 12.1716L9.17203 9.3431L7.75781 10.7574L12.0005 15L16.2431 10.7574L14.8289 9.3431L12.0005 12.1716Z" fill="black" fillOpacity="0.45" />
                                    </svg>

                                    }</span>
                            </button>
                        ) : (
                            <SidebarItem text={item.text} path={item.path} icon={item.icon} />
                        )}

                        {item.subNav && openSubNav === item.id && (
                            <div className="pl-5 mt-1 flex flex-col space-y-1">
                                {item.subNav.map((subItem) => (
                                    <SidebarItem key={subItem.id} text={subItem.text} path={subItem.path} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default SidebarMenu;

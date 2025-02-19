import SidebarItem from "./SidebarItem";

const SidebarMenu = () => {
    const sidebarData = [
        { text: "dashboard", id: "dashboard", path: "/" },
        { text: "facebook", id: "facebook", path: "/facebook" },
        { text: "instagram", id: "instagram", path: "/instagram" },
        { text: "AI Comments", id: "ai-comments", path: "/ai-comments" },
        { text: "Library", id: "library", path: "/library" },
        { text: "Training Videos", id: "training-videos", path: "/training-videos" },
        { text: "Affiliate", id: "affiliate", path: "/affiliate" },
        { text: "Up-Coming Events", id: "up-coming-events", path: "/up-coming-events" },
    ];

    return (
        <div className="bg-gray-200 text-black w-64 h-screen transition-all duration-300 p-4 flex flex-col">
            <nav className="flex flex-col space-y-4">
                {
                    sidebarData.map((item) => {
                        return <SidebarItem text={item.text} path={item.path} key={item.id} />;
                    })
                }
            </nav>
        </div>
    );
};

export default SidebarMenu;

import React from "react";


const Layout = ({ children }) => {
    return <>
    <div className="p-6 bg-[#f2f2f2] h-screen overflow-auto">{children}</div>
    </>;
};

export default Layout;

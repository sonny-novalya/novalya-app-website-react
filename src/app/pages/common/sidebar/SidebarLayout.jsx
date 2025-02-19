import PropTypes from "prop-types";
import SidebarMenu from "./SidebarMenu";

const SidebarLayout = ({ children }) => {
    return (
        <div className="flex">
            <SidebarMenu />
            <main className="flex-1 bg-gray-100 p-8">{children}</main>
        </div>
    );
};

SidebarLayout.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default SidebarLayout;

import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../Layout";
import { t } from "i18next";

const FbFriendListLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        {
            label: "Friends",
            path: "/fb/friends",
            action: () => navigate("/fb/friends"),
        },
        {
            label: "Unfriended",
            path: "/fb/unfriended",
            action: () => navigate("/fb/unfriended"),
        },
        {
          label: "Deactivated",
          path: "/fb/deactivated",
          action: () => navigate("/fb/deactivated"),
        },
        {
          label: "Whitelist",
          path: "/fb/whitelist",
          action: () => navigate("/fb/whitelist"),
        },
    ];

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">List of Friends</h2>
            <div className="flex w-full space-x-4">
                {tabs.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            type="button"
                            className={`relative w-full flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${isActive
                                    ? "bg-[#0087FF] border-[#CCE7FF] text-white"
                                    : "bg-white border-[#0087FF] text-[#0087FF]"
                                }`}
                            onClick={item.action}
                        >
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="w-full mt-4">{children}</div>
        </Layout>
    );
};

FbFriendListLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FbFriendListLayout;

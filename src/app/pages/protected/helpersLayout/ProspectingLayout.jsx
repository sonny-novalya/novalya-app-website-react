import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../Layout";

const ProspectingLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isFb = location.pathname.startsWith("/fb");

    const buttonsData = isFb
        ? [
            {
                label: "Facebook Groups",
                path: "/fb/prospecting/groups",
                action: () => navigate("/fb/prospecting/groups"),
            },
            {
                label: "Facebook Posts",
                path: "/fb/prospecting/posts",
                action: () => navigate("/fb/prospecting/posts"),
            },
        ]
        : [
            {
                label: "Instagram Followers",
                path: "/ig/prospecting/followers",
                action: () => navigate("/ig/prospecting/followers"),
            },
            {
                label: "Instagram Posts",
                path: "/ig/prospecting/posts",
                action: () => navigate("/ig/prospecting/posts"),
            },
            {
                label: "Instagram Hashtags",
                path: "/ig/prospecting/hashtags",
                action: () => navigate("/ig/prospecting/hashtags"),
            },
        ];

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>
            <div className="flex w-full space-x-4">
                {buttonsData.map((item) => {
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

ProspectingLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProspectingLayout;

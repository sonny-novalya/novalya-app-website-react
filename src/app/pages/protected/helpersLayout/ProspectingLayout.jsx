import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../Layout";
import { t } from "i18next";

const ProspectingLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isFb = location.pathname.startsWith("/fb");

    const buttonsData = isFb
        ? [
            {
                label: t("prospecting.Facebook Groups"),
                path: "/fb/prospecting/groups",
                action: () => navigate("/fb/prospecting/groups"),
            },
            {
                label: t("prospecting.Facebook Posts"),
                path: "/fb/prospecting/posts",
                action: () => navigate("/fb/prospecting/posts"),
            },
        ]
        : [
            {
                label: t("prospecting.Instagram Followers"),
                path: "/ig/prospecting/followers",
                action: () => navigate("/ig/prospecting/followers"),
            },
            {
                label: t("prospecting.Instagram Posts"),
                path: "/ig/prospecting/posts",
                action: () => navigate("/ig/prospecting/posts"),
            },
            {
                label: t("prospecting.Instagram Hashtags"),
                path: "/ig/prospecting/hashtags",
                action: () => navigate("/ig/prospecting/hashtags"),
            },
        ];

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">{t("prospecting.Easily connect with new prospects")}</h2>
            <div class="nv-content-wrapper"></div> {/* to display account syncing message */}
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

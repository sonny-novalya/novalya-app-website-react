import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../../Layout";

const ProspectingLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPost = location.pathname === "/fb/prospecting/post";
    const isGroup = location.pathname === "/fb/prospecting/groups";

    return (
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Easily connect with new prospects</h2>
            <div className="flex w-full space-x-4">
                <button
                    type="button"
                    className={`relative w-1/2 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${isGroup ? "bg-[#0087FF] border-[#CCE7FF] text-white" : "bg-white border-[#0087FF] text-[#0087FF]"
                        }`}
                    onClick={() => navigate(`/fb/prospecting/groups`)}
                >
                    <span>Facebook Groups</span>
                </button>

                <button
                    type="button"
                    className={`relative w-1/2 flex items-center justify-center px-4 py-3 rounded-md border cursor-pointer ${isPost ? "bg-[#0087FF] border-[#CCE7FF] text-white" : "bg-white border-[#0087FF] text-[#0087FF]"
                        }`}
                    onClick={() => navigate(`/fb/prospecting/post`)}
                >
                    <span>Facebook Post</span>
                </button>
            </div>

            <div className="w-full mt-4">
                {children}
            </div>
        </Layout>
    );
};

ProspectingLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProspectingLayout;

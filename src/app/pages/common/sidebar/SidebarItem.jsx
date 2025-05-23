import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SidebarItem = ({ text, path, icon, isActive }) => {

    return (
        <Link
            to={path}
            className={`w-full rounded-[8px] px-4 py-3 transition flex items-center space-x-5 cursor-pointer text-black/45 font-[500]
                ${isActive ? 'bg-[#E6F1FB] text-black/75' : 'hover:bg-[#E6F1FB] text-black/45'}`}
        >
            {icon && <span className='h-6 w-6 flex items-center justify-center'>{icon}</span>}
            <span className='capitalize '>{text}</span>
        </Link>
    );
};

SidebarItem.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element,
    isActive: PropTypes.bool
};

export default SidebarItem;

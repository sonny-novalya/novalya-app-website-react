import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SidebarItem = ({ text, path, icon, isActive }) => {

    return (
        <Link
            to={path}
            className={`w-full rounded px-3 py-2 transition flex items-center space-x-5 cursor-pointer
                ${isActive ? 'bg-[#E6F1FB] text-[#167AD3]' : 'hover:bg-[#E6F1FB] text-black/55'}`}
        >
            {icon && <span className='h-6 w-6'>{icon}</span>}
            <span className='capitalize'>{text}</span>
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

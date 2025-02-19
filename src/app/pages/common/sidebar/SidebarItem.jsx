import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SidebarItem = ({ text, path, icon }) => {
    return (
        <Link to={path} className='w-full rounded px-3 py-1 hover:bg-gray-300 transition flex items-center space-x-2'>
            {icon && <span className='h-6 w-6'>{icon}</span>}
            <span className='capitalize'>{text}</span>
        </Link>
    );
};

SidebarItem.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element,
};

export default SidebarItem;

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SidebarItem = ({ text, path }) => {
    return (
        <Link to={path} className='w-full rounded px-3 py-1'>
            <span className='capitalize'>{text}</span>
        </Link>
    );
};

SidebarItem.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired, 
};

export default SidebarItem;

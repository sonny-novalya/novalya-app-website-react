import PropTypes from "prop-types";
const Loader = ({ size = 7 }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                <div className={` w-${size} h-${size} border-2 border-blue-500 border-t-transparent border-solid rounded-full animate-spin right-0 absolute`}>
                </div>
            </div>
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.string
};


export default Loader;

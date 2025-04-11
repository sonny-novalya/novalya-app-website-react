import PropTypes from "prop-types";

const Loader = ({ size = 28 }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                <div
                    className="border-2 border-blue-500 border-t-transparent border-solid rounded-full animate-spin absolute right-0"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                    }}
                ></div>
            </div>
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.number, // number instead of string now
};

export default Loader;

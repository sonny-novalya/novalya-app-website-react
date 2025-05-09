import PropTypes from 'prop-types';

const PaginationTable = ({ currentPage, setCurrentPage, totalItems, itemsPerPage, setItemsPerPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-700">Items per page:</span>
                <select
                    className="border border-gray-300 rounded-md p-1 text-sm"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md">{currentPage}</span>
                <button
                    className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

PaginationTable.propTypes = {
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setItemsPerPage: PropTypes.func.isRequired
};

PaginationTable.defaultProps = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10
};

export default PaginationTable;
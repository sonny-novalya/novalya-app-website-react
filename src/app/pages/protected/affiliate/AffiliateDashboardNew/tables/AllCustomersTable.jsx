import React, { useContext, useState, useEffect } from 'react';
import { CustomProvider } from 'app/layouts/vertical-default/VerticalDefault';

export default function AllCustomersTable(props) {
    const { loginUserData } = useContext(CustomProvider);
    const { refUsers, isAffiliateLoading } = props || {};

    const all_customers = refUsers?.all_customers || [];

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Debounce function for search
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearch = debounce((value) => {
        const searchValue = value.toLowerCase();
        const filtered = all_customers?.filter((row) => {
            const senderName = `${row.firstname || ""} ${row.lastname || ""}`.toLowerCase();
            const email = (row.email || "").toLowerCase();
            return senderName.includes(searchValue) || email.includes(searchValue);
        });
        setFilteredData(filtered);
    }, 500);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        // Initialize filtered data with all customers
        setFilteredData(all_customers);
    }, [all_customers]);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page on new search
    }, [searchQuery]);

    // Format date as "Nov 29, 2024"
    const formatDate = (dateInput) => {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    };

    // Calculate the current page data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem) || [];

    if (isAffiliateLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-9 h-9 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin"></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="relative w-full max-w-md">
                    <div className="flex items-center border border-gray-300 rounded p-1 bg-white">
                        <span className="mr-2 text-gray-400">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-none outline-none w-full text-sm"
                        />
                    </div>
                </div>
                <div>
                    <button className="flex items-center px-4 py-1 border border-gray-300 rounded bg-white cursor-pointer">
                        <span className="mr-2">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z"></path>
                            </svg>
                        </span>
                        Filter
                    </button>
                </div>
            </div>

            {/* Table Header */}
            <div className="flex bg-gray-50 py-3 px-4 border-b border-gray-100 font-medium text-sm text-gray-800">
                <div className="flex-shrink-0 flex-grow-0 basis-12 min-w-[50px]">#</div>
                <div className="flex-shrink-0 flex-grow-0 basis-1/4">Name</div>
                <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Plan</div>
                <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Period</div>
                <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Price</div>
                <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">Estimated Revenue</div>
                <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">Joining Date</div>
                <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">Activation on</div>
                <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Sponsor By</div>
                <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Status</div>
            </div>

            {/* Table Body */}
            <div>
                {currentData.length === 0 ? (
                    <div className="text-center py-8 px-4 text-gray-500">
                        No customers found
                    </div>
                ) : (
                    currentData.map((record, index) => (
                        <div
                            key={`${record?.customerid || index}`}
                            className={`flex items-center py-3 px-4 border-b border-gray-100 text-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                            <div className="flex-shrink-0 flex-grow-0 basis-12 min-w-[50px] text-gray-500">
                                {indexOfFirstItem + index + 1}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-1/4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-base font-medium">
                                        {(record?.firstname?.[0] || '') + (record?.lastname?.[0] || '')}
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {`${record?.firstname || ''} ${record?.lastname || ''}`}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {record?.email || ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                {record?.plan_pkg === "Unlimited_new" ? "Unlimited" : record?.plan_pkg}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                {`${record?.sub_type === "year" ? 12 : record?.plan_period || ''} Months`}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                {`${record?.plan_price || '0'} ${record?.currency === "USD" ? "$" : "€"}`}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">
                                {`${(record?.plan_price * 0.25).toFixed(2) || '0.00'} ${record?.currency === "USD" ? "$" : "€"}`}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">
                                {formatDate(record?.createdat)}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">
                                {formatDate(record?.createdat)}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                {Number(record?.sponsorid) === loginUserData?.user_id ? "You" : record?.sponsor_name || ""}
                            </div>
                            <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                <div className="flex justify-center">
                                    <span className={`px-4 py-1 rounded text-white text-xs ${record?.subscription_status === 'subscription_cancelled' ||
                                            record?.subscription_status === 'Cancelled' ||
                                            record?.subscription_status === 'payment_refunded'
                                            ? 'bg-red-500'
                                            : 'bg-green-500'
                                        }`}>
                                        {record?.subscription_status === 'subscription_cancelled' ||
                                            record?.subscription_status === 'Cancelled' ||
                                            record?.subscription_status === 'payment_refunded'
                                            ? 'Cancelled'
                                            : 'Active'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Custom Pagination */}
            <div className="flex justify-between items-center p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Items per page:</span>
                    <input
                        type="number"
                        min={1}
                        value={itemsPerPage}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                                setItemsPerPage(value);
                                setCurrentPage(1);
                            }
                        }}
                        className="w-16 h-8 px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                    >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                        </svg>
                    </button>

                    {/* Generate pagination buttons */}
                    {(() => {
                        const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
                        const buttons = [];

                        if (totalPages <= 5) {
                            // Show all pages if 5 or fewer
                            for (let i = 1; i <= totalPages; i++) {
                                buttons.push(i);
                            }
                        } else {
                            // Complex pagination logic
                            if (currentPage <= 3) {
                                buttons.push(1, 2, 3, 4, 5);
                            } else if (currentPage >= totalPages - 2) {
                                buttons.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                            } else {
                                buttons.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
                            }
                        }

                        return buttons.map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`flex items-center justify-center w-8 h-8 border border-gray-300 rounded ${currentPage === pageNumber
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-800'
                                    } cursor-pointer`}
                            >
                                {pageNumber}
                            </button>
                        ));
                    })()}

                    <button
                        onClick={() => {
                            const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        disabled={currentPage >= Math.ceil((filteredData?.length || 0) / itemsPerPage)}
                        className={`flex items-center justify-center w-8 h-8 border border-gray-300 rounded bg-white ${currentPage >= Math.ceil((filteredData?.length || 0) / itemsPerPage)
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                            }`}
                    >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
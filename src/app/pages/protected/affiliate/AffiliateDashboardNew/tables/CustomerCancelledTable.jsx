import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomProvider } from 'app/layouts/vertical-default/VerticalDefault';
import { BsSearch } from 'react-icons/bs';

export default function CustomerCancelledTable(props) {
    const { t } = useTranslation();
    const { loginUserData } = useContext(CustomProvider);
    const { refUsers, isAffiliateLoading } = props || {};
    const { customer_cancelled } = refUsers || {};

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        const filtered = customer_cancelled?.filter((row) => {
            const senderName = `${row.firstname || ""} ${row.lastname || ""}`.toLowerCase();
            return senderName.includes(searchValue);
        });
        setFilteredData(filtered);
    }, 500);

    useMemo(() => {
        handleSearch(searchQuery);
    }, [searchQuery]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [activeButtons, setActiveButtons] = useState({ Level1: true, Level2: true });

    const totalPages = itemsPerPage === 0
        ? 1
        : Math.ceil(filteredData?.length / itemsPerPage);

    const indexOfLastUser = useMemo(() => {
        if (!customer_cancelled || customer_cancelled.length === 0) return 0;
        return itemsPerPage === 0 ? customer_cancelled.length : currentPage * itemsPerPage;
    }, [customer_cancelled, itemsPerPage, currentPage]);

    const indexOfFirstUser = useMemo(() => {
        if (!customer_cancelled || customer_cancelled.length === 0) return 0;
        return itemsPerPage === 0 ? 0 : indexOfLastUser - itemsPerPage;
    }, [customer_cancelled, itemsPerPage, indexOfLastUser]);

    // Mapping status to Tailwind color classes
    const statusClasses = {
        "subscription_cancelled": "bg-red-500",  // Red for cancelled
        "subscription_paused": "bg-orange-500",  // Orange for paused
    };

    const memoizedFormatDate = useMemo(() => {
        return (dateInput, isUnix = false) => {
            const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
            const day = date.getDate();
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'long' });
            const translatedMonth = t(`pages.title.${month}`);
            return `${translatedMonth} ${day}, ${year}`;
        };
    }, []);

    const handleButtonClick = (button) => {
        setActiveButtons((prevState) => {
            const newState = { ...prevState, [button]: !prevState[button] };

            if (!newState.Level1 && !newState.Level2) {
                return prevState;
            }
            return newState;
        });
    };

    useEffect(() => {
        // Start with the base data
        let dataToFilter = searchQuery ? filteredData : customer_cancelled;

        // Apply filtering based on active buttons
        if (activeButtons.Level1 && !activeButtons.Level2) {
            dataToFilter = dataToFilter?.filter((userData) =>
                Number(userData?.sponsorid) === loginUserData?.user_id
            );
        } else if (!activeButtons.Level1 && activeButtons.Level2) {
            dataToFilter = dataToFilter?.filter((userData) =>
                Number(userData?.sponsorid) !== loginUserData?.user_id
            );
        }

        const paginatedData = dataToFilter?.slice(indexOfFirstUser, indexOfLastUser);
        setCurrentUsers(paginatedData);

        // Recalculate total pages after filtering
        setFilteredData(dataToFilter); // Save for pagination updates
    }, [currentPage, customer_cancelled, filteredData, itemsPerPage, searchQuery, activeButtons]);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page on new search
    }, [searchQuery]);

    const getLabel = (status) => {
        switch (status) {
            case 'subscription_cancelled':
                return t("pages.title.Cancelled");
            case 'subscription_paused':
                return t("pages.title.Paused");
            default:
                return t("pages.title.Unknown");
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isAffiliateLoading) {
        return (
            <div className="table-outer-box h-96 flex items-center justify-center">
                <div className="loading-spinner w-9 h-9 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin"></div>
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
        <>
            <div className="oct-affiliate-strip h-20 bg-white text-lg leading-6 font-semibold text-[rgb(23,15,73)] px-5 flex items-center justify-between">
                <div className="oct-affiliate-stripInner">
                    {t("pages.title.cancelled-customers")}
                </div>
                <div className="title-area-left flex items-center justify-center">
                    <div className="search-container relative w-64">
                        <label htmlFor="search" className="absolute -top-2.5 left-2.5 bg-white px-1 text-xs text-gray-500">
                            {t("pages.title.Search")}
                        </label>
                        <div className="flex items-center border border-gray-300 rounded p-2">
                            <span className="mr-2">
                                <BsSearch />
                            </span>
                            <input
                                id="search"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-none outline-none w-full text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-outer-box">
                <div className="table-container shadow-md rounded-lg overflow-hidden bg-white">
                    {/* Table Header */}
                    <div className="table-header bg-gray-100 flex px-4 py-3 font-semibold text-sm">
                        <div className="flex-shrink-0 flex-grow-0 basis-8 text-center">#</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-1/4">Name</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Plan</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Period</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Price</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">Joining Date</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">Cancellation on</div>
                        <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">Status</div>
                    </div>

                    {/* Table Body */}
                    <div className="table-body">
                        {!currentUsers?.length ? (
                            <div className="table-row p-4 text-center text-gray-500">
                                {t("pages.title.Noanynewsaleincurrentmonth")}
                            </div>
                        ) : (
                            currentUsers.map((userData, index) => (
                                <div
                                    key={`${userData?.customerid}-${index}`}
                                    className={`table-row flex px-4 py-3 border-b border-gray-200 items-center transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                                >
                                    <div className="flex-shrink-0 flex-grow-0 basis-8 text-center">{indexOfFirstUser + index + 1}</div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-1/4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-base font-medium">
                                                {(userData?.firstname?.[0] || '') + (userData?.lastname?.[0] || '')}
                                            </div>
                                            <div>
                                                <div className="font-medium">{`${userData?.firstname} ${userData?.lastname}`}</div>
                                                <div className="text-gray-500 text-xs">
                                                    {Number(userData?.sponsorid) === loginUserData?.user_id ? userData?.email || ' ' : ' '}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                        {userData?.plan_pkg === "Unlimited_new" ? "Unlimited" : userData?.plan_pkg}
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                        {(userData?.sub_type === "year" ? 12 : userData?.plan_period)}{" "}
                                        {(userData?.plan_period === 0 || userData?.plan_period === 1) && userData?.sub_type === "month"
                                            ? t("pages.title.Month")
                                            : t("pages.title.Months")}
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                        {`${userData?.plan_price} ${userData?.currency === "USD" ? "$" : "€"}`}
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">
                                        {memoizedFormatDate(userData?.createdat)}
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-32 text-center">
                                        {memoizedFormatDate(userData?.cancellation_date, true)}
                                    </div>
                                    <div className="flex-shrink-0 flex-grow-0 basis-24 text-center">
                                        {userData?.subscription_status && (
                                            <span className={`${statusClasses[userData.subscription_status] || 'bg-gray-400'} text-white py-0.5 px-2.5 rounded-full text-xs inline-block w-28 text-center`}>
                                                {getLabel(userData.subscription_status)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pagination */}
                <CustomerTablePagination
                    t={t}
                    skip={indexOfFirstUser}
                    limit={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={paginate}
                />
            </div>
        </>
    );
}

const CustomerTablePagination = ({ t, page, totalPages, onPageChange, setItemsPerPage, itemsPerPage }) => {

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handlePageClick = (pageNumber) => {
        onPageChange(pageNumber);
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1, 2);
            if (page > 4) pages.push('...');
            const start = Math.max(3, page - 2);
            const end = Math.min(totalPages - 2, page + 2);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (page < totalPages - 3) pages.push('...');
            pages.push(totalPages - 1, totalPages);
        }
        return pages;
    };

    const handleItemsPerPageChange = (event) => {
        const value = event.target.value === t("pages.title.View All") ? 0 : Number(event.target.value);
        setItemsPerPage(value);
        onPageChange(1); // Reset to first page
    };

    return (
        <div className="py-5 flex justify-between items-center">
            <div className="flex items-center gap-2 w-72">
                <label htmlFor="items-per-page" className="w-28">
                    {t("pages.title.Items per page")}:
                </label>
                <select
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="py-1 px-2.5 rounded border border-gray-300 w-auto min-w-20"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="0">{t("pages.title.View All")}</option>
                </select>
            </div>

            <div>
                {itemsPerPage !== 0 && (
                    <div>
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className={`bg-white text-gray-500 py-1 px-4 mx-1 rounded border border-gray-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {'<'}
                        </button>

                        {renderPageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                onClick={() => pageNumber !== '...' && handlePageClick(pageNumber)}
                                disabled={pageNumber === page || pageNumber === '...'}
                                className={`py-1 px-4 mx-1 rounded border border-gray-300 ${pageNumber === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-black'
                                    } ${pageNumber === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className={`bg-white text-gray-500 py-1 px-4 mx-1 rounded border border-gray-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {'>'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
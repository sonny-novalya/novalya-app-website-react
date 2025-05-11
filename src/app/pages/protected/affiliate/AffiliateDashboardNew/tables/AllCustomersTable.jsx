import React, { useContext, useState, useEffect } from 'react';
import { Avatar, Table, Input, Select, Button } from 'antd';
import { SearchOutlined, FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
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

    // Define columns for antd Table
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (_, __, index) => (
                <span className="text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</span>
            )
        },
        {
            title: 'Name',
            key: 'name',
            render: (_, record) => (
                <div className="flex items-center space-x-3">
                    <Avatar size={40} className="bg-gray-200" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{`${record?.firstname || ''} ${record?.lastname || ''}`}</span>
                        <span className="text-xs text-gray-500">{record?.email || ''}</span>
                    </div>
                </div>
            )
        },
        {
            title: 'Plan',
            dataIndex: 'plan_pkg',
            key: 'plan_pkg',
            render: (plan_pkg) => (
                <span className="text-sm">
                    {plan_pkg === "Unlimited_new" ? "Unlimited" : plan_pkg}
                </span>
            )
        },
        {
            title: 'Period',
            key: 'period',
            render: (_, record) => (
                <span className="text-sm">
                    {`${record?.sub_type === "year" ? 12 : record?.plan_period || ''} Months`}
                </span>
            )
        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => (
                <span className="text-sm">
                    {`${record?.plan_price || '0'} ${record?.currency === "USD" ? "$" : "€"}`}
                </span>
            )
        },
        {
            title: 'Estimated Revenue',
            key: 'revenue',
            render: (_, record) => (
                <span className="text-sm">
                    {`${(record?.plan_price * 0.25).toFixed(2) || '0.00'} ${record?.currency === "USD" ? "$" : "€"}`}
                </span>
            )
        },
        {
            title: 'Joining Date',
            dataIndex: 'createdat',
            key: 'createdat',
            render: (createdat) => (
                <span className="text-sm">{formatDate(createdat)}</span>
            )
        },
        {
            title: 'Activation on',
            dataIndex: 'activation_date',
            key: 'activation_date',
            render: (_, record) => (
                <span className="text-sm">{formatDate(record?.createdat)}</span> // Using createdat as a fallback
            )
        },
        {
            title: 'Sponsor By',
            key: 'sponsor',
            render: (_, record) => (
                <span className="text-sm">
                    {Number(record?.sponsorid) === loginUserData?.user_id ? "You" : record?.sponsor_name || ""}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'subscription_status',
            key: 'subscription_status',
            render: (status) => (
                <div className="flex justify-center">
                    <span className={`px-4 py-1 rounded-md text-white text-sm ${status === 'subscription_cancelled' || status === 'Cancelled' || status === 'payment_refunded' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {status === 'subscription_cancelled' || status === 'Cancelled' || status === 'payment_refunded' ? 'Cancelled' : 'Active'}
                    </span>
                </div>
            )
        }
    ];

    // Custom pagination component to match the Figma design
    const CustomPagination = () => {
        const totalItems = filteredData?.length || 0;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const handlePageChange = (page) => {
            if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
            }
        };

        return (
            <div className="flex justify-between items-center py-4 px-2 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Items per page:</span>
                    <Input
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
                        className="w-16 h-8"
                    />
                </div>

                <div className="flex items-center space-x-1">
                    <Button
                        icon={<LeftOutlined />}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md"
                    />

                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNumber;

                        if (totalPages <= 5) {
                            pageNumber = i + 1;
                        } else {
                            if (currentPage <= 3) {
                                pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNumber = totalPages - 4 + i;
                            } else {
                                pageNumber = currentPage - 2 + i;
                            }
                        }

                        return (
                            <Button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`flex items-center justify-center w-8 h-8 rounded-md ${currentPage === pageNumber
                                        ? 'bg-blue-500 text-white'
                                        : 'border border-gray-300'
                                    }`}
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}

                    <Button
                        icon={<RightOutlined />}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        );
    };

    if (isAffiliateLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm">
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="relative w-full md:w-1/3">
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined className="text-gray-400" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-md border-gray-200"
                    />
                </div>
                <div>
                    <Button
                        icon={<FilterOutlined />}
                        className="flex items-center border border-gray-200 rounded-md px-4 py-1"
                    >
                        <span className="ml-2">Filter</span>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <Table
                dataSource={filteredData}
                columns={columns}
                pagination={false}
                rowKey={(record, index) => `${record?.customerid || index}`}
                className="custom-table"
                locale={{
                    emptyText: (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No customers found</p>
                        </div>
                    )
                }}
            />

            {/* Custom Pagination */}
            <CustomPagination />
        </div>
    );
}
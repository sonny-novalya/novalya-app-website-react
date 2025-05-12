import { useEffect, useMemo, useState } from 'react';
import { Table, Input, Tag, Pagination, Spin } from 'antd';
import SearchAndFilterBar from './SearchAndFilterbar';

const AllCustomersTable = ({ loginUserData, refUsers, isAffiliateLoading }) => {
    const all_customers = refUsers?.all_customers || [];
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const formatDate = (dateInput) => {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleSearch = (value) => {
        setSearchQuery(value.toLowerCase());
        setCurrentPage(1); // reset to page 1 on new search
    };

    useEffect(() => {
        if (all_customers?.length) {
            const filtered = all_customers.filter(row => {
                const name = `${row.firstname || ''} ${row.lastname || ''}`.toLowerCase();
                const email = (row.email || '').toLowerCase();
                return name.includes(searchQuery) || email.includes(searchQuery);
            });
            setFilteredData(filtered);
        }
    }, [searchQuery, all_customers]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            render: (_, __, i) => (currentPage - 1) * itemsPerPage + i + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div>
                    <strong>{`${record.firstname} ${record.lastname}`}</strong>
                    <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Plan',
            dataIndex: 'plan_pkg',
            render: (text) => text === 'Unlimited_new' ? 'Unlimited' : text,
        },
        {
            title: 'Period',
            dataIndex: 'plan_period',
            render: (_, record) =>
                `${record?.sub_type === 'year' ? 12 : record.plan_period} Months`,
        },
        {
            title: 'Price',
            dataIndex: 'plan_price',
            render: (price, record) =>
                `${price || 0} ${record.currency === 'USD' ? '$' : '€'}`,
        },
        {
            title: 'Estimated Revenue',
            render: (_, record) =>
                `${(record.plan_price * 0.25).toFixed(2)} ${record.currency === 'USD' ? '$' : '€'}`,
        },
        {
            title: 'Joining Date',
            dataIndex: 'createdat',
            render: (date) => formatDate(date),
        },
        {
            title: 'Activation on',
            dataIndex: 'createdat',
            render: (date) => formatDate(date),
        },
        {
            title: 'Sponsor By',
            dataIndex: 'sponsor_name',
            render: (_, record) =>
                Number(record.sponsorid) === loginUserData?.user_id ? 'You' : '',
        },
        {
            title: 'Status',
            dataIndex: 'subscription_status',
            render: (status) => {
                const isCancelled = ['subscription_cancelled', 'Cancelled', 'payment_refunded'].includes(status);
                return (
                    <Tag color={isCancelled ? 'red' : 'green'}>
                        {isCancelled ? 'Cancelled' : 'Active'}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div>

            {isAffiliateLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Table
                        rowKey={(record) => record.customerid}
                        columns={columns}
                        dataSource={paginatedData}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                    />

                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <span className="text-gray-600 text-sm">Items per page: </span>
                            <Input
                                type="number"
                                min={1}
                                value={itemsPerPage}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    if (!isNaN(value) && value > 0) {
                                        setItemsPerPage(value);
                                        setCurrentPage(1);
                                    }
                                }}
                                style={{ width: 80 }}
                            />
                        </div>

                        <Pagination
                            current={currentPage}
                            pageSize={itemsPerPage}
                            total={filteredData.length}
                            onChange={setCurrentPage}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default AllCustomersTable;

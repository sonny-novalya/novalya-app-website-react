import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Pagination } from 'antd';

export default function ActiveCustomersTable({ loginUserData, refUsers, isAffiliateLoading, showStatus = true }) {
    const { active_customers = [] } = refUsers || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setFilteredData(active_customers);
    }, [active_customers]);

    useEffect(() => {
        const searchValue = searchQuery.toLowerCase();
        const filtered = active_customers.filter(user =>
            `${user.firstname || ''} ${user.lastname || ''}`.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
    }, [searchQuery, active_customers]);

    const formatDate = (dateInput, isUnix = false) => {
        const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        return `${month} ${day}, ${year}`;
    };

    const getLabel = (status) => {
        const map = {
            'Active': 'Active',
            'subscription_renewed': 'Active',
            'subscription_changed': 'Active',
            'subscription_created': 'Active',
            'subscription_activated': 'Active',
            'subscription_resumed': 'Active',
            'subscription_reactivated': 'Active',
            'subscription_cancelled': 'Cancelled',
            'payment_failed': 'Payment Failed'
        };
        return map[status] || 'Unknown';
    };

    const statusColors = {
        Active: 'green',
        subscription_activated: 'green',
        subscription_renewed: 'green',
        subscription_changed: 'blue',
        subscription_created: 'green',
        subscription_cancelled: 'red',
        subscription_reactivated: 'green',
        subscription_resumed: 'green',
        payment_failed: 'orange'
    };

    const calEstRevenue = (user) => {
        if (!user?.t_paid_amount && !user?.plan_price) return 0;
        return (user?.t_paid_amount || user?.plan_price) * 0.4;
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div>
                    <strong>{`${record.firstname} ${record.lastname}`}</strong>
                    <div style={{ fontSize: '12px', color: 'gray' }}>
                        {Number(record.sponsorid) === loginUserData?.user_id ? record.email : ''}
                    </div>
                </div>
            )
        },
        {
            title: 'Plan',
            dataIndex: 'plan_pkg',
            render: (val) => val === 'Unlimited_new' ? 'Unlimited' : val
        },
        {
            title: 'Period',
            render: (record) =>
                `${record.sub_type === 'year' ? 12 : record.plan_period} ${(record.plan_period === 1 || record.plan_period === 0) && record.sub_type === 'month' ? 'Month' : 'Months'
                }`
        },
        {
            title: 'Price',
            render: (record) =>
                `${record.plan_price} ${record.currency === 'USD' ? '$' : '€'}`
        },
        {
            title: 'Estimated Revenue',
            render: (record) =>
                `${calEstRevenue(record).toFixed(2)} ${record.currency === 'USD' ? '$' : '€'}`
        },
        {
            title: 'Joining Date',
            render: (record) => formatDate(record.createdat)
        },
        {
            title: 'Next Payment',
            render: (record) => formatDate(record.nextBillingAt, true)
        },
        ...(showStatus
            ? [{
                title: 'Status',
                dataIndex: 'subscription_status',
                render: (status) => (
                    status && (
                        <Tag color={statusColors[status] || 'default'}>
                            {getLabel(status)}
                        </Tag>
                    )
                )
            }]
            : [])
    ];

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Active Customers</h2>
                <Input.Search
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    allowClear
                    style={{ width: 250 }}
                />
            </div>

            <Table
                rowKey={(record) => `${record.customerid}`}
                columns={columns}
                dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                loading={isAffiliateLoading}
            />

            <div className="mt-4 flex justify-end">
                <Pagination
                    current={currentPage}
                    total={filteredData.length}
                    pageSize={pageSize}
                    showSizeChanger
                    pageSizeOptions={['10', '20', '50', '100']}
                    onChange={(page, size) => {
                        setCurrentPage(page);
                        setPageSize(size);
                    }}
                />
            </div>
        </div>
    );
}

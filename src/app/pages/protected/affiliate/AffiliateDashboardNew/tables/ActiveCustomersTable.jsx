import React, { useMemo, useState, useEffect } from 'react';
import { Table, Input, Tag, Avatar } from 'antd';

export default function ActiveCustomersTable({ loginUserData, refUsers, isAffiliateLoading }) {
    const { active_customers } = refUsers || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const handleSearch = useMemo(() => {
        return (value) => {
            const query = value.toLowerCase();
            const filtered = active_customers?.filter(row => {
                const name = `${row.firstname || ''} ${row.lastname || ''}`.toLowerCase();
                return name.includes(query);
            });
            setFilteredData(filtered);
        };
    }, [active_customers]);

    useEffect(() => {
        handleSearch(searchQuery);
    }, [searchQuery, active_customers]);

    const memoizedFormatDate = (dateInput, isUnix = false) => {
        const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const calEstRevenue = (user) => {
        if (!user?.t_paid_amount && !user?.plan_price) return 0;
        return (user?.t_paid_amount || user?.plan_price) * 0.4;
    };

    const statusColors = {
        "Active": "green",
        "subscription_activated": "green",
        "subscription_renewed": "green",
        "subscription_cancelled": "red",
        "payment_refunded": "blue",
        "payment_failed": "orange",
        "To Be Collected": "gold",
        "Payment Due": "orange",
        "subscription_reactivated": "green",
        "Cancelled": "red",
        "subscription_changed": "pink",
        "subscription_created": "green",
        "subscription_resumed": "green",
    };

    const statusLabel = (status) => {
        switch (status) {
            case 'Active':
            case 'subscription_renewed':
            case 'subscription_changed':
            case 'subscription_created':
            case 'subscription_activated':
            case 'subscription_reactivated':
            case 'subscription_resumed':
                return "Active";
            case 'payment_failed':
                return "Payment Failed";
            case 'subscription_cancelled':
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (_, __, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Name',
            key: 'name',
            render: (_, row) => (
                <div className="flex items-center gap-2">
                    <Avatar>{`${row.firstname?.[0] || ''}${row.lastname?.[0] || ''}`}</Avatar>
                    <div>
                        <div className="font-medium">{`${row.firstname} ${row.lastname}`}</div>
                        <div className="text-gray-500 text-xs">
                            {Number(row.sponsorid) === loginUserData?.user_id ? row.email : ''}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Plan',
            dataIndex: 'plan_pkg',
            render: (val) => val === 'Unlimited_new' ? 'Unlimited' : val,
        },
        {
            title: 'Period',
            render: (row) => `${row.sub_type === 'year' ? 12 : row.plan_period} Months`,
        },
        {
            title: 'Price',
            render: (row) => `${row.plan_price || 0} ${row.currency === 'USD' ? '$' : '€'}`,
        },
        {
            title: 'Estimated Revenue',
            render: (row) => `${calEstRevenue(row).toFixed(2)} ${row.currency === 'USD' ? '$' : '€'}`,
        },
        {
            title: 'Joining Date',
            render: (row) => memoizedFormatDate(row.createdat),
        },
        {
            title: 'Next Payment',
            render: (row) => memoizedFormatDate(row.nextBillingAt, true),
        },
        {
            title: 'Status',
            dataIndex: 'subscription_status',
            render: (status) => (
                <Tag color={statusColors[status] || 'gray'}>
                    {statusLabel(status)}
                </Tag>
            ),
        },
    ];

    const handleTableChange = (paginationConfig) => {
        setPagination(paginationConfig);
    };

    if (isAffiliateLoading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            {/* Search */}
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Active Customers</h2>
                <Input.Search
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: 300 }}
                    allowClear
                />
            </div>

            {/* Ant Design Table with built-in pagination */}
            <Table
                rowKey={(row) => row.customerid}
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: filteredData.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    onChange: (page, pageSize) =>
                        setPagination({ current: page, pageSize }),
                }}
                onChange={handleTableChange}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </div>
    );
}

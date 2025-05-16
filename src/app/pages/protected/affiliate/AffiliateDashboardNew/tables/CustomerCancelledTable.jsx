import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Pagination, Spin } from 'antd';

export default function ActiveCustomersTable({ loginUserData, refUsers, isAffiliateLoading }) {
    const customer_cancelled = refUsers?.customer_cancelled || [];


    const [page, setPage] = useState(1);
    const limit = 10;

    const total = customer_cancelled?.length || 0;

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

    const handlePageChange = (newPage) => {
        setPage(newPage);
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
            render: (_, __, i) => (page - 1) * limit + i + 1,
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

        {
            title: 'Status',
            dataIndex: 'subscription_status',
            render: (status) => (
                status && (
                    <Tag color={statusColors[status] || 'default'}>
                        {getLabel(status)}
                    </Tag>
                )
            )
        }
    ];

    return (
        <Table
            rowKey={(record) => record.customerid}
            columns={columns}
            dataSource={customer_cancelled}
            pagination={{
                current: page,
                pageSize: limit,
                total,
                onChange: handlePageChange,
                showSizeChanger: false,
            }}
            scroll={{ x: 'max-content' }}
            loading={isAffiliateLoading}
        />
    );
}

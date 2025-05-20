import React, { useMemo, useState, useEffect } from 'react';
import { Table, Input, Tag, Avatar, Spin } from 'antd';
import { formatDateFun } from './memoizedFormatDate';

export default function ActiveCustomersTable({ loginUserData, refUsers, isAffiliateLoading }) {
    const active_customers = refUsers?.active_customers || [];

    const [page, setPage] = useState(1);
    const limit = 10;

    const total = active_customers?.length || 0;

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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const columns = [
        {
            title: '#',
            key: 'index',
            render: (_, __, i) => (page - 1) * limit + i + 1,
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
            render: (row) => formatDateFun(row.createdat),
        },
        {
            title: 'Next Payment',
            render: (row) => formatDateFun(row.nextBillingAt, true),
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


    return (
        <Table
            rowKey={(record) => record.customerid}
            columns={columns}
            dataSource={active_customers}
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

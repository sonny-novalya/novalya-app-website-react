import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Tag, Avatar, Spin } from 'antd';
import { formatDateFun } from './memoizedFormatDate';

export default function NewTrialsTable({ loginUserData, refUsers, isAffiliateLoading, showStatus = true }) {
    const new_trials = refUsers?.new_trials || [];


    const [page, setPage] = useState(1);
    const limit = 10;

    const total = new_trials?.length || 0;

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const statusColors = {
        Active: 'blue',
        payment_failed: 'orange',
        subscription_cancelled: 'red',
        subscription_reactivated: 'green',
    };

    const statusLabels = {
        Active: 'In Trial',
        payment_failed: 'Payment Failed',
        subscription_cancelled: 'Cancelled',
        subscription_reactivated: 'Reactivated',
    };

    const calEstRevenue = (user) => {
        if (!user?.t_paid_amount && !user?.plan_price) return 0;
        return (user?.t_paid_amount || user?.plan_price) * 0.4;
    };

    const columns = [
        {
            title: '#',
            render: (_, __, i) => (page - 1) * limit + i + 1,
        },
        {
            title: 'Name',
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
            render: val => val === 'Unlimited_new' ? 'Unlimited' : val,
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
            title: 'Activation on',
            render: (row) => row.trial_end === 0
                ? formatDateFun(row.createdat)
                : formatDateFun(row.trial_end, true),
        },
        {
            title: 'Status',
            dataIndex: 'subscription_status',
            render: (status) => (
                <Tag color={statusColors[status] || 'gray'}>
                    {statusLabels[status] || 'Unknown'}
                </Tag>
            ),
        }
    ];

    return (
        <Table
            rowKey={(record) => record.customerid}
            columns={columns}
            dataSource={new_trials}
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

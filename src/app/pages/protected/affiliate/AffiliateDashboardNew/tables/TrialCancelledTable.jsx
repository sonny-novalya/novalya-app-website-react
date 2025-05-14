import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Tag, Avatar } from 'antd';

export default function TrialCancelledTable({ loginUserData, refUsers, isAffiliateLoading }) {
    const { trial_cancelled = [] } = refUsers || {};

    const [page, setPage] = useState(1);
    const limit = 10;

    const total = trial_cancelled?.length || 0;

    const formatDate = (dateInput) => {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    const statusColors = {
        subscription_cancelled: 'red',
    };

    const statusLabels = {
        subscription_cancelled: 'Cancelled',
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
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
            title: 'Joining Date',
            render: (row) => formatDate(row.createdat),
        },
        {
            title: 'Cancellation Date',
            render: (row) => formatDate(row.cancellation_date, true),
        },
        {
            title: 'Status',
            dataIndex: 'subscription_status',
            render: (status) => (
                <Tag color={statusColors[status] || 'gray'}>
                    {statusLabels[status] || 'Unknown'}
                </Tag>
            ),
        },
    ];

    return (
        <Table
            rowKey={(record) => record.customerid}
            columns={columns}
            dataSource={trial_cancelled}
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

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Tag, Avatar } from 'antd';

export default function TrialCancelledTable({ loginUserData, refUsers, isAffiliateLoading }) {
    const { trial_cancelled = [] } = refUsers || {};

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        const filtered = trial_cancelled.filter((row) => {
            const name = `${row.firstname || ''} ${row.lastname || ''}`.toLowerCase();
            return name.includes(query);
        });
        setFilteredData(filtered);
    }, [searchQuery, trial_cancelled]);

    const formatDate = (dateInput, isUnix = false) => {
        if (!dateInput) return '';
        const date = isUnix ? new Date(dateInput * 1000) : new Date(dateInput);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
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

    if (isAffiliateLoading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Cancelled Trials</h2>
                <Input.Search
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: 300 }}
                    allowClear
                />
            </div>

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
                    onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                }}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </div>
    );
}

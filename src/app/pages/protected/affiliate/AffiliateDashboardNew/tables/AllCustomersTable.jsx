import { Table, Tag, Spin } from 'antd';
import { useState } from 'react';
import { formatDateFun } from './memoizedFormatDate';

const AllCustomersTable = ({ loginUserData, refUsers, isAffiliateLoading }) => {
    const all_customers = refUsers?.all_customers || [];

    const [page, setPage] = useState(1);
    const limit = 10;

    const total = all_customers?.length || 0;

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            render: (_, __, i) => (page - 1) * limit + i + 1,
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
            render: (date) => formatDateFun(date),
        },
        {
            title: 'Activation on',
            dataIndex: 'createdat',
            render: (date) => formatDateFun(date, true),
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
        <Table
            rowKey={(record) => record.customerid}
            columns={columns}
            dataSource={all_customers}
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
};

export default AllCustomersTable;

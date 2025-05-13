import { useEffect, useState } from 'react';
import useAffMemberStore from '../../../../../../store/affiliate/dashboard/AffMember';
import useUpgradeModalStore from '../../../../../../store/modals/UpgradeToPro';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';

const PaymentTableSection = ({ isPro }) => {
    const { showModal } = useUpgradeModalStore();
    const { fetchPayout, payoutData } = useAffMemberStore();
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    useEffect(() => {
        fetchPayout();
    }, []);

    const columns = [
        {
            title: '#',
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (amount, row) => `${amount} ${row.currency}`,
        },
        {
            title: 'Fee',
            dataIndex: 'fee',
        },
        {
            title: 'Final Amount',
            dataIndex: 'final_amount',
        },
        {
            title: 'Withdrawal Amount',
            dataIndex: 'createdat',
            render: (date) => new Date(date).toLocaleDateString(),
        }, 
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => <Tag color={status === 'Pending' ? 'orange' : 'green'}>{status}</Tag>,
        },
    ];

    return (
        <div className='mt-6'>
            <h2 className="text-2xl font-medium mb-3 text-[#000407]">My Payments</h2>
            <div className='bg-white p-6 rounded-lg shadow-md relative'>
                {isPro && (
                    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                        <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium" onClick={showModal}>
                            Unlock to Pro
                        </button>
                    </div>
                )}

                <Table
                    rowKey={(row) => row.id}
                    columns={columns}
                    dataSource={Array.isArray(payoutData) ? payoutData : []}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: payoutData.length,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                    }}
                    scroll={{ x: 'max-content' }}
                    bordered
                />
            </div>
        </div>
    );
};

PaymentTableSection.propTypes = {
    isPro: PropTypes.bool,
};

export default PaymentTableSection;

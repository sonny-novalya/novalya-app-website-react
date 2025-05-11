import useUpgradeModalStore from '../../../../../../store/modals/UpgradeToPro';
import CustomersTable from './CustomersTable'
import PropTypes from 'prop-types';
const mockCustomers = [
    {
        id: 1,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 2,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 3,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 4,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 5,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 6,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
    {
        id: 7,
        name: 'vikki new',
        email: 'vikkinew@email.com',
        plan: 'Unlimited',
        period: '12 Months',
        price: '231.6 $',
        revenue: '579.00 $',
        joiningDate: 'Nov 29, 2024',
        activationDate: 'Nov 29, 2024',
        sponsor: 'You',
        status: 'Active'
    },
];

const PaymentTableSection = ({isPro}) => {
    const { showModal } = useUpgradeModalStore();
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

                <CustomersTable customers={mockCustomers.slice(0,3)} />
            </div>
        </div>
    )
}

PaymentTableSection.propTypes = {
    isPro: PropTypes.bool
}


export default PaymentTableSection

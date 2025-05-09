import { mockCustomers } from '../AffiliateTableSection'
import CustomersTable from './CustomersTable'
import PropTypes from 'prop-types';

const PaymentTableSection = ({isPro}) => {
    return (
        <div className='mt-6'>
            <h2 className="text-2xl font-medium mb-3 text-[#000407]">My Payments</h2>
            <div className='bg-white p-6 rounded-lg shadow-md relative'>
                {isPro && (
                    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                        <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium">
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

import { mockCustomers } from '../AffiliateTableSection'
import CustomersTable from './CustomersTable'

const PaymentTableSection = () => {
    return (
        <div className='mt-6'>
            <h2 className="text-2xl font-medium mb-3 text-[#000407]">My Payments</h2>
            <div className='bg-white p-6 rounded-lg shadow-md'>
                <CustomersTable customers={mockCustomers.slice(0,3)} />
            </div>
        </div>
    )
}

export default PaymentTableSection

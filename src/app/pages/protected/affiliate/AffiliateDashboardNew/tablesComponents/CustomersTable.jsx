import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';

const CustomersTable = ({ customers, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Period
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estimated Revenue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joining Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Activation on
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sponsor By
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <UserAvatar />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                        <div className="text-sm text-gray-500">{customer.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.plan}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.period}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.revenue}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.joiningDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.activationDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.sponsor}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                                    {customer.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// PropTypes validation
CustomersTable.propTypes = {
    customers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            plan: PropTypes.string.isRequired,
            period: PropTypes.string.isRequired,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            joiningDate: PropTypes.string.isRequired,
            activationDate: PropTypes.string.isRequired,
            sponsor: PropTypes.string,
            status: PropTypes.string.isRequired
        })
    ).isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired
};

// Default props
CustomersTable.defaultProps = {
    customers: [],
    currentPage: 1,
    itemsPerPage: 10
};

export default CustomersTable;
import { useEffect, useState } from "react";
import TabNavigation from "./tablesComponents/TabNavigation";
import SearchFilter from "./tablesComponents/SearchFilter";
import CustomersTable from "./tablesComponents/CustomersTable";
import PaginationTable from "./tablesComponents/PaginationTable";
import PropTypes from 'prop-types';
import ActivityLogsTable from "./tablesComponents/ActiveLogsTable";

export const mockCustomers = [
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

const AffiliateTableSection = ({ isPro }) => {
    const [activeTab, setActiveTab] = useState(isPro ? 'active-logs' : 'new-trials');

    const [searchQuery, setSearchQuery] = useState('');

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
    }, []);

    useEffect(() => {
        let filtered = customers;

        if (activeTab === 'active-customers') {
            filtered = filtered.filter(customer => customer.status === 'Active');
        } else if (activeTab === 'cancelled-trials' || activeTab === 'cancelled-customers') {
            filtered = filtered.filter(customer => customer.status === 'Cancelled');
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                customer =>
                    customer.name.toLowerCase().includes(query) ||
                    customer.email.toLowerCase().includes(query)
            );
        }

        setFilteredCustomers(filtered);
        setCurrentPage(1);
    }, [searchQuery, activeTab, customers]);

    const handleFilterClick = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {
                activeTab === "active-logs"
                    ? <ActivityLogsTable />
                    : <div className="border border-[#21BF7C] p-4 relative">
                        {isPro &&  (
                            <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 z-50 rounded-lg h-full">
                                <button className="bg-gradient-to-r from-[#005199] to-[#0087FF] rounded px-10 py-2 text-white shadow-md font-medium">
                                    Unlock to Pro
                                </button>
                            </div>
                        )}
                        <SearchFilter
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onFilter={handleFilterClick}
                        />

                        <CustomersTable
                            customers={filteredCustomers.slice(0,6)}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                        />

                        <PaginationTable
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalItems={filteredCustomers.length}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </div>
            }
        </div>
    );
};

AffiliateTableSection.propTypes = {
    isPro: PropTypes.bool
}


export default AffiliateTableSection;
import { useState } from "react";
import PropTypes from 'prop-types';

export const mockActivityLogs = [
    {
        id: 1,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'has started a 14 days trial',
        status: 'trial'
    },
    {
        id: 2,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'Karl Jule',
        email: 'Johnsmith112@email.com',
        information: 'has a failed payment',
        status: 'failed'
    },
    {
        id: 3,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'bought 100€ course',
        status: 'purchase'
    },
    {
        id: 4,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'has started a 14 days trial',
        status: 'trial'
    },
    {
        id: 5,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'has started a 14 days trial',
        status: 'trial'
    },
    {
        id: 6,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'has started a 14 days trial',
        status: 'trial'
    },
    {
        id: 7,
        dateTime: '01/23/2025 - 01:03 PM',
        name: 'John Smith',
        email: 'Johnsmith112@email.com',
        information: 'has started a 14 days trial',
        status: 'trial'
    },
];

const ActivityLogsTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [logs, setLogs] = useState(mockActivityLogs);


    const getInformationColor = (status) => {
        switch (status) {
            case 'trial':
                return 'text-blue-500';
            case 'failed':
                return 'text-red-500';
            case 'purchase':
                return 'text-green-500';
            default:
                return 'text-blue-500';
        }
    };

    return (
            <div className="border border-[#21BF7C] p-4 relative">
                <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left font-medium">Date & Time</th>
                                <th className="py-3 px-4 text-left font-medium">Name</th>
                                <th className="py-3 px-4 text-left font-medium">Email</th>
                                <th className="py-3 px-4 text-left font-medium">Information</th>
                            </tr>
                        </thead>
                        <tbody>
                        {logs.map((log) => (
                                <tr key={log.id} className="border-t border-gray-200">
                                    <td className="py-3 px-4">{log.dateTime}</td>
                                    <td className="py-3 px-4">{log.name}</td>
                                    <td className="py-3 px-4">{log.email}</td>
                                    <td className={`py-3 px-4 ${getInformationColor(log.status)}`}>
                                        {log.information}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="mb-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

SearchFilter.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
};

export default ActivityLogsTable;
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { dateFormat } from "../../../../../../helpers/dateFormat";
import useAffTableDataStore from "../../../../../../store/affiliate/dashboard/AffTableData";

const ActivityLogsTable = () => {
    const {
        activityLogsData,
        logsLoading,
        logsFilter,
        updateLogsFilter,
        fetchActivityLogs,
    } = useAffTableDataStore();

    useEffect(() => {
        fetchActivityLogs();
    }, []);

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        updateLogsFilter({ ...logsFilter,search: newSearch, page: 1 });
        fetchActivityLogs();
    };

    const getInformationColor = (status) => {
        switch (status) {
            case 'trial':
                return 'text-blue-500';
            case 'payment_failed':
                return 'text-red-500';
            case 'purchase':
                return 'text-green-500';
            default:
                return 'text-blue-500';
        }
    };

    return (
        <div className="border border-[#21BF7C] p-4 relative">
            <SearchFilter searchQuery={logsFilter.search} handleChange={handleSearchChange} />
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
                        {logsLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">Loading...</td>
                            </tr>
                        ) : activityLogsData?.length > 0 ? (
                            activityLogsData.map((log) => (
                                <tr key={log.id} className="border-t border-gray-200">
                                    <td className="py-3 px-4">{dateFormat(log.created_at)}</td>
                                    <td className="py-3 px-4">{`${log.firstname} ${log.lastname}`}</td>
                                    <td className="py-3 px-4">{log.email}</td>
                                    <td className={`py-3 px-4 ${getInformationColor(log.type)}`}>
                                        {log.message}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No logs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SearchFilter = ({ searchQuery, handleChange }) => {
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
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

SearchFilter.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ActivityLogsTable;

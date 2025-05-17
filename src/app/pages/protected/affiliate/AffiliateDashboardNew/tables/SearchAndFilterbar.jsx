import { useEffect, useState } from "react";

export const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, i) => ({
    label: `${currentYear - i}`,
    value: currentYear - i,
}));

export default function SearchAndFilterBar({ tableFilters, updateTableFilters, isNewTrials }) {
    const [searchTerm, setSearchTerm] = useState(tableFilters?.search || '');

    useEffect(() => {
        setSearchTerm(tableFilters?.search || '');
    }, [tableFilters?.search]);
    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            updateTableFilters({ search: searchTerm });
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div className="mb-4 flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-sm"
                />
            </div>

            {!isNewTrials && (
                <div className="flex space-x-3">
                    <select
                        value={tableFilters?.month ?? ''}
                        onChange={(e) => updateTableFilters({ month: Number(e.target.value) })}
                        className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="" disabled>Month</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                    </select>

                    <select
                        value={tableFilters?.year}
                        onChange={(e) => updateTableFilters({ year: Number(e.target.value) })}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="" disabled>All Years</option>
                        {years.map((year) => (
                            <option key={year.value} value={year.value}>{year.label}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}


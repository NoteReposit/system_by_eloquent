import { router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ students, query, sortColumn, sortDirection }) {
    // search 
    const [search, setSearch] = useState(query || '');

    // sort
    const [sort, setSort] = useState({
        column: sortColumn || 'id',
        direction: sortDirection || 'asc',
    });

    // search function
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/students', { search, sort: sort.column, direction: sort.direction });
    };

    // sort function
    const handleSort = (column) => {
        const direction = sort.column === column && sort.direction === 'asc' ? 'desc' : 'asc';
        setSort({ column, direction });
        router.get('/students', { search, sort: column, direction });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Student List</h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search employees..."
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </form>

            {/* Employee Table */}
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            {[
                                { label: 'ID', key: 'id' },
                                { label: 'Student Code', key: 'student_code' },
                                { label: 'First Name', key: 'first_name' },
                                { label: 'Last Name', key: 'last_name' },
                                { label: 'Gender', key: 'gender' },
                                { label: 'Email', key: 'email' },
                                { label: 'Birth Date', key: 'birth_date' },
                            ].map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-3 text-left text-sm font-medium uppercase cursor-pointer"
                                    onClick={() => handleSort(column.key)}
                                >
                                    {column.label}
                                    {sort.column === column.key && (
                                        <span className="ml-2">
                                            {sort.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-sm font-medium uppercase cursor-pointer" >Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {students.data.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-700">{student.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.student_code}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.first_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.last_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {student.gender === 'M' ? 'Male' : 'Female'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{student.birth_date}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <Link
                                        href={`/students/${student.id}`}
                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
                {students.links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => router.get(link.url, { search, sort: sort.column, direction: sort.direction })}
                        disabled={!link.url}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${link.active
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                    >
                        {link.label.replace("&laquo; Previous", 'Previous').replace("Next &raquo;", "Next")}
                    </button>
                ))}
            </div>
        </div>
    );
}
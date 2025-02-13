import { router } from "@inertiajs/react";

export default function Detail({ student }) {
    // ถ้าไม่มีข้อมูลนักศึกษา
    if (!student) {
        return (
            <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-700">No student data available.</h2>
            </div>
        );
    }

    console.log(student);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.visit("/students")}
                    className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    ← Back to Students
                </button>

                {/* Student Info */}
                <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Details</h1>
                    <div className="grid grid-cols-3 gap-4 text-gray-700">
                        <p><span className="font-semibold">Student Code:</span> {student.student_code}</p>
                        <p><span className="font-semibold">First Name:</span> {student.first_name}</p>
                        <p><span className="font-semibold">Last Name:</span> {student.last_name}</p>
                    </div>
                </div>

                {/* Registration Table */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registered Courses</h2>
                    {student.registers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Course Code</th>
                                        <th className="py-3 px-4 text-left">Name</th>
                                        <th className="py-3 px-4 text-left">Description</th>
                                        <th className="py-3 px-4 text-left">Credits</th>
                                        <th className="py-3 px-4 text-left">Teacher</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {student.registers.map((register, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">{register.course.course_code}</td>
                                            <td className="px-4 py-3">{register.course.name}</td>
                                            <td className="px-4 py-3">{register.course.description}</td>
                                            <td className="px-4 py-3">{register.course.credits}</td>
                                            <td className="px-4 py-3">
                                                {register.course.teacher
                                                    ? `${register.course.teacher.first_name} ${register.course.teacher.last_name}`
                                                    : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-700">No registered courses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

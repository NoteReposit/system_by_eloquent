import { useForm } from "@inertiajs/react";

export default function Edit({ student }) {
    const { data, setData, patch, errors } = useForm({
        first_name: student.first_name,
        last_name: student.last_name,
        gender: student.gender,
        email: student.email,
        phone: student.phone,
        birth_date: student.birth_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/students/${student.id}`); // ส่งข้อมูลไปอัปเดต
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
                
                {/* First Name */}
                <div>
                    <label className="block font-medium">First Name:</label>
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                </div>

                {/* Last Name */}
                <div>
                    <label className="block font-medium">Last Name:</label>
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                </div>

                {/* Gender */}
                <div>
                    <label className="block font-medium">Gender:</label>
                    <select
                        value={data.gender}
                        onChange={(e) => setData("gender", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">Email:</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div>
                    <label className="block font-medium">Phone:</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>

                {/* Birth Date */}
                <div>
                    <label className="block font-medium">Birth Date:</label>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData("birth_date", e.target.value)}
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.birth_date && <span className="text-red-500 text-sm">{errors.birth_date}</span>}
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                    Update Student
                </button>
            </form>
        </div>
    );
}

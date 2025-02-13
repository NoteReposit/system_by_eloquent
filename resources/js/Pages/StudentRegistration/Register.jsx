import { useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_code: "",
        courses: "",
    });

    const [student, setStudent] = useState(null);
    const [studentNotFound, setStudentNotFound] = useState(false);
    const [course, setCourse] = useState(null);
    const [courseNotFound, setCourseNotFound] = useState(false);

    const checkStudent = async () => {
        if (data.student_code) {
            const response = await axios.post("/registrations/check-student", {
                student_code: data.student_code,
            });
            if (response.data.student) {
                setStudent(response.data.student);
                setStudentNotFound(false);
            } else {
                setStudent(null);
                setStudentNotFound(true);
            }
        }
    };

    const checkCourse = async () => {
        if (data.courses) {
            const response = await axios.post("/registrations/check-course", {
                course_code: data.courses,
            });
            if (response.data.course) {
                setCourse(response.data.course);
                setCourseNotFound(false);
            } else {
                setCourse(null);
                setCourseNotFound(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/registrations");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Register Courses</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
                {/* Student Code */}
                <div>
                    <label className="block font-medium">Student Code:</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={data.student_code}
                            onChange={(e) => setData("student_code", e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={checkStudent}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Check
                        </button>
                    </div>
                    {student && <p className="mt-2">Student: {student.first_name} {student.last_name}</p>}
                    {studentNotFound && <p className="mt-2 text-red-500">have no student</p>}
                </div>

                {/* Course Code */}
                <div>
                    <label className="block font-medium">Course Code:</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={data.courses}
                            onChange={(e) => setData("courses", e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                        <button
                            type="button"
                            onClick={checkCourse}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Check
                        </button>
                    </div>
                    {course && <p className="mt-2">Course: {course.name}</p>}
                    {courseNotFound && <p className="mt-2 text-red-500">have no course</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
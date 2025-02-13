<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Course;
use App\Models\Register;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('StudentRegistration/Register');
    }

    public function checkStudent(Request $request)
    {
        $student = Student::where('student_code', $request->input('student_code'))->first();
        return response()->json(['student' => $student]);
    }


    public function checkCourse(Request $request)
    {
        $course = Course::where('course_code', $request->input('course_code'))->first();
        return response()->json(['course' => $course]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_code' => 'required|exists:students,student_code',
            'courses' => 'required|exists:courses,course_code',
        ]);

        $student = Student::where('student_code', $validated['student_code'])->first();
        $course = Course::where('course_code', $validated['courses'])->first();

        Register::create([
            'student_id' => $student->id,
            'course_id' => $course->id,
            'register_date' => now(),
        ]);

        return redirect()->route('students.index')->with('success', 'Courses registered successfully.');
    }
}

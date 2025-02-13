<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('search');
        $sortColumn = $request->input('sort', 'id');
        $sortDirection = $request->input('direction', 'asc');

        $students = Student::when($query, function ($q) use ($query) {
            $q->where('first_name', 'like', '%' . $query . '%')
                ->orWhere('last_name', 'like', '%' . $query . '%');
        })->orderBy($sortColumn, $sortDirection)
            ->paginate(20);


        return Inertia::render('StudentRegistration/Index', [
            'students' => $students,
            'query' => $query,
            'sortColumn' => $sortColumn,
            'sortDirection' => $sortDirection,
        ]);
    }

    public function detail($id)
    {
        $student = Student::with([
            'registers.course.teacher:id,first_name,last_name'
        ])->find($id);

        return Inertia::render('StudentRegistration/Detail', [
            'student' => $student,
        ]);
    }

    public function create()
    {
        return Inertia::render('StudentRegistration/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|email|string|max:50|unique:students,email',
            'phone' => 'nullable|string|max:10',
            'birth_date' => 'required|date',
            'gender' => 'required|in:M,F',
        ]);

        // ค้นหาค่า student_code ล่าสุด และเพิ่มทีละ 1
        $lastStudentCode = Student::max('student_code') ?? '0000000000';
        $studentCode = str_pad((int)$lastStudentCode + 1, 10, '0', STR_PAD_LEFT);

        // สร้างข้อมูลใหม่
        Student::create([
            'student_code' => $studentCode,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'birth_date' => $validated['birth_date'],
            'gender' => $validated['gender'],

        ]);

        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id); 

        return Inertia::render('StudentRegistration/Edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|email|string|max:50|unique:students,email,' . $id,
            'phone' => 'nullable|string|max:10',
            'birth_date' => 'required|date',
            'gender' => 'required|in:M,F',
        ]);

        $student = Student::findOrFail($id);
        $student->update($validated);

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }
}

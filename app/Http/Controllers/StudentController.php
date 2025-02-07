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

    public function registration($id)
    {
        $student = Student::with([
            'registers.course.teacher:id,first_name,last_name'
        ])->find($id);
    
        return Inertia::render('StudentRegistration/Registration', [
            'student' => $student,
        ]);
    }
}

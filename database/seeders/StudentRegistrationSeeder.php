<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Course;
use App\Models\Register;

class StudentRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // สร้าง 200 นักเรียน
        Student::factory()->count(200)->create();

        // สร้างครู 100 คน 
        Teacher::factory()->count(100)->create();

        // สร้าง 110 วิชาเรียน และสุ่มให้ครูเป็นเจ้าของ
        for ($i = 0; $i < 110; $i++) {
            Course::factory()
                ->create([
                    'teacher_id' => Teacher::all()->random()->id
            ]);
        }

        // นักเรียนแต่ละคนลงทะเบียนเรียน 6 วิชาแบบสุ่ม
        $courses = Course::all();
        foreach (Student::all() as $student) {
            $student->courses()->attach(
                $courses->random(6)->pluck('id')->toArray()
            );
        }
    }
}

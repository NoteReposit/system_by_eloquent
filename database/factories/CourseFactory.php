<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Course;
use App\Models\Teacher;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition(): array
    {
        return [
            'course_code' => $this->faker->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'credits' => $this->faker->numberBetween(1, 4),
            'teacher_id' => Teacher::factory(),
        ];
    }
}

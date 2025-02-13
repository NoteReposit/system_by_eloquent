<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Student;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    private static int $counter = 0;

    public function definition(): array
    {
        self::$counter++;

        return [
            'student_code' => str_pad(self::$counter, 10, '0', STR_PAD_LEFT),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->optional()->phoneNumber,
            'birth_date' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['M', 'F']),
        ];
    }
}

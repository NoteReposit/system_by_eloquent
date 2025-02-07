<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Booking;
use App\Models\Room;
use App\Models\Customer;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'room_id' => Room::factory(),
            'customer_id' => Customer::factory(),
            'check_in' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'check_out' => $this->faker->dateTimeBetween('now', '+1 week')->format('Y-m-d'),
            'total_price' => $this->faker->randomFloat(2, 1000, 20000),
        ];
    }
}

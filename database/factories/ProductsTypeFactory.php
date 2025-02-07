<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductsType;

class ProductsTypeFactory extends Factory
{
    protected $model = ProductsType::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
        ];
    }
}

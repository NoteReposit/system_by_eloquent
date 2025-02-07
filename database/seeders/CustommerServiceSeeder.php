<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductsType;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustommerServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // สร้าง 100 ลูกค้า
        Customer::factory()->count(100)->create();

        // booking ----------------
        // สร้าง RoomType 3 ประเภท แต่ละประเภทมี 10 ห้อง
        RoomType::factory()
        ->count(3)
        ->has(Room::factory()->count(10))
        ->create();

        // สร้าง booking ให้ลูกค้าแต่ละคน โดยสุ่มจองห้อง
        foreach (Customer::all() as $customer) {
            Booking::factory()
                ->count(rand(1, 3))
                ->create([
                    'customer_id' => $customer->id,
                    'room_id' => Room::all()->random()->id,
                    'check_in' => now(),
                    'check_out' => now()->addDays(rand(1, 5))
                ]);
        }

        // product ----------------
        // สร้าง 30 ประเภทสินค้า
        ProductsType::factory()->count(30)->create();

        // สร้าง 200 สินค้า และสุ่มประเภทสินค้า
        for ($i = 0; $i < 200; $i++) {
            Product::factory()
                ->create([
                    'product_type_id' => ProductsType::all()->random()->id
                ]);
        }

        // สร้าง order ให้ลูกค้าแต่ละคน โดยสุ่มสินค้า
        foreach (Customer::all() as $customer) {
            Order::factory()
                ->count(rand(1, 10))
            ->create([
                'customer_id' => $customer->id,
            ]);
        }

        // สร้าง order_detail ให้ order แต่ละอัน โดยสุ่มสินค้า
        $products = Product::all();
        foreach (Order::all() as $order) {
            $order->products()->attach(
                $products->random(10)->pluck('id')->toArray(),
                ['quantity' => rand(1, 10), 'sub_total' => mt_rand(100, 1000)]
            );
        }
    }
}

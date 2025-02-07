<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillable = [
        'product_type_id',
        'name',
        'description',
        'price',
        'stock',
    ];

    public function productType()
    {
        return $this->belongsTo(ProductsType::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_details')
                    ->withPivot('quantity', 'sub_total')
                    ->withTimestamps();
    }
}

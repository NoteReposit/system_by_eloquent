<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomType extends Model
{
    use HasFactory;
    protected $table = 'room_types';

    protected $fillable = [
        'name',
        'description',
        'price_per_night',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}

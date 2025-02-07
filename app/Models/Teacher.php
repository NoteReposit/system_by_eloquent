<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;
    protected $table = 'teachers'; // กำหนดชื่อตาราง

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
    ];

    /**
     * ความสัมพันธ์กับรายวิชา (Courses)
     */
    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}

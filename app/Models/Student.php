<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'students';

    protected $fillable = [
        'student_code',
        'first_name',
        'last_name',
        'email',
        'phone',
        'birth_date',
        'gender',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'registers')->withPivot('register_date')->withTimestamps();
    }

    public function registers()
    {
        return $this->hasMany(Register::class);
    }
}

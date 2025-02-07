<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses'; // กำหนดชื่อตาราง

    protected $fillable = [
        'course_code',
        'name',
        'description',
        'credits',
        'teacher_id',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'registers')->withPivot('register_date')->withTimestamps();
    }

    public function registers()
    {
        return $this->hasMany(Register::class);
    }
}

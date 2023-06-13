<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'identity_number',
        'birth_date',
        'province',
        'city',
        'address',
        'description',
        'avg_rating',
        'num_of_reviews',
        'num_of_order',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

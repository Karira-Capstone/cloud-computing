<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'avg_rating',
        'num_of_reviews',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_at',
        'last_updated',
        'type',
        'title',
        'price',
        'avg_rating',
        'num_of_reviews',
        'worker_id',
        'category_id',
    ];

    public function worker()
    {
        return $this->belongsTo(Worker::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

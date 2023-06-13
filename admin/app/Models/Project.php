<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_at',
        'last_updated',
        'type',
        'lower_bound',
        'upper_bound',
        'duration',
        'description',
        'attachment',
        'client_id',
        'category_id',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

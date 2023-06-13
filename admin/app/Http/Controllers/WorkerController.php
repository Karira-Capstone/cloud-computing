<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use Illuminate\Http\Request;

class WorkerController extends Controller
{
    public function index()
    {
        $workers = Worker::all();
        return view('workers.index', compact('workers'));
    }

    public function show(Worker $worker)
    {
        return view('workers.show', compact('worker'));
    }

    // Add other controller methods as needed
}

<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return view('clients.index', compact('clients'));
    }

    public function show(Client $client)
    {
        return view('clients.show', compact('client'));
    }

    // Add other controller methods as needed
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Client;
use App\Models\Project;
use App\Models\Service;
use App\Models\Worker;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $clients = [
            [
                'phone' => '1234567890',
                'avg_rating' => 0,
                'num_of_reviews' => 0,
                'user_id' => 1,
            ],
            [
                'phone' => '9876543210',
                'avg_rating' => 0,
                'num_of_reviews' => 0,
                'user_id' => 2,
            ],
            // Add more client data as needed
        ];

        $projects = [
            [
                'type' => 'ONREVIEW',
                'lower_bound' => 100,
                'upper_bound' => 200,
                'duration' => 30,
                'description' => 'Project 1 description',
                'attachment' => 'project1.pdf',
                'client_id' => 1,
                'category_id' => 1,
            ],
            [
                'type' => 'APPROVED',
                'lower_bound' => 500,
                'upper_bound' => 1000,
                'duration' => 45,
                'description' => 'Project 2 description',
                'attachment' => 'project2.pdf',
                'client_id' => 2,
                'category_id' => 2,
            ],
            // Add more project data as needed
        ];

        $services = [
            [
                'type' => 'ONREVIEW',
                'lower_bound' => 100,
                'upper_bound' => 200,
                'duration' => 30,
                'description' => 'Project 1 description',
                'attachment' => 'project1.pdf',
                'client_id' => 1,
                'category_id' => 1,
            ],
            [
                'type' => 'APPROVED',
                'lower_bound' => 500,
                'upper_bound' => 1000,
                'duration' => 45,
                'description' => 'Project 2 description',
                'attachment' => 'project2.pdf',
                'client_id' => 2,
                'category_id' => 2,
            ],
        ];

        $workers = [
            [
                'phone' => '123456789',
                'identity_number' => 'ABC123',
                'birth_date' => '1990-01-01',
                'province' => 'California',
                'city' => 'Los Angeles',
                'address' => '123 Main St',
                'description' => 'Worker 1 description',
                'avg_rating' => 0,
                'num_of_reviews' => 0,
                'num_of_order' => 0,
                'user_id' => 1,
            ],
            [
                'phone' => '987654321',
                'identity_number' => 'DEF456',
                'birth_date' => '1990-02-02',
                'province' => 'New York',
                'city' => 'New York City',
                'address' => '456 Elm St',
                'description' => 'Worker 2 description',
                'avg_rating' => 0,
                'num_of_reviews' => 0,
                'num_of_order' => 0,
                'user_id' => 2,
            ],
            // Add more worker data as needed
        ];

        $categories = [
            [
                'id' => 1,
                'title' => 'Category 1',
            ],
            [
                'id' => 2,
                'title' => 'Category 2',
            ],
            // Add more category data as needed
        ];

        DB::beginTransaction();

        try {
            // Insert categories
            foreach ($categories as $category) {
                Category::create($category);
            }

            // Insert clients
            foreach ($clients as $client) {
                Client::create($client);
            }
            
            // Insert workers
            foreach ($workers as $worker) {
                Worker::create($worker);
            }

            // Insert projects
            foreach ($projects as $project) {
                Project::create($project);
            }
            
            // Insert services
            foreach ($services as $service) {
                Service::create($service);
            }


            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}

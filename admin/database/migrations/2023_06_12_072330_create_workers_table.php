<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workers', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string('identity_number');
            $table->dateTime('birth_date');
            $table->string('province');
            $table->string('city');
            $table->text('address');
            $table->text('description');
            $table->integer('avg_rating')->default(0);
            $table->integer('num_of_reviews')->default(0);
            $table->integer('num_of_order')->default(0);
            $table->unsignedBigInteger('user_id')->default(0);;

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Schema::dropIfExists('projects');

        // Enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};


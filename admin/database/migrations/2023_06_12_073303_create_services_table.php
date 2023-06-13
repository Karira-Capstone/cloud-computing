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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['ONREVIEW', 'APPROVED', 'INPROGRESS', 'CLOSED']);
            $table->integer('lower_bound');
            $table->integer('upper_bound');
            $table->integer('duration');
            $table->text('description');
            $table->string('attachment', 191);
            $table->unsignedBigInteger('client_id')->default(0);;
            $table->unsignedBigInteger('category_id')->default(0);;

            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('category_id')->references('id')->on('categories');

            $table->index(['client_id', 'category_id']);

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

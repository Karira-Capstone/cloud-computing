@extends('layouts.master')
@section('title', 'Service')
@section('content')


<div class="content-page">
    <div class="content">

        <!-- Start Content-->
        <div class="container-fluid">

            <!-- file preview template -->
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="float-end">
                                <a href="" class="btn btn-primary btn-sm waves-effect waves-light" aria-expanded="false">
                                    Add projects<i class="mdi mdi-dots-vertical"></i>
                                </a>
                            </div>
                            <h4 class="mt-0 header-title">My projects</h4>
                            <p class="text-muted font-14 mb-3">
                                This is a list of all the projects you have.
                            </p>
                    
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>projects</th>
                                            <th>Description</th>
                                            <th>Duration</th>
                                            <th>lower bound</th>
                                            <th>upper bound</th>
                                            <th>Categories</th>
                                            <th>Client</th>
                                            <th>Timestamp</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach
                                        <tr>
                                            <th scope="row">{{ $loop->iteration }}</th>
                                            <td>{{ $projects->id }}</td>
                                            <td>{{ $projects->title }}</td>
                                            <td>{{ $projects->description }}</td>
                                            <td>{{ $projects->duration }}</td>
                                            <td>{{ $projects->lower_bound }}</td>
                                            <td>{{ $projects->upper_bound }}</td>
                                            <td>{{ $projects->category->name }}</td>
                                            <td>{{ $projects->client->user_id }}</td>
                                            <td>{{ $projects->created_at}}</td>
                                            <td>
                                                <a href="" class="btn btn-sm btn-warning"><i class="mdi mdi-pencil"></i></a>
                                                <form action="" method="POST" class="d-inline">
                                                    @csrf
                                                    @method('delete')
                                                    <button class="btn btn-sm btn-danger"><i class="mdi mdi-trash-can"></i></button>
                                                </form>
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    
                    </div>
                </div><!-- end col -->
            </div>
            <!-- end row -->  
            
        </div> <!-- container -->

    </div> <!-- content -->
</div>

@endsection
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
                            <h4 class="mt-0 header-title">clients</h4>
                            <p class="text-muted font-14 mb-3">
                                This is a list of all the clients.
                            </p>
                    
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>clients</th>
                                            <th>Description</th>
                                            <th>Categories</th>
                                            <th>Uploaded On</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach
                                        <tr>
                                            <th scope="row">{{ $loop->iteration }}</th>
                                            <td>{{ $clients->user->name}}</td>
                                            <td>{{ $clients->phone }}</td>
                                            <td>{{ $clients->avg_rating }}</td>
                                            <td>{{ $clients->num_of_reviews}}</td>
                                            <td>{{ $clients->created_at}}</td>
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
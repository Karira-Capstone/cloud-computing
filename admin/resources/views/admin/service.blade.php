@extends('layouts.master')
@section('title', 'Services')
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
                                    Add services<i class="mdi mdi-dots-vertical"></i>
                                </a>
                            </div>
                            <h4 class="mt-0 header-title">My services</h4>
                            <p class="text-muted font-14 mb-3">
                                This is a list of all the services you have.
                            </p>
                    
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>services</th>
                                            <th>Description</th>
                                            <th>Categories</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach
                                        <tr>
                                            <th scope="row">{{ $loop->iteration }}</th>
                                            <td>{{ $services->title }}</td>
                                            <td>{{ $services->description }}</td>
                                            <td>{{ $services->category->name }}</td>
                                            <td>{{ $services->created_at}}</td>
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
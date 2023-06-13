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
                                    Add workerss<i class="mdi mdi-dots-vertical"></i>
                                </a>
                            </div>
                            <h4 class="mt-0 header-title">My workerss</h4>
                            <p class="text-muted font-14 mb-3">
                                This is a list of all the workerss you have.
                            </p>
                    
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>workerss</th>
                                            <th>phone</th>
                                            <th>identity_number</th>
                                            <th>birht_date</th>
                                            <th>province</th>
                                            <th>city</th>
                                            <th>address</th>
                                            <th>description</th>
                                            <th>avg_rating</th>
                                            <th>num_of_reviews</th>
                                            <th>num_of_order</th>
                                            <th>created_at</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach
                                        <tr>
                                            <th scope="row">{{ $loop->iteration }}</th>
                                            <td>{{ $workers->name }}</td>
                                            <td>{{ $workers->phone }}</td>
                                            <td>{{ $workers->identity_number }}</td>
                                            <td>{{ $workers->birht_date }}</td>
                                            <td>{{ $workers->province }}</td>
                                            <td>{{ $workers->city }}</td>
                                            <td>{{ $workers->address }}</td>
                                            <td>{{ $workers->description }}</td>
                                            <td>{{ $workers->avg_rating }}</td>
                                            <td>{{ $workers->num_of_reviews }}</td>
                                            <td>{{ $workers->num_of_order }}</td>
                                            <td>{{ $workers->created_at}}</td>
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
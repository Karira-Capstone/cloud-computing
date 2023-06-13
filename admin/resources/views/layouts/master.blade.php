<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8" />
        <title> Volunfis | @yield('title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
        <meta content="Coderthemes" name="author" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="{{ asset('template') }}/images/favicon.ico">

        <!-- Plugins css -->
        <link href="{{ asset('template') }}/libs/dropzone/min/dropzone.min.css" rel="stylesheet" type="text/css" />
        <link href="{{ asset('template') }}/libs/dropify/css/dropify.min.css" rel="stylesheet" type="text/css" />
        
        <!-- App css -->
        <link href="{{ asset('template') }}/css/app.min.css" rel="stylesheet" type="text/css" id="app-style" />

        <!-- icons -->
        <link href="{{ asset('template') }}/css/icons.min.css" rel="stylesheet" type="text/css" />

    </head>

    <!-- body start -->
    <body class="loading" data-layout-color="light"  data-layout-mode="default" data-layout-size="fluid" data-topbar-color="light" data-leftbar-position="fixed" data-leftbar-color="light" data-leftbar-size='default' data-sidebar-user='true'>

        <!-- Begin page -->
        <div id="wrapper">

            <!-- Topbar Start -->
            @include('layouts.partials.navbar')
            <!-- end Topbar -->

            <!-- ========== Left Sidebar Start ========== -->
            @include('layouts.partials.left-sidebar')
            <!-- Left Sidebar End -->

            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->
            <main>
                @yield('content')
            </main>
            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->

        </div>
        <!-- END wrapper -->

        <!-- Right Sidebar -->
        @include('layouts.partials.right-sidebar')
        <!-- /Right-bar -->

        <!-- Footer Start -->

        @include('layouts.partials.footer')

        <!-- Footer end -->

        <!-- Right bar overlay-->
        <div class="rightbar-overlay"></div>

        <!-- Vendor -->
        <script src="{{ asset('template') }}/libs/jquery/jquery.min.js"></script>
        <script src="{{ asset('template') }}/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="{{ asset('template') }}/libs/simplebar/simplebar.min.js"></script>
        <script src="{{ asset('template') }}/libs/node-waves/waves.min.js"></script>
        <script src="{{ asset('template') }}/libs/waypoints/lib/jquery.waypoints.min.js"></script>
        <script src="{{ asset('template') }}/libs/jquery.counterup/jquery.counterup.min.js"></script>
        <script src="{{ asset('template') }}/libs/feather-icons/feather.min.js"></script>

        <!-- knob plugin -->
        <script src="{{ asset('template') }}/libs/jquery-knob/jquery.knob.min.js"></script>

        <!--Morris Chart-->
        <script src="{{ asset('template') }}/libs/morris.js06/morris.min.js"></script>
        <script src="{{ asset('template') }}/libs/raphael/raphael.min.js"></script>
  
        <!-- Dashboar init js-->
        <script src="{{ asset('template') }}/js/pages/dashboard.init.js"></script>

        <!-- App js-->
        <script src="{{ asset('template') }}/js/app.min.js"></script>

        <!-- Plugins js -->
        <script src="{{ asset('template') }}/libs/dropzone/min/dropzone.min.js"></script>
        <script src="{{ asset('template') }}/libs/dropify/js/dropify.min.js"></script>
        
        <!-- Init js-->
        <script src="{{ asset('template') }}/js/pages/form-fileuploads.init.js"></script>

    </body>
</html>
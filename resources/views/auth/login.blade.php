<!DOCTYPE html>

<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" dir="rtl">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
    <meta charset="utf-8"/>
    <title>{{config('app.name')}}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="{{config('app.name')}}" name="description"/>
    <meta content="" name="author"/>

    <link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css" rel="stylesheet" type="text/css"/>


    <link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet">

    <link href="assets/global/css/plugins-rtl.min.css" rel="stylesheet" type="text/css"/>

    <link href="assets/pages/css/login-rtl.min.css" rel="stylesheet" type="text/css"/>

    <link rel="shortcut icon" href="favicon.ico"/>

    <style>
        body {
            font-family: 'Cairo', sans-serif;
        }

        .display-hide {
            display: none;
        }
    </style>
    <!-- END HEAD -->

<body class=" login">
<!-- BEGIN LOGIN -->
<div class="content">
    <!-- BEGIN LOGIN FORM -->
    <form action="#" method="post" class="login-form">
        <h3 class="form-title font-green">Login to your account</h3>
        {{ csrf_field() }}

        @if($errors->any())
            <div class="alert alert-danger">
                <button class="close" data-close="alert"></button>
                <span> {{$errors->first()}} </span>
            </div>
        @endif

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">Email</label>
            <input type="text" name="email" class="form-control form-control-solid placeholder-no-fix"
                   autocomplete="off"
                   placeholder="Email">
        </div>

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">Password</label>
            <input type="password" name="password" class="form-control form-control-solid placeholder-no-fix"
                   autocomplete="off"
                   placeholder="Password">
        </div>

        <br>

        <div class="create-account">
            <p>
                <input value="Login" type="submit" class="btn btn-success uppercase"/>
                <a class="btn btn-primary uppercase" href="{{action('RegisterController@getRegister')}}">Sign Up</a>
            </p>

        </div>
    </form>
</div>
</body>
</html>
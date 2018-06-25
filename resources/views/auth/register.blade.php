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
    <form action="{{action("RegisterController@create")}}" method="post" class="login-form">
        <h3 class="form-title font-green">Sign Up</h3>
        {{ csrf_field() }}

        @if($errors->any())
            <div class="alert alert-danger">
                <button class="close" data-close="alert"></button>
                <span> {{$errors->first()}} </span>
            </div>
        @endif

        @if(session()->has('message'))
            <div class="alert alert-success">
                {{ session()->get('message') }}
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

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">Confirm</label>
            <input type="password" name="confirm" class="form-control form-control-solid placeholder-no-fix"
                   autocomplete="off"
                   placeholder="Confirm">
        </div>

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">Gender</label>
            <select name="gender" class="form-control form-control-solid">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>

        {{--<div class="form-group">--}}
            {{--<label class="control-label ">Gender</label>--}}
            {{--<div class="md-radio-inline">--}}
                {{--<div class="md-radio">--}}
                    {{--Male--}}
                    {{--<input type="radio" id="radio1" name="gender" class="md-radiobtn" checked--}}
                           {{--value="male">--}}
                {{--</div>--}}
                {{--<div class="md-radio">--}}
                    {{--Female--}}
                    {{--<input type="radio" id="radio2"--}}
                           {{--name="gender" class="md-radiobtn" value="female">--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}

        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">DOB</label>
            <input type="text" name="dob" class="form-control form-control-solid placeholder-no-fix"
                   autocomplete="off"
                   placeholder="DOB">
        </div>
        <div class="create-account">
            <p>
                <input value="Sign Up" type="submit" class="btn btn-success uppercase"/>
            </p>
        </div>
    </form>
</div>
</body>
</html>
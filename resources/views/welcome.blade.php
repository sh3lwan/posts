<!DOCTYPE html>
<html>
<title>W3.CSS Template</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="{{asset("css/w3.css")}}">
<link rel="stylesheet" href="{{asset("css/blue-grey.css")}}">
<link rel='stylesheet' href='{{asset("css/OpenSans.css")}}'>
<link rel="stylesheet" href="{{asset("assets/global/plugins/font-awesome/css/font-awesome.min.css")}}">
<style>
    html, body, h1, h2, h3, h4, h5 {
        font-family: "Open Sans", sans-serif
    }
</style>
<body class="w3-theme-l5">

<div class="w3-top">
    <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
        <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
           href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
        <a href="#" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i
                    class="fa fa-home w3-margin-right"></i>POSTS</a>
    </div>
</div>

<div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
    <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
</div>


<div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">
    <!-- The Grid -->
    <div class="w3-row">
        <!-- Left Column -->
        <div class="w3-col m3">
            <!-- Profile -->
            <div class="w3-card w3-round w3-white">
                <div class="w3-container">
                    <h4 class="w3-center">My Profile</h4>
                    <p class="w3-center"><img src="{{url(Auth::user()->image)}}" class="w3-circle"
                                              style="height:106px;width:106px" alt="Avatar"></p>
                    <hr>
                    <p><i class="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i>{{Auth::user()->job}}Reham Hijazi</p>
                    <p><i class="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {{Auth::user()->city}}Atyaf Company</p>
                    <p>
                        <i class="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> {{ Auth::user()->birth_date ? date('Y MM d', strtotime(Auth::user()->birth_date)) : ''}}06-02-1997
                    </p>
                </div>
            </div>
        </div>
        <div class="w3-col m7">

            <div class="w3-row-padding">
                <div class="w3-col m12">
                    <div class="w3-card w3-round w3-white">
                        <div class="w3-container w3-padding">
                            <h6 class="w3-opacity">Add a new post:</h6>
                            <form method="get" action="{{action("HomeController@store")}}">
                                <input style="width: 100%;margin-bottom: 10px;" class="w3-border w3-padding"
                                       type="text" contenteditable="true" name="content">
                                <button type="submit" class="w3-button w3-theme"><i class="fa fa-pencil"></i>  Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            @foreach($posts as $post)
                <div class="w3-container w3-card w3-white w3-round w3-margin"><br>
                    <img src="{{$post->user ? asset($post->user->image) : ''}}" alt="Avatar"
                         class="w3-left w3-circle w3-margin-right"
                         style="width:60px">
                    <span class="w3-right w3-opacity">{{$post->created_at ? date('Y M d', strtotime($post->created_at)) : ''}}</span>
                    <h4>{{$post->user ? $post->user->name : ''}}</h4><br>
                    <hr class="w3-clear">
                    <p>{{$post->content}}</p>
                    <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>
                         Like
                    </button>
                    <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>
                         Comment
                    </button>
                </div>
            @endforeach
        </div>
    </div>
</div>
</body>
</html>
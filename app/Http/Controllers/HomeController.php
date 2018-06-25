<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{

    public function index(Request $request)
    {
        $user_id = Auth::id();
        $posts = Post::where('user_id', $user_id)->with('user')->get();
        return view('welcome', compact('posts'));

    }

    public function store(Request $request)
    {
        $inputs = $request->input();
        $validator = Validator::make($inputs, [
            'content' => 'required'
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors(['message' => 'الرجاء التأكد من المعلومات المدخلة']);

        $userID = Auth::id();

        $post = new Post();
        $post->content = $inputs['content'];
        $post->user_id = $userID;
        $post->save();

        return redirect()->back();

    }
}

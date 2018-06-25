<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{

    public function index(Request $request)
    {

        return view('auth.login');

    }

    public function login(Request $request)
    {

        $auth = $this->authenticate($request);

        if ($auth) {
            return redirect('/');
        } else {
            return redirect('login')->withErrors(['message' => 'الرجاء التأكد من المعلومات المدخلة']);
        }
    }

    public function logout()
    {
        Auth::logout();
        Session::flush();
        return redirect('dashboard');
    }

    private function authenticate($request)
    {
        $email = $request->email;
        $password = $request->password;
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return true;
        }
        return false;
    }
}

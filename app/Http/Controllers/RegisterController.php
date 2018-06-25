<?php

namespace App\Http\Controllers;

use App\Profile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function getRegister()
    {
        return view("auth.register");
    }

    public function create(Request $request)
    {
        $inputs = $request->input();
        $validator = Validator::make($inputs, [
            'email' => 'required|email',
            'gender' => 'required|in:male,female',
            'password' => 'required',
            'confirm' => 'required|same:password',
        ]);

        if ($validator->fails())
            return redirect()->back()->withErrors(['message' => 'الرجاء التأكد من المعلومات المدخلة']);

        $inputs['password'] = bcrypt($inputs['password']);

        $user = new User();
        foreach ($user->getFillable() as $fillable) {
            if (!empty($inputs[$fillable]))
                $user->{$fillable} = $inputs[$fillable];
        }
        if ($user->save()) {
            return redirect()->back()->with('message', 'IT WORKS!');
        }
        return redirect()->back()->withErrors(['message' => 'الرجاء التأكد من المعلومات المدخلة']);

    }
}

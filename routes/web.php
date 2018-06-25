<?php

Route::get("/register", "RegisterController@getRegister");
Route::post("register/create", "RegisterController@create");

Route::get("login", "Auth\LoginController@index")->name('login');
Route::post("login", "Auth\LoginController@login");
Route::get("logout", "Auth\LoginController@logout");


Route::get("/", 'HomeController@index')->middleware('auth');

Route::get("/post", "HomeController@store")->middleware('auth');

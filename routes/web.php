<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Example', [
        'time' => date('H:ia'),
    ]);
});

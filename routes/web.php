<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//$router->get('/', function () use ($router) {
//    return $router->app->version();
//});
$router -> get('/', 'PageController@index');
$router -> get('/committee', 'PageController@committee');
$router -> get('/conference-about', 'PageController@conference_about');
$router -> get('/conference-general-info', 'PageController@conference_general_info');
$router -> get('/conference-topics', 'PageController@conference_topics');
$router -> get('/abstract-book', 'PageController@abstract_book');

$router -> get('/program-short', 'PageController@program_short');
$router -> get('/program-detailed', 'PageController@program_detailed');
$router -> get('/program-social', 'PageController@program_social');
$router -> get('/courses', 'PageController@program_courses');

/*$router -> get('/submission', 'PageController@submission');*/
$router -> get('/submit-abstract', 'PageController@submit_abstract');
$router -> get('/awards', 'PageController@awards');

$router -> get('/registration', 'PageController@registration');
$router -> get('/sponsorship', 'PageController@sponsorship');
$router -> get('/venue', 'PageController@venue');
// $router -> get('/announcements', 'PageController@announcements');
$router -> get('/contact', 'PageController@contact');

$router -> get('/speakers', 'PageController@speakers');

//$router->group(['middleware' => 'auth'], function () use ($router) {
//    $router->get('/', function () {
//        // Uses Auth Middleware
//    });
//
//    $router->get('user/profile', function () {
//        // Uses Auth Middleware
//    });
//});

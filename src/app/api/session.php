<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// require ('config.php');
// // Get the posted data.
// $postData = file_get_contents("php://input");

// var_dump($postData);

// if(isset($postData) && !empty($postData))
// {
//   // Extract the data.
//   $request = json_decode($postData); 

//   print_r($request);

// }


session_start();
$_SESSION['token'] = "'guy@deleteme.com'";

?>
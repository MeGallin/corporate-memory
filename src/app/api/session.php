<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// require ('config.php');
// Get the posted data.
// $postData = file_get_contents("php://input");

 // Extract the data.
//  $request = json_decode($postData); 
//  var_dump($request);	
// Sanitize.  
//   $email = mysqli_real_escape_string($conn, trim($request->email));
// $emailX = $request->email;
//   var_dump($emailX);

// setcookie('emailToke', $emailX);
session_start();
$_SESSION['emailToken'] = "'me@garyallin.uk'";

?>
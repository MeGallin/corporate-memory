<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// // Get the posted data.
// $postData = file_get_contents("php://input");

// if(isset($postData) && !empty($postData))
// {
//   // Extract the data.
//   $request = json_decode($postData);
  
//   if(isset($request -> email) && !empty($request -> email))
//   {
      
//       $email = $request -> email;
//       // var_dump($email);
      
//         $_SESSION['emailToken'] = "$email";
//         // var_dump($_SESSION['emailToken']);
//   }

// }


// $_SESSION['emailToken'] = "'me@garyallin.uk'";
$_SESSION['emailTokenZach'] = "'zach@fisicalfitness.co.uk'";
?>
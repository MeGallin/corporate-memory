<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require ('config.php');
session_start();

// Get the posted data.
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData))
{
  // Extract the data.
  $request = json_decode($postData);
  
  if(isset($request -> email) && !empty($request -> email))
  {
      
      $email = $request -> email;
      
        $_SESSION['emailToken'] = "$email";
        // var_dump($_SESSION['emailToken']);
  }

} 

// session_start();
// $_SESSION['emailToken'] = "'me2@garyallin.uk'";
?>
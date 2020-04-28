<?php
require ('config.php');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // Validate.
  if ((int)$request->id < 1 ) {
    return http_response_code(400);
  }
    
  // Sanitize.
  $id = mysqli_real_escape_string($conn, (int)$request->id);
  $reminder = mysqli_real_escape_string($conn, trim($request->reminder));  

  // Update.
  $sql = "UPDATE `memories` SET `reminder`='$reminder' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($conn, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
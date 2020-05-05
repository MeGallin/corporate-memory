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
  $title = mysqli_real_escape_string($conn, trim($request->title));
  $memory = mysqli_real_escape_string($conn, trim($request->memory));
  $dueDate = mysqli_real_escape_string($conn, trim($request->dueDate));
  $tagNames = mysqli_real_escape_string($conn, trim($request->tagNames));
  $importance = mysqli_real_escape_string($conn, trim($request->importance));

  // Update.
  $sql = "UPDATE `memories` SET `title`='$title',`memory`='$memory', `dueDate`=
  DATE_ADD('$dueDate', INTERVAL 12 HOUR), `tagNames`='$tagNames', `importance`='$importance' WHERE `id` = '{$id}' LIMIT 1";

  if(mysqli_query($conn, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
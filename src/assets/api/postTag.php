<?php
require ('config.php');

// Get the posted data.
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData))
{
  // Extract the data.
  $request = json_decode($postData); 

  //   print_r($request);
	
  // Sanitize.
  $memoryId = mysqli_real_escape_string($conn, trim($request->memoryId));
  $tagName = mysqli_real_escape_string($conn, trim($request->tagName));
  $email = mysqli_real_escape_string($conn, trim($request->email));
 

// session_start();
$_SESSION['emailToken'] = "$email";   
  // Store.
  $sql = "INSERT INTO `tags`(`memoryId`,`tagName`,`email`) VALUES 
  ('{$memoryId}','{$tagName}','{$email}')";

  var_dump($sql);

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
        'memoryId' => $memoryId,
        'tagName' => $tagName,
        'email' => $email,
    ];
    
    echo json_encode($data);
  }
  else
  {
    http_response_code(422);
  }
}
?>
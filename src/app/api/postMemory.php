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
  $subId = mysqli_real_escape_string($conn, trim($request->subId));
  $email = mysqli_real_escape_string($conn, trim($request->email));
  $title = mysqli_real_escape_string($conn, trim($request->title));
  $memory = mysqli_real_escape_string($conn, trim($request->memory));

  session_start();
$_SESSION['token'] = "$email";
   
  // Store.
  $sql = "INSERT INTO `memories`(`subId`,`email`,`title`, `memory`) VALUES 
  ('{$subId}','{$email}','{$title}','{$memory}')";

  var_dump($sql);

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
        'subId' => $subId,
        'email' => $email,
        'title' => $title,
        'memory' => $memory
    ];
    
    echo json_encode($data);
  }
  else
  {
    http_response_code(422);
  }
}
?>
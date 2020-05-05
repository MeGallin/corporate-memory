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
  $dueDate = mysqli_real_escape_string($conn, trim($request->dueDate));
  $tagNames = mysqli_real_escape_string($conn, trim($request->tagNames));
  $importance = mysqli_real_escape_string($conn, trim($request->importance));

session_start();
$_SESSION['emailToken'] = "$email";   
// setcookie('emailToke', $email);
  // Store.
  $sql = "INSERT INTO `memories`(`subId`,`email`,`title`, `memory`, `dueDate`, `tagNames`,`importance`) VALUES 
  ('{$subId}','{$email}','{$title}','{$memory}','{$dueDate}', '$tagNames', '$importance')";

  // var_dump($sql);

  if(mysqli_query($conn,$sql))
  {
    http_response_code(201);
    $data = [
        'subId' => $subId,
        'email' => $email,
        'title' => $title,
        'memory' => $memory,
        'dueDate' => $dueDate,
        'tagNames' => $tagNames,
        'importance' => $importance,
    ];
    
    echo json_encode($data);
  }
  else
  {
    http_response_code(422);
  }
}
?>
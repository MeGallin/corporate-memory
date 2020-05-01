<?php
require ('config.php');
error_reporting( E_ALL );


$postDate = file_get_contents("php://input");
if(isset($postDate) && !empty($postDate)) {

    $_REQUEST = json_decode($postDate);    

// Sanitize.for saving to DB
$name = mysqli_real_escape_string($conn, trim($_REQUEST->name)); 
$email = mysqli_real_escape_string($conn, trim($_REQUEST->email)); 
$telephone = mysqli_real_escape_string($conn, trim($_REQUEST->telephone));
$message = mysqli_real_escape_string($conn, trim($_REQUEST->message)); 

//Store data in DB
$sql = "INSERT INTO `contact_form`(`name`,`email`,`telephone`, `message`) VALUES 
  ('{$name}','{$email}','{$telephone}','{$message}')";

if(mysqli_query($conn,$sql))
{
  http_response_code(201);
  $data = [
      'name' => $name,
      'email' => $email,
      'telephone' => $telephone,
      'message' => $message,      
  ];
  
  echo json_encode($data);
}
else
{
  http_response_code(422);
}

// Handle email request
//NB convert back to array by adding true
$_REQUEST = json_decode($postDate, true);

$my_email = "me@garyallin.uk";
$from_email = "";
$continue = "https://www.yourcorporatememory.com";
$errors = array();

// This is to check for the hidden field to kill bots..by GA
if(isset($_REQUEST['hiddenName']) && !empty($_REQUEST['hiddenName'])) {
    die('You are not human!' . '<a href="http://www.yahoo.com"> Click here to try again</a>');
   }

// Remove $_COOKIE elements from $_REQUEST.
if(count($_COOKIE)){foreach(array_keys($_COOKIE) as $value){unset($_REQUEST[$value]);}}

// Validate email field.

if(isset($_REQUEST['email']) && !empty($_REQUEST['email']))
{

$_REQUEST['email'] = trim($_REQUEST['email']);

if(substr_count($_REQUEST['email'],"@") != 1 || stristr($_REQUEST['email']," ") || stristr($_REQUEST['email'],"\\") || stristr($_REQUEST['email'],":")){$errors[] = "Email address is invalid";}else{$exploded_email = explode("@",$_REQUEST['email']);if(empty($exploded_email[0]) || strlen($exploded_email[0]) > 64 || empty($exploded_email[1])){$errors[] = "Email address is invalid";}else{if(substr_count($exploded_email[1],".") == 0){$errors[] = "Email address is invalid";}else{$exploded_domain = explode(".",$exploded_email[1]);if(in_array("",$exploded_domain)){$errors[] = "Email address is invalid";}else{foreach($exploded_domain as $value){if(strlen($value) > 63 || !preg_match('/^[a-z0-9-]+$/i',$value)){$errors[] = "Email address is invalid"; break;}}}}}}

}

// Check referrer is from same site.

// if(!(isset($_SERVER['HTTP_REFERER']) && !empty($_SERVER['HTTP_REFERER']) && stristr($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST']))){$errors[] = "You must enable referrer logging to use the form";}

// Check for a blank form.

function recursive_array_check_blank($element_value)
{

global $set;

if(!is_array($element_value)){if(!empty($element_value)){$set = 1;}}
else
{

foreach($element_value as $value){if($set){break;} recursive_array_check_blank($value);}

}

}

recursive_array_check_blank($_REQUEST);

if(!$set){$errors[] = "You cannot send a blank form";}

unset($set);

// Display any errors and exit if errors exist.

if(count($errors)){foreach($errors as $value){print "$value<br>";} exit;}

if(!defined("PHP_EOL")){define("PHP_EOL", strtoupper(substr(PHP_OS,0,3) == "WIN") ? "\r\n" : "\n");}

// Build message.

function build_message($request_input){if(!isset($message_output)){$message_output ="";}if(!is_array($request_input)){$message_output = $request_input;}else{foreach($request_input as $key => $value){if(!empty($value)){if(!is_numeric($key)){$message_output .= str_replace("_"," ",ucfirst($key)).": ".build_message($value).PHP_EOL.PHP_EOL;}else{$message_output .= build_message($value).", ";}}}}return rtrim($message_output,", ");}

$message = build_message($_REQUEST);

$message = $message . PHP_EOL.PHP_EOL."".PHP_EOL."This message was sent from the form on your website."; // This is the message at the bottom of the email

    $message = stripslashes($message);

    $subject = " Contact me form"; // This is the subject line on the email!

    $subject = stripslashes($subject);

if($from_email)
{

    $headers = "From: " . $from_email;
    $headers .= PHP_EOL;
    $headers .= "Reply-To: " . $_REQUEST['email'];

}
else
{
    $from_name = "";
    if(isset($_REQUEST['name']) && !empty($_REQUEST['name'])){$from_name = stripslashes($_REQUEST['name']);}
    $headers = "From: {$from_name} <{$_REQUEST['email']}>";
}

mail($my_email,$subject,$message,$headers);
} /* End of isset Check */
?>


<?php
include_once('config.php');


$foo = $_SESSION['token'];
// echo var_dump($foo);

  //echo "Connected successfully";
$sql = "SELECT * FROM `memories` WHERE `email` = $foo order by Id asc";
$result = mysqli_query($conn,$sql); 
$myArray = array();

if ($result->num_rows > 0) {
// output data of each row
    while($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }    
    print json_encode($myArray);
} 
else 
{
    echo "0 results";
}

?>
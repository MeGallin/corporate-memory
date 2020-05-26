<?php
error_reporting( E_ALL );
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include_once('session.php');
include_once('sessionZach.php');

$serverName = "localhost";
$username   = "corpmem_corpmem";
$password   = "rPYfwZ48MW2^";
$dbname     = "corpmem_yourCorporateMemory";

// Create connection
$conn = new mysqli($serverName, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
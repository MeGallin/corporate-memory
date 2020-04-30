<?php
error_reporting( E_ALL );
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include_once('session.php');

$serverName = "localhost";
$username   = "corpmem_corpmem";
$password   = "rPYfwZ48MW2^";
$dbname     = "corpmem_yourCorporateMemory";

// $serverName = "localhost";
// $username   = "root";
// $password   = "gazf1828";
// $dbname     = "corporate-memory";

// Create connection
$conn = new mysqli($serverName, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
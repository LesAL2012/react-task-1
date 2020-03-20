<?php

require_once 'config_db.php';

$mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD,DBNAME);

$postName = $_POST['name'];
$userTable = 'react_task_1_users';

$pass_db = mysqli_fetch_assoc($mysqli->query("SELECT password FROM $userTable WHERE email = '$postName' LIMIT 1"));
$hash_db = mysqli_fetch_assoc($mysqli->query("SELECT hash FROM $userTable WHERE email = '$postName' LIMIT 1"));
$rights_db = mysqli_fetch_assoc($mysqli->query("SELECT role FROM $userTable WHERE email = '$postName' LIMIT 1"));

if($_POST['logIn'] === 'true' && $pass_db['password'] === md5($_POST['pass'])){    
    $hash = md5(random_int ( 0 , 1000 ));    
    $mysqli->query("UPDATE $userTable SET hash = '$hash'  WHERE email = '$postName' ");
    echo json_encode([
        'name' => $_POST['name'],
        'hash' => $hash,
        'role' => $rights_db['role']
    ]);
} elseif($_POST['checkLogIn'] === 'true' && $_POST['hash'] === $hash_db['hash']){
    echo json_encode([
        'name' => $_POST['name'],
        'hash' => $_POST['hash'],
        'role' => $rights_db['role'],
    ]);
} else {
    echo 'false';
}

$mysqli->close();
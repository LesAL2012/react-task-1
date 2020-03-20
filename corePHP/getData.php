<?php

require_once 'config_db.php';
require_once 'queryClientTask.php';

$mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD,DBNAME);

$name = $_GET['name'];

$hash_db = mysqli_fetch_assoc($mysqli->query("SELECT hash FROM react_task_1_users WHERE email = '$name' LIMIT 1"));
$role_db = mysqli_fetch_assoc($mysqli->query("SELECT role FROM react_task_1_users WHERE email = '$name' LIMIT 1"));

if(
    $_GET['hash'] === $hash_db['hash']    
&& $_GET['role'] === $role_db['role'] 
&& $_GET['role'] === 'admin' 
&& $_GET['action'] === 'getUsers'
){
    
    echo getUsersData();
}else if(
    $_GET['hash'] === $hash_db['hash']    
&& $_GET['role'] === $role_db['role'] 
&& ($_GET['role'] === 'admin' || $_GET['role'] === 'user')
&& $_GET['action'] === 'getClients'
){    
    echo getClientsData();
}
else if(
    $_GET['hash'] === $hash_db['hash']    
&& $_GET['role'] === $role_db['role'] 
&& ($_GET['role'] === 'admin' || $_GET['role'] === 'user')
&& $_GET['action'] === 'getTaskUserId'
){    
    echo getTasksData($_GET['id']);    
}


else {
    echo 'false';
}

$mysqli->close();
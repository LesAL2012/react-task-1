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
    $page = $_GET['page'];
    $limit = $_GET['limit'];    


    if($_GET['filterName'] === 'ALL' && $_GET['filterCity'] === 'ALL'){
        echo getClientsDataFull($page, $limit);
    }
    else if($_GET['filterName'] !== 'ALL' && $_GET['filterCity'] === 'ALL'){
        echo getClientsDataFilterName($_GET['filterName'], $page, $limit);
    }
    else if($_GET['filterName'] !== 'ALL' && $_GET['filterCity'] !== 'ALL'){
        echo getClientsDataFilterNameCity($_GET['filterName'], $_GET['filterCity'], $page, $limit);
    }    
    else{
        echo getClientsFilterCity( $_GET['filterCity'], $page, $limit);
    }    
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
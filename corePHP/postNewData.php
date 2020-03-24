<?php

require_once 'config_db.php';
require_once 'queryClientTask.php';

$mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD,DBNAME);

$name = $_POST['name'];

$FirstName = $_POST['FirstName'];
$LastName = $_POST['LastName'];
$City = $_POST['City'];
$Address = $_POST['Address'];
$Phone = $_POST['Phone'];

$email = $_POST['email'];
$password = md5($_POST['password']);
$roleUser = $_POST['roleUser'];

$id_client= $_POST['idClient'];
$taskName= $_POST['taskName'];
$description= $_POST['description'];
$date= $_POST['date'];
$startTime= $_POST['startTime'];
$endTime= $_POST['endTime'];

$whereIdTask=$_POST['WHERE_ID_TASK'];


$dt = mktime();

$hash_db = mysqli_fetch_assoc($mysqli->query("SELECT hash FROM react_task_1_users WHERE email = '$name' LIMIT 1"));
$role_db = mysqli_fetch_assoc($mysqli->query("SELECT role FROM react_task_1_users WHERE email = '$name' LIMIT 1"));

if(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& $role_db['role'] === 'admin' 
&& $_POST['action'] === 'addNewClient'
){
    $sql = "INSERT INTO react_task_1_clients (FirstName, LastName, City, Address, Phone, CreationDate, EditingDate) 
    VALUES ('$FirstName','$LastName','$City','$Address','$Phone','$dt','$dt')";  
    $mysqli->query($sql);    
    
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& $role_db['role'] === 'admin' 
&& $_POST['action'] === 'editClient'
){
    $sql = "UPDATE react_task_1_clients SET FirstName='$FirstName', LastName='$LastName', City='$City', Address='$Address', Phone='$Phone', EditingDate='$dt'   
    WHERE id = '$id_client'";  
    $mysqli->query($sql);
    
    echo getClientsDataFull($_POST['page'], $_POST['limit']);    
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& $role_db['role'] === 'admin'
&& $_POST['action'] === 'deleteClient'
){
    $sql = "DELETE FROM react_task_1_tasks WHERE id_client = '$id_client'";  
    $mysqli->query($sql);

    $sql = "DELETE FROM react_task_1_clients WHERE id = '$id_client'";  
    $mysqli->query($sql);
    
    echo getClientsDataFull($_POST['page'], $_POST['limit']);    
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& $role_db['role'] === 'admin' 
&& $_POST['action'] === 'addNewUser'
){
    $sql = "INSERT INTO react_task_1_users (email, password, role) 
    VALUES ('$email','$password','$roleUser')";  
    $mysqli->query($sql);
    
    echo getUsersData();
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& ($role_db['role'] === 'admin' || $role_db['role'] === 'user')
&& $_POST['action'] === 'addNewTask'
){
    $sql = "INSERT INTO react_task_1_tasks (id_client, taskName, description, date, startTime, endTime, dateCreation, dateLastEdit) 
    VALUES ('$id_client','$taskName','$description','$date','$startTime','$endTime','$dt','$dt')";  
    $mysqli->query($sql);
    
    echo getTasksData($id_client);
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& ($role_db['role'] === 'admin' || $role_db['role'] === 'user')
&& $_POST['action'] === 'editTask'
){
    $sql = "UPDATE react_task_1_tasks SET id_client='$id_client', taskName='$taskName', description='$description', date='$date', startTime='$startTime', endTime='$endTime', dateLastEdit= '$dt'    
    WHERE id = '$whereIdTask'";  
    $mysqli->query($sql);
    
    echo getTasksData($id_client);
}
elseif(
    $_POST['hash'] === $hash_db['hash']    
&& $_POST['role'] === $role_db['role'] 
&& ($role_db['role'] === 'admin' || $role_db['role'] === 'user')
&& $_POST['action'] === 'deleteTask'
){
    $sql = "DELETE FROM react_task_1_tasks WHERE id = '$whereIdTask'";  
    $mysqli->query($sql);
    
    echo getTasksData($id_client);   
}


else {
    echo 'false';
};

$mysqli->close();
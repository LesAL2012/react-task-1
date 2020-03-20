<?php
require_once 'config_db.php';

function getClientsData(){    
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $sql_clients = "SELECT * FROM react_task_1_clients ORDER BY FirstName, LastName, City";
    $res = $mysqli->query($sql_clients);    
    $a = array();
    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a[] = $row;
        }    
    };
    return json_encode($a);
};

function getUsersData(){  
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $sql_users = "SELECT id, email, role FROM react_task_1_users ORDER BY email";
    $res = $mysqli->query($sql_users);    
    $a = array();
    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a[] = $row;
        }    
    };
    return json_encode($a);

};

function getTasksData($id){  
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    
    $sql_tasks = "SELECT 
    react_task_1_clients.id AS idClient,
    react_task_1_clients.Address AS Address,

    react_task_1_tasks.id AS idTask,
    react_task_1_tasks.taskName AS taskName,
    react_task_1_tasks.description AS taskDescription,
    react_task_1_tasks.date AS date,
    react_task_1_tasks.startTime AS startTime,
    react_task_1_tasks.endTime AS endTime,
    react_task_1_tasks.dateCreation AS dateCreation,
    react_task_1_tasks.dateLastEdit	 AS dateLastEdit     
    
    FROM (react_task_1_clients 
    LEFT JOIN react_task_1_tasks ON react_task_1_clients.id = react_task_1_tasks.id_client) 
    
    WHERE react_task_1_clients.id = '$id'
    
    ORDER BY react_task_1_tasks.date"; 
        
    $res = $mysqli->query($sql_tasks);    
    $a = array();
    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a[] = $row;
        }    
    };
    return json_encode($a);
};
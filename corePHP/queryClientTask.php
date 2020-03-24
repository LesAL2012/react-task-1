<?php
require_once 'config_db.php';

function getClientsDataFull($page, $limit){    
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $offset = ($page-1)*$limit;
    
    $sql_clients = "SELECT * FROM react_task_1_clients ORDER BY FirstName, LastName, City LIMIT ".$limit." OFFSET ".$offset;
    $sql_names = "SELECT DISTINCT FirstName FROM react_task_1_clients ORDER BY FirstName";
    $sql_city = "SELECT DISTINCT City FROM react_task_1_clients ORDER BY City";
    $res = $mysqli->query($sql_clients);
    $res_names = $mysqli->query($sql_names); 
    $res_city = $mysqli->query($sql_city);       
    
    $a = array();

    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a['client'][] = $row;
        }    
    };
    
    if (mysqli_num_rows($res_names) > 0) {
        while($row = mysqli_fetch_assoc($res_names)) {
            $a['names'][] = $row;
        }    
    };

    if (mysqli_num_rows($res_city) > 0) {
        while($row = mysqli_fetch_assoc($res_city)) {
            $a['city'][] = $row;
        }    
    };

    $number_clients = mysqli_num_rows( $mysqli->query("SELECT id FROM react_task_1_clients"));
    $pages = [];
    for($i=1; $i <= ceil( $number_clients / $limit ); $i++){
        $pages[$i-1]=$i;
    };
    $a['total'] =  [
        'clients'=>$number_clients,
        'numberPages'=>$pages,
    ];

    
    return json_encode($a);
};

function getClientsDataFilterName($filterName, $page, $limit){    
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $offset = ($page-1)*$limit;
    
    $sql_clients = "SELECT * FROM react_task_1_clients WHERE FirstName = '".$filterName."' ORDER BY FirstName, LastName, City LIMIT ".$limit." OFFSET ".$offset;
    $sql_names = "SELECT DISTINCT FirstName FROM react_task_1_clients ORDER BY FirstName";
    $sql_city = "SELECT DISTINCT City FROM react_task_1_clients WHERE FirstName = '".$filterName."' ORDER BY City";
    $res = $mysqli->query($sql_clients);
    $res_names = $mysqli->query($sql_names); 
    $res_city = $mysqli->query($sql_city);       
    
    $a = array();

    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a['client'][] = $row;
        }    
    };
    
    if (mysqli_num_rows($res_names) > 0) {
        while($row = mysqli_fetch_assoc($res_names)) {
            $a['names'][] = $row;
        }    
    };

    if (mysqli_num_rows($res_city) > 0) {
        while($row = mysqli_fetch_assoc($res_city)) {
            $a['city'][] = $row;
        }    
    };

    $sql_pag = "SELECT id FROM react_task_1_clients WHERE FirstName = '".$filterName."'";
    $number_clients = mysqli_num_rows( $mysqli->query($sql_pag));
    $pages = [];
    for($i=1; $i <= ceil( $number_clients / $limit ); $i++){
        $pages[$i-1]=$i;
    };
    $a['total'] =  [
        'clients'=>$number_clients,
        'numberPages'=>$pages,
    ];
    
    
    return json_encode($a);
};

function getClientsDataFilterNameCity($filterName, $city, $page, $limit){    
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $offset = ($page-1)*$limit;
    
    $sql_clients = "SELECT * FROM react_task_1_clients WHERE FirstName = '".$filterName."' AND City = '".$city."' ORDER BY FirstName, LastName, City LIMIT ".$limit." OFFSET ".$offset;
    $sql_names = "SELECT DISTINCT FirstName FROM react_task_1_clients WHERE City = '".$city."' ORDER BY FirstName";
    $sql_city = "SELECT DISTINCT City FROM react_task_1_clients WHERE FirstName = '".$filterName."' ORDER BY City";
    $res = $mysqli->query($sql_clients);
    $res_names = $mysqli->query($sql_names); 
    $res_city = $mysqli->query($sql_city);       
    
    $a = array();

    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a['client'][] = $row;
        }    
    };
    
    if (mysqli_num_rows($res_names) > 0) {
        while($row = mysqli_fetch_assoc($res_names)) {
            $a['names'][] = $row;
        }    
    };

    if (mysqli_num_rows($res_city) > 0) {
        while($row = mysqli_fetch_assoc($res_city)) {
            $a['city'][] = $row;
        }    
    };

    $sql_pag = "SELECT id FROM react_task_1_clients WHERE FirstName = '".$filterName."' AND  City = '".$city."'";
    $number_clients = mysqli_num_rows( $mysqli->query($sql_pag));
    $pages = [];
    for($i=1; $i <= ceil( $number_clients / $limit ); $i++){
        $pages[$i-1]=$i;
    };
    $a['total'] =  [
        'clients'=>$number_clients,
        'numberPages'=>$pages,
    ];
    
    
    return json_encode($a);
};

function getClientsFilterCity($city, $page, $limit){    
    $mysqli = new mysqli(SERVERNAME, USERNAME, PASSWORD, DBNAME);
    $offset = ($page-1)*$limit;
    
    $sql_clients = "SELECT * FROM react_task_1_clients WHERE City = '".$city."' ORDER BY FirstName, LastName, City LIMIT ".$limit." OFFSET ".$offset;
    $sql_names = "SELECT DISTINCT FirstName FROM react_task_1_clients WHERE City = '".$city."' ORDER BY FirstName";
    $sql_city = "SELECT DISTINCT City FROM react_task_1_clients ORDER BY City";
    $res = $mysqli->query($sql_clients);
    $res_names = $mysqli->query($sql_names); 
    $res_city = $mysqli->query($sql_city);       
    
    $a = array();
    
    if (mysqli_num_rows($res) > 0) {
        while($row = mysqli_fetch_assoc($res)) {
            $a['client'][] = $row;
        }    
    };
    
    if (mysqli_num_rows($res_names) > 0) {
        while($row = mysqli_fetch_assoc($res_names)) {
            $a['names'][] = $row;
        }    
    };

    if (mysqli_num_rows($res_city) > 0) {
        while($row = mysqli_fetch_assoc($res_city)) {
            $a['city'][] = $row;
        }    
    };
    
    $sql_pag = "SELECT id FROM react_task_1_clients WHERE City = '".$city."'";
    $number_clients = mysqli_num_rows( $mysqli->query($sql_pag));
    $pages = [];
    for($i=1; $i <= ceil( $number_clients / $limit ); $i++){
        $pages[$i-1]=$i;
    };
    $a['total'] =  [
        'clients'=>$number_clients,
        'numberPages'=>$pages,
    ];
    
    
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
<?php

require_once __DIR__.'/../database.php';
//require_once __DIR__.'/../models/User.php';
//use models\User as User;
include __DIR__.'/../models/User.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $login = login_data_from_request();
    if ($login){
        $stmt = $conn->prepare("SELECT * FROM `user` WHERE `username` = :username");
        echo $login['username'];
        $stmt->bindParam(':username', $login['username']);
        $stmt->execute();
        $user = $stmt->fetchObject('User');
        print_r($user);
    }
}

function login_data_from_request(): Array
{
    $data = json_decode(file_get_contents('php://input'));
    if(!$_POST && !$data) return array();
    if ($_POST && array_key_exists('username', $_POST) && array_key_exists('password', $_POST)) {
        echo '$_POST has login data';
        return array('username' => $_POST['username'], 'password' => $_POST['password']);
    } else if ($data && property_exists($data, 'username') && property_exists($data, 'password')) {
        echo '$data has login data';
        return array('username' => $data->username, 'password' => $data->password);
    }
    echo 'no valid login data';
    return array();
}
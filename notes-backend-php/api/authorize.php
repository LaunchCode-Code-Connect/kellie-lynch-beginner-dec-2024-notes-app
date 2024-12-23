<?php
//use Firebase\JWT\JWT;

use Firebase\JWT\JWT;

require_once __DIR__.'/../database.php';
//require_once __DIR__.'/../models/User.php';
//use models\User as User;
include __DIR__.'/../models/User.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $login = login_data_from_request();
    if(!$login) return;
    $user = user_with_credentials($login);
    if(!$user) return;
    $expire = date('Y-m-d H:i:s.u',time() + 3600);
    $payload = [
        'iat' => time(),
        'exp' => $expire,
        'sub' => $user->id
    ];
    $jwt = JWT::encode($payload, "key", "HS256");
    $token = json_encode([
        'message' => 'Login successful',
        'token' => $jwt,
        'expiry' => $expire
    ]);
    header('Content-Type: application/json');
    echo $token;
}

function user_with_credentials(Array $login): User | null {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM `user` WHERE `username` = :username");
    $stmt->bindParam(':username', $login['username']);
    $stmt->execute();
    $user = $stmt->fetchObject('User');
    return $user ?: null;
}

function login_data_from_request(): Array
{
    $data = json_decode(file_get_contents('php://input'));
    if(!$_POST && !$data) return array();
    if ($_POST && array_key_exists('username', $_POST) && array_key_exists('password', $_POST)) {
        return array('username' => $_POST['username'], 'password' => $_POST['password']);
    } else if ($data && property_exists($data, 'username') && property_exists($data, 'password')) {
        return array('username' => $data->username, 'password' => $data->password);
    }
    echo 'no valid login data';
    return array();
}
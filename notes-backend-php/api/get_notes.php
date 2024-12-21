<?php

require_once __DIR__.'/../database.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $data = json_decode(file_get_contents('php://input'));
}
<?php

$request = $_SERVER['REQUEST_URI'];
$viewDir = '/api/';

switch ($request) {
    case '':
    case '/api/notes':
        require __DIR__ . $viewDir . 'get_notes.php';
        break;
    default:
        http_response_code(404);
        echo "404 Not Found";
}
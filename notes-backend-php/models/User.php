<?php

//namespace models;

class User
{
    public int $id;
    public string $username;
    public string $password;
    public function __set($name, $value) {}
}
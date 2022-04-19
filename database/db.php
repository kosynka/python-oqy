<?php

// Ключ защиты
if(!defined('admin_key'))
{
    header("HTTP/1.1 404 Not Found");
    exit(file_get_contents('./../404.html'));
}

// Соединение с БД MySQL
$db_connect = mysql_connect( DBSERVER, DBUSER, DBPASSWORD ) or die(ERROR_CONNECT);

define('CONNECT', $db_connect);

mysql_select_db( DATABASE, CONNECT ) or die(NO_DB_SELECT);

// Устанавливаем кодировку UTF8
mysql_query ("SET NAMES utf8");
mysql_query ("set character_set_client='utf8'");
mysql_query ("set character_set_results='utf8'");
mysql_query ("set collation_connection='utf8_general_ci'");
?>
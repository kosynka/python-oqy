<?php
// Ключ защиты
if(!defined('admin_key')) {
    header("HTTP/1.1 404 Not Found");
    exit(file_get_contents('./404.html'));
}

// Адрес базы данных
define('DBSERVER','localhost');

// Логин, Пароль БД
define('DBUSER','');
define('DBPASSWORD','');
define('DATABASE','');

// Префикс БД
define('DBPREFIX','test_');

// Errors
define('ERROR_CONNECT','Немогу соеденится с БД');
define('NO_DB_SELECT','Данная БД отсутствует на сервере');

// Адрес хоста сайта
define('HOST','http://'. $_SERVER['HTTP_HOST'] .'/');

// Адрес почты от кого отправляем
define('MAIL_AUTHOR','Регистрация на http://localhost:8000 <kaldarbekov.s@yandex.ru>');
?>
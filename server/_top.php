<?php
  require __DIR__.'/function.php';

  $mysql = include (__DIR__.'/mysql.php');
  $db = new PDO('mysql:host='.$mysql['host'].';dbname='.$mysql['database'].';charset=utf8', $mysql['username'], $mysql['passw']);

  $ret = ['status'=>'nope'];
  $err = [];
  $msg = '';

?>

<?php
	function getConnection() {
		  $dbhost="{url}";
		  $dbuser="{usuario}";
		  $dbpass="{password}";
		  $dbname="{esquema}";
		  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		  return $dbh;

	}
?>

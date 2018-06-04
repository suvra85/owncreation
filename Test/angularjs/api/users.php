<?php
include_once("config.php");
$sql="select *from users";
$result=$con->query($sql);
$no=$result->num_rows;
 $rows=array();

if($no>0)
{
 while($r = $result->fetch_object())
 {

 	$rows[]=$r;
 }

}

echo json_encode($rows);

?>
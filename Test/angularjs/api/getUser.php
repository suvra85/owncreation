<?php
include_once("config.php");

$data=json_decode(file_get_contents("php://input"));


$sql="select *from users where id=".$data->id;
$result=$con->query($sql);
$no=$result->num_rows;
 $rows=array();

if($no>0)
{
 echo json_encode( $result->fetch_object());
}

?>
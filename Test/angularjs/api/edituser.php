<?php
include_once("config.php");

$data=json_decode(file_get_contents("php://input"));

$sql="update  users set username='". $data->username."',first_name='". $data->first_name."',last_name='".$data->last_name."',address='".$data->address."' where id=".$data->id;
$result=$con->query($sql);
$no=$result->affected_rows;
$arr=array();
if($no>0)
{
$arr['message'] =" User Updated";

}
else
{
$arr['error'] ="Not able to add data";

}

echo json_encode($arr);



?>
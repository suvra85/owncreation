<?php
include_once("config.php");

$data=json_decode(file_get_contents("php://input"));

$sql="delete from users  where id=".$data->id;
$result=$con->query($sql);
$no=$result->affected_rows;
$arr=array();
if($no>0)
{
$arr['message'] =" User Deleted";

}
else
{
$arr['error'] ="Not able to delete data";

}

echo json_encode($arr);


?>
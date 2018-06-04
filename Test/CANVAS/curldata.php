<?php

$url="http://data.orghunter.com/v1/charitysearch?user_key=e9cf64aa0e7ee97f7168a0764b643344";
$ch = curl_init();
// Disable SSL verification
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);
// Closing
curl_close($ch);

// Will dump a beauty json :3
echo "<pre>";


print_r(json_decode($result));

echo "</pre>";


?>
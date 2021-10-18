<?php
//var_dump($_GET);

$url = $_GET['url'];
$data = array('token' => $_GET['token'], 'radio' =>  $_GET['radio'], 'mcc' =>  $_GET['mcc'], 'mnc' =>  $_GET['mnc']);
$data['cells'] = array(['cid' => $_GET['cid']]);
$ch = curl_init( $url );
$payload = json_encode($data);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $payload );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
$result = curl_exec($ch);
curl_close($ch);
echo $result;
?>
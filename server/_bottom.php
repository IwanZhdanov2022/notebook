<?php
  if ($err) {
    $ret['err'] = $err;
    $ret['status'] = 'err';
  }
  if ($msg) {
    $ret['msg'] = $msg;
    $ret['status'] = 'ok';
  }

  echo json_encode($ret);
?>

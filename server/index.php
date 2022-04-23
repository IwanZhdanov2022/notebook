<?php
  require __DIR__.'/_top.php';

  ini_set('error_reporting', E_ALL);
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);

  $cmd = $_REQUEST['cmd'] ?? '';
  if ($cmd == 'write') {
    if (!$err) {
      $num = $_REQUEST['num'] ?? '';
      $txt = $_REQUEST['txt'] ?? '';
      if (!$num) $err[] = 'Channel ID required';
      if (!$txt) $err[] = 'Message required';
    }
    if (!$err) {
      $db->exec("insert into notes (num, txt) values (".v($num).", ".v($txt).")");
      $msg = 'Wrote.';
    }
  }
  if ($cmd == 'read') {
    if (!$err) {
      $num = $_REQUEST['num'] ?? '';
      $last = intval($_REQUEST['last'] ?? 0);
      $wait = boolval($_REQUEST['wait'] ?? false);
      if (!$num) $err[] = 'Channel ID required';
    }
    if (!$err) {
      $list = [];
      for ($loop=0; $loop<600; $loop++) {
        $res = $db->query("select * from notes where num = ".v($num)." and id > ".v($last)." order by id");
        while ($row = $res->fetch()) {
          $list[] = $row['txt'];
          $last = $row['id'];
        }
        if ($list || !$wait) break;
        sleep(1);
      }
      $ret['last'] = $last;
      $ret['messages'] = $list;
      $msg = 'Received.';
    }
  }

  require __DIR__.'/_bottom.php';
?>

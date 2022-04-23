<?php
  function v ($str, $delim=', ', $prefix='concat(', $postfix=')', $quotes="\"'") {
    if (is_numeric($str)) return $str.'';
    $ret = '';
    $comma = '';
    $loop = 0;
    while ($str) {
      $found = [0, ''];
      for ($a=0;$a<strlen($quotes);$a++) {
        $b = strpos($str, $quotes[$a]);
        if ($b === false) $b = strlen($str);
        if ($b > $found[0]) $found = [$b, $quotes[$a]];
      }
      $ret .= $comma . $found[1] . substr($str, 0, $found[0]) . $found[1];
      $str = substr($str, $found[0]);
      $comma = $delim;
      $loop++;
    }
    if ($loop >= 2) $ret = $prefix . $ret . $postfix;
    if (!$ret) $ret = '""';
    return $ret;
  }
?>

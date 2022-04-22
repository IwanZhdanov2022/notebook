function encodeTime (str) {
  if (!str) return 0;
  var reg = /[0-9]+/gi;
  var arr, A = [], B;
  while (arr = reg.exec(str)) {
    A.push(parseInt(arr[0], 10));
  }
  var D = new Date();
  if (A.length == 0) B = [D.getFullYear(), D.getMonth()+1, D.getDate(), D.getHours(), D.getMinutes()];
  if (A.length == 1) B = [D.getFullYear(), D.getMonth()+1, D.getDate(), A[0], 0];
  if (A.length == 2) B = [D.getFullYear(), D.getMonth()+1, A[0], A[1], 0];
  if (A.length == 3) B = [D.getFullYear(), D.getMonth()+1, A[0], A[1], A[2]];
  if (A.length == 4) B = [D.getFullYear(), A[0], A[1], A[2], A[3]];
  if (A.length >= 5) B = [A[0], A[1], A[2], A[3], A[4]];
  if (B[0] < 100) B[0] += 2000;
  D.setFullYear(B[0]);
  D.setDate(1);
  D.setMonth(B[1]-1);
  D.setDate(B[2]);
  D.setHours(B[3]);
  D.setMinutes(B[4]);
  D.setSeconds(0);
  return Math.floor(D.getTime() / 1000);
}

function z(num) {
  num += '';
  while (num.length < 2) num = '0' + num;
  return num;
}

function decodeTime (dt) {
  var dow = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  dt = parseInt(dt, 10);
  if (!dt) return '';
  var D = new Date();
  D.setTime(dt * 1000);
  var ret = '';
  ret += D.getFullYear() + '-' + z(D.getMonth()+1) + '-' + z(D.getDate()) + ' ';
  ret += dow[D.getDay()] + ' ';
  ret += z(D.getHours()) + ':' + z(D.getMinutes());
  return ret;
}

function save() {
  var data = JSON.stringify(noteList);
  localStorage.setItem('notebook', data);
}
function load () {
  var data = localStorage.getItem('notebook');
  if (!data) return;
  noteList = JSON.parse(data);
  showNotes();
}
load();

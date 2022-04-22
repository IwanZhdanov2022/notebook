function rand (a, b) {
  return Math.floor(Math.random()*(b-a+1)) + a;
}

var noteList = [];
var resultElement = '#result';
var alarmElement = '#alarm';
var alarmWindow = '#alarm-window';
var remainTimer = 0;
function calcAlarmRemainTime () {
  clearTimeout(remainTimer);
  var D = new Date();
  var tm = Math.floor(D.getTime() / 1000);
  var a, remain = -1;
  for (a=0; a<noteList.length; a++) {
    if (noteList[a].alarm && noteList[a].alarm > tm) {
      remain = noteList[a].alarm - tm;
      break;
    }
  }
  if (remain != -1) {
    remainTimer = setTimeout(showNotesInAlarm, remain*1000);
  }
}
function showNotesInAlarm () {
  var html;
  html = getNotesAsHtml(function (a) {
    if (!a.alarm) return false;
    var D = new Date();
    var tm = Math.floor(D.getTime() / 1000);
    return a.alarm <= tm;
  });
  document.querySelector(alarmElement).innerHTML = html;
  if (html) {
    document.querySelector(alarmWindow).classList.remove('hidden');
  } else {
    document.querySelector(alarmWindow).classList.add('hidden');
  }
  calcAlarmRemainTime();
}
function showNotes () {
  var html;
  html = getNotesAsHtml();
  document.querySelector(resultElement).innerHTML = html;
  showNotesInAlarm();
}

function find (id) {
  var a;
  for (a=0; a<noteList.length; a++) {
    if (noteList[a].id == id) return a;
  }
  return -1;
}
function getNotesAsHtml (callback) {
  var html = '';
  var a, caption, is_something = false;
  html += '<div class="note-list">';
  for (a=0; a<noteList.length; a++) {
    if (!callback || callback(noteList[a])) {
      is_something = true;
      html += '<div class="note">';
      caption = noteList[a].txt;
      if (!caption) caption = 'без названия';
      html += decodeTime(noteList[a].alarm) + ' ';
      html += '<a href="javascript:" onclick="startEditNote('+noteList[a].id+')">'+caption+'</a>';
      html += '</div>';
    }
  }
  html += '</div>';
  if (!is_something) return '';
  return html;
}
function addNote (ob) {
  if (typeof(ob.id) == 'undefined' || !ob.id) ob.id = rand(100000, 999999);
  var a = find(ob.id);
  ob.alarm = encodeTime(ob.alarm);
  if (a == -1) noteList.push(ob);
  else noteList[a] = ob;
  startEditNote(ob.id);
  noteList.sort(function (a, b) {
    if (a.alarm && !b.alarm) return -1;
    if (!a.alarm && b.alarm) return 1;
    if (a.alarm < b.alarm) return -1;
    if (a.alarm > b.alarm) return 1;
    if (a.txt < b.txt) return -1;
    if (a.txt > b.txt) return 1;
    return 0;
  });
  final();
}
function startEditNote (id) {
  var a = find(id);
  if (a == -1) return {};
  var ob = deepcopy(noteList[a]);
  ob.alarm = decodeTime(ob.alarm);
  setData(document.querySelector('#add-form'), ob);
  return ob;
}
function delNote (id) {
  var a;
  for (a=noteList.length-1; a>=0; a--) {
    if (noteList[a].id == id) noteList.splice(a, 1);
  }
  final();
}

function final() {
  showNotes();
  save();
}

function deepcopy (element) {
  var str = JSON.stringify(element);
  return JSON.parse(str);
}

function getData (form) {
  while (form.tagName != 'FORM') form = form.parentNode;
  var a, arr = form.querySelectorAll('[name]');
  var ret = {};
  for (a=0; a<arr.length; a++) {
    ret[arr[a].name] = arr[a].value;
  }
  return ret;
}
function setData (form, data) {
  while (form.tagName != 'FORM') form = form.parentNode;
  var a, arr = form.querySelectorAll('[name]');
  for (a=0; a<arr.length; a++) {
    if (typeof(data[arr[a].name]) != 'undefined') arr[a].value = data[arr[a].name];
    else arr[a].value = '';
  }
}

function rand (a, b) {
  return Math.floor(Math.random()*(b-a+1)) + a;
}

var noteList = [];
var resultElement = '#result';
function showNotes () {
  var html = getNotesAsHtml();
  document.querySelector(resultElement).innerHTML = html;
}

function find (id) {
  var a;
  for (a=0; a<noteList.length; a++) {
    if (noteList[a].id == id) return a;
  }
  return -1;
}
function getNotesAsHtml () {
  var html = '';
  var a;
  html += '<div class="note-list">';
  for (a=0; a<noteList.length; a++) {
    html += '<div class="note">';
    html += '<div class="note-code">ID: '+noteList[a].id+'</div>';
    html += '<div class="note-txt">Текст: '+noteList[a].txt+'</div>';
    html += '<div class="note-links">';
    html += '<a href="javascript:" onclick="setData(document.querySelector(\'#add-form\'),startEditNote('+noteList[a].id+'))">Редактировать</a> ';
    html += '<a href="javascript:" onclick="delNote('+noteList[a].id+')">Удалить</a>';
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}
function addNote (ob) {
  if (typeof(ob.id) == 'undefined' || !ob.id) ob.id = rand(100000, 999999);
  var a = find(ob.id);
  if (a == -1) noteList.push(ob);
  else noteList[a] = ob;
  showNotes();
}
function startEditNote (id) {
  var a = find(id);
  if (a == -1) return {};
  return deepcopy(noteList[a]);
}
function delNote (id) {
  var a;
  for (a=noteList.length-1; a>=0; a--) {
    if (noteList[a].id == id) noteList.splice(a, 1);
  }
  showNotes();
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

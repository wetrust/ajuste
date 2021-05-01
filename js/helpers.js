function isInteger(x) {
 return x % 1 === 0;
}
function show_hide(id){
 if (document.getElementById){
  var el = document.getElementById(id);
  el.style.display = (el.style.display == 'none') ? 'table' : 'none';
 }
}
function checkLength(id, leng) {
 var fieldLength = $("#"+id).val().length;
 var txt = 'none';
 //Suppose u want 4 number of character
 if (fieldLength < leng) {
  $("#"+id+"group").removeClass();
  $("#"+id+"group").addClass( "form-group" );
  $("#"+id+"label").remove();
  $("#"+id+"simbol").remove();
  if (id =='peso') {
   txt = 'gr';
  }
  else {
   txt = 'mm';
  }
  $("#"+id+"input").append( "<div class='input-group-addon' id='"+id+"label'>"+txt+"</div>" );
 }
 else {
  if (fieldLength > leng) {
   var str = $("#"+id).val();
   str = str.substring(0, str.length - 1);
   $("#"+id).val(str);
  }
  $("#"+id+"group").removeClass();
  $("#"+id+"group").addClass( "form-group has-success has-feedback" );
  $("#"+id+"label").remove();
  $("#"+id+"simbol").remove();
  $("#"+id+"input").append( "<span class='glyphicon glyphicon-ok form-control-feedback' id='"+id+"simbol' aria-hidden='true'></span>" );
 }
}

function peso_change() {
 var preid = 'peso';
 var leng = 4;
 checkLength(preid, leng);
}

function talla_change() {
 var preid = 'talla';
 var leng = 3;
 checkLength(preid, leng);
}
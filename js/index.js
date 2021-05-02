import { make, the, loadSelect } from './wetrust.js'

//controlador de fcf
for (var i = 24; i < 43; i++) {
	let semanas = the("eg");
	let opt = document.createElement('option');
	opt.appendChild( document.createTextNode(i) );
	opt.value = i;
	semanas.appendChild(opt);
}

var activo = "portada";
var examenes = ["portada", "inicio", "examenes", "primero", "examenes", "segundo", "examenes", "tercero"];

the("eg").value = 40;

the("eg").onchange = function() {
    the("txtSEM").innerHTML = this.value + " semanas"
}

the("pesoN").onkeyup = function() {
    the("txtPeso").innerHTML = this.value + " gramos"
}

the("tallaN").onkeyup = function() {
    the("txtTalla").innerHTML = this.value + " milimetros"
}

the("goInicio").onclick = function(){
    the("portada").classList.add("d-none");
    the("inicio").classList.remove("d-none");
    activo = "inicio";
}

the("goExamenes").onclick = function(){

	let _peso = the("pesoN").value;
	let _talla = the("tallaN").value;

	let modal = make.modal();
	document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeend', modal.modal);
	the(modal.titulo).innerHTML = "Mensaje";
	the(modal.titulo).classList.add("mx-auto");
	the(modal.titulo).parentElement.classList.add("text-white", "bg-danger");
	the(modal.id).childNodes[0].classList.remove("modal-lg");
	the(modal.id).childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerHTML = "Aceptar";
	var myModal = new bootstrap.Modal(the(modal.id), {
		backdrop: 'static',
		keyboard: false
	});

	if(_peso == "" || +_peso == 0) {
		the(modal.contenido).innerHTML = '<p class="text-center">Ingrese Peso</p>';
		myModal.show();
		return;
	}

    if(_talla == "" || +_talla == 0) {
		the(modal.contenido).innerHTML = '<p class="text-center">Ingrese Talla</p>';
		myModal.show();
		return;
	}


    the("inicio").classList.add("d-none");
    the("prelude").classList.remove("d-none");
    the("examenes").classList.remove("d-none");
    activo = "examenes";

    RN = new RecienNacido(the("pesoN").value,the("tallaN").value,the("eg").value);
    the("txtIPN").innerHTML = RN.ipn();
}

the("back").onclick = back;

function back() {
	the(activo).classList.add("d-none");
	let examen = examenes.indexOf(activo);

	activo = examenes[examen - 1];

	the(activo).classList.remove("d-none");
	if(activo == "inicio") {
		the("prelude").classList.add("d-none");
	}
}

window.onpopstate = back;
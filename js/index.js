import { make, the, loadSelect } from './wetrust.js'

var RN
var tipografico = 0
var chart
let varMama
//controlador de fcf
for (var i = 24; i < 43; i++) {
	let semanas = the("eg");
	let opt = document.createElement('option');
	opt.appendChild( document.createTextNode(i) );
	opt.value = i;
	semanas.appendChild(opt);
}

//controlador de talla materna
for (var i = 135; i < 186; i++) {
	let semanas = the("tm");
	let opt = document.createElement('option');
	opt.appendChild( document.createTextNode(i + " cms") );
	opt.value = i;
	semanas.appendChild(opt);
}
the("tm").value = 149

//controlador de peso materno
for (var i = 35; i < 141; i++) {
	let semanas = the("pesom");
	let opt = document.createElement('option');
	opt.appendChild( document.createTextNode(i + " kgs") );
	opt.value = i;
	semanas.appendChild(opt);
}
the("pesom").value = 70

var activo = "portada";
var examenes = ["portada", "inicio", "examenes", "primero", "examenes", "segundo", "examenes", "ajuste", "graficoAjuste"];

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

the("goPrimero").onclick = function(){
    the("examenes").classList.add("d-none");
    the("primero").classList.remove("d-none");
    activo = "primero";

    tipografico = 0;
	let Tablas = new Tabla('Android');
    chart = Highcharts.chart('grafico1', {
   title: {
   text: 'GRAFICO PESO / EG',
    style: {
     "color": "#337ab7"
    }
   },
   subtitle: {
    text: 'REFERENCIA TABLA NACIONAL',
    style: {
     "color": "#337ab7",
    }
   },
   chart: {
    backgroundColor: 'transparent'
   },
   plotOptions: {
    series: {
     enableMouseTracking: false
    }
   },
   yAxis: {
    title: { text: '' },
    tickPositions: [400, 860, 1320, 1780, 2240, 2700, 3160, 3620, 4080, 4540],
    tickColor: "#337ab7",
    labels: {
     enabled: true,
     style: {
      color: '#337ab7',
     }
    }
   },
   colors: ['#ff3300', '#ff3300', '#ff3300'],
   xAxis: {
    categories:
    ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
    labels: {
     enabled: true,
     style: {
      color: '#337ab7',
     }
    }
   },
   credits: { enabled: false },
    series: [{
     type: "line",
     name: 'Pct. 10',
     marker: { enabled: false },
     data: Tablas.pct10PesoNacional
    }, {
     type: "line",
     name: 'Pct. 90',
     marker: { enabled: false },
     data: Tablas.pct90PesoNacional
    }, {
     type: "line",
     name: 'Peso',
     dashStyle: "Dot",
     marker: { symbol: 'square' },
     lineWidth: 0,
     data: (function () {
      var data = [];

      for (i = 24; i <= (RN.eg -1); i++) {
       data.push({
        y: 0,
       });
      }
      data.push({
       y: parseInt(RN.peso),
      });
      for (i = RN.eg + 1; i <= 39; i++) {
       data.push({
        y: 0,
       });
      }
      return data;
     }())
    }]
  });
}

the("primeroChange").onclick = function(){
    let Tablas = new Tabla('Android');
    if (tipografico == 0) {
        tipografico = 1;
        chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL' });
        chart.series[1].setData(Tablas.pct90PesoTemuco);
        chart.series[0].setData(Tablas.pct10PesoTemuco);
    }
    else if (tipografico == 1) {
        tipografico = 0;
        chart.setTitle(null, { text: 'REFERENCIA TABLA NACIONAL' });
        chart.series[1].setData(Tablas.pct90PesoNacional);
        chart.series[0].setData(Tablas.pct10PesoNacional);
    }
}

the("goSegundo").onclick = function(){
	the("examenes").classList.add("d-none");
    the("segundo").classList.remove("d-none");
    activo = "segundo";

    tipografico = 0;
    let Tablas = new Tabla('Android');

    chart = Highcharts.chart('grafico2', {
     title: {
      text: 'GRAFICO IPN / EG',
      style: {
       "color": "#337ab7",
      }
     },
     subtitle: {
      text: 'REFERENCIA TABLA NACIONAL',
      style: {
       "color": "#337ab7",
      }
     },
     chart: {
      backgroundColor: "rgba(0, 0, 0, 0)"
     },
     plotOptions: {
      series: {
       enableMouseTracking: false
      }
     },
     yAxis: {
      title: { text: '' },
      tickPositions: [1, 1.6, 2.2, 2.8, 3.4, 4],
      labels: {
       enabled: true,
       style: {
        color: '#337ab7',
       }
      }
     },
     colors: ['#ff3300', '#ff3300', '#ff3300'],
     xAxis: {
      categories:
      ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
      labels: {
       enabled: true,
       style: {
        color: '#337ab7',
       }
      }
     },
     credits: { enabled: false },
     series: [{
      type: "line",
      name: 'Pct. 10',
      marker: { enabled: false },
      data: Tablas.pct10IpnNacional
     }, {
      type: "line",
      name: 'Pct. 90',
      marker: { enabled: false },
      data: Tablas.pct90IpnNacional
     }, {
      type: "line",
      name: 'IPN',
      dashStyle: "Dot",
      marker: { symbol: 'square' },
      lineWidth: 0,
      data: (function () {
       var data = [];
       for (i = 24; i <= (RN.eg - 1); i++) {
        data.push({
         y: 0,
        });
       }
       data.push({
        y: parseFloat(RN.ipn()),
       });
       for (i = RN.eg + 1; i <= 43; i++) {
        data.push({
         y: 0,
        });
       }
       return data;
      }())
     }]
    });
}

the("segundoChange").onclick = function(){
    let Tablas = new Tabla('Android');
    if (tipografico == 0) {
     tipografico = 1;
     chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL' });
     chart.series[0].setData(Tablas.pct10IpnTemuco);
     chart.series[1].setData(Tablas.pct90IpnTemuco);
    }
    else if (tipografico == 1) {
     tipografico = 0;
     chart.setTitle(null, { text: 'REFERENCIA TABLA NACIONAL' });
     chart.series[0].setData(Tablas.pct10IpnNacional);
     chart.series[1].setData(Tablas.pct90IpnNacional);
    }
}

the("goAjuste").onclick = function(){
	the("examenes").classList.add("d-none");
    the("ajuste").classList.remove("d-none");
    activo = "ajuste";

    let apell = 0;
    if (the("ema").value == 2) {
        apell = 1;
    }
    else {
        apell = the("ema").value;
    }

    varMama = new Mama(the("tm").value,the("pesom").value,the("em").value,apell);
    the("imc").value = varMama.imc();
    the("en").value = varMama.imcCondicion();
}


the("tm").onchange = function(){
    varMama.talla = the("tm").value;
    the("imc").value = varMama.imc();
    the("en").value = varMama.imcCondicion();
}

the("pesom").onchange = function(){
    varMama.peso = the("pesom").value;
    the("imc").value = varMama.imc();
    the("en").value = varMama.imcCondicion();
}

the("ajusteChange").onclick = function(){
	the("ajuste").classList.add("d-none");
    the("graficoAjuste").classList.remove("d-none");
    activo = "graficoAjuste";

    tipografico = 0;
    let apell = 0;
    if (the("ema").value == 2) {
        apell = 1;
    }
    else {
        apell = the("ema").value;
    }

  varMama.edad = the("em").value;
  varMama.apellido = apell;
  varMama.paridad = the("pm").value;
  RN.sexo = the("sn").value;

  var p90 = [0.2418159,-0.0038925,0.0000168,-0.0130562,-0.0127872,-0.0034632,0.0117179,0.0021092,-0.9260631];
  var p10 = [-0.2639902,0.0110356,-0.0001265,-0.0146183,-0.0134044,-0.0020684,0.0092266, 0.0009001, 4.474501];

  var p90Pso = [];
  var p10Pso = [];

  for (let i = 24; i < 43; i++) {
   let x = i - 24;
   p90Pso[x] = Math.pow(10, ((i * p90[0]) + (Math.pow(i, 2) * p90[1]) + (Math.pow(i, 3) * p90[2]) + (p90[3] * the("pm").value) + (p90[4] * the("sn").value) + (p90[5] * apell) + (p90[6] * the("en").value) + (p90[7] * the("em").value) + p90[8]));
   p10Pso[x] = Math.pow(10, ((i * p10[0]) + (Math.pow(i, 2) * p10[1]) + (Math.pow(i, 3) * p10[2]) + (p10[3] * the("pm").value) + (p10[4] * the("sn").value) + (p10[5] * apell) + (p10[6] * the("en").value) + (p10[7] * the("em").value) + p10[8]));;
  }

  let Tablas = new Tabla('Android');

  Tablas.pct10PesoAjustado = p10Pso;
  Tablas.pct90PesoAjustado = p90Pso;
  chart = Highcharts.chart('grafico3', {
   title: {
   text: 'GRAFICO PESO / EG',
    style: {
     "color": "#337ab7",
    }
   },
   subtitle: {
    text: 'TABLA DE AJUSTE AL PESO TEMUCO',
    style: {
     "color": "#337ab7",
    }
   },
   chart: {
    backgroundColor: "rgba(0, 0, 0, 0)"
   },
   /* plotOptions: {
    series: {
     enableMouseTracking: false
    }
   }, */
   yAxis: {
    title: { text: '' },
    tickPositions: [400, 860, 1320, 1780, 2240, 2700, 3160, 3620, 4080, 4540,4980],
    tickColor: "#337ab7",
    labels: {
     enabled: true,
     style: {
      color: '#337ab7',
     }
    }
   },
   colors: ['#ff3300', '#ff3300', '#ff3300'],
   xAxis: {
    categories:
    ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
    labels: {
     enabled: true,
     style: {
      color: '#337ab7',
     }
    }
   },
   credits: { enabled: false },
    series: [{
     type: "line",
     name: 'Pct. 10',
     marker: { enabled: false },
          dashStyle: (function (){
             var estilo = 'solid';

             if (RN.ajustePequeno == true){
                 estilo = 'Dash';
             }

             return estilo;
          }()),
               color: (function(){
                  var color = '#ff3300';

                  if (RN.ajustePequeno == true){
                      color = '#003d99';
                  }
                  return color;
               }()),
     data: (function () {
      var data = [];
      for (let i = 24; i < 43; i++) {
        let x = i - 24;
       data.push({
        y: p10Pso[x],
       });
      }
      return data;
     }())
    }, {
     type: "line",
     name: 'Pct. 90',
     marker: { enabled: false },
     dashStyle: (function (){
        var estilo = 'solid';

        if (RN.ajustePequeno == true){
            estilo = 'Dash';
        }

        return estilo;
     }()),
     color: (function(){
        var color = '#ff3300';

        if (RN.ajustePequeno == true){
            color = '#003d99';
        }
        return color;
     }()),
     data: (function () {
      var data = [];
      for (let i = 24; i < 43; i++) {
        let x = i - 24;
       data.push({
        y: p90Pso[x],
       });
      }
      return data;
     }())
    }, {
     type: "line",
     name: 'Peso',
     dashStyle: "Dot",
     marker: { symbol: 'square' },
     lineWidth: 0,
     data: (function () {
      var data = [];

      for (let i = 24; i <= (RN.eg -1); i++) {
       data.push({
        y: 0,
       });
      }
      data.push({
       y: parseInt(RN.peso),
      });
      for (let i = RN.eg + 1; i <= 39; i++) {
       data.push({
        y: 0,
       });
      }
      return data;
     }())
    }]
  });

}

the("ajusteNeutro").onclick = function(){

}

the("ajusteArriba").onclick = function(){

}

the("ajusteAbajo").onclick = function(){

}

the("ajusteExtremo").onclick = function(){

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
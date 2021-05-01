function runapp(){
 var tipografico = 0;
 var RN = 0;
 var Tablas = 0;
 var varMama = 0;
 var p90Pso = [];
 var p10Pso = [];

 $('#peso').keyup(function () {
  peso_change();
 })

 $('#talla').keyup(function () {
  talla_change();
 })

 $('#p3').click(function () {
   RN = new RecienNacido($("#peso").val(),$("#talla").val(),$("#eg").val());
   show_hide('div2');
   show_hide('div3');
   $("#talla1").html(RN.talla);
   $("#peso1").html(RN.peso);
   $("#peso2").html(RN.peso);
   $("#peso3").html(RN.peso);
   $("#peso4").html(RN.peso);
   $("#eg1").html(RN.eg);
   $("#eg2").html(RN.eg);
   $("#eg3").html(RN.eg);
   $("#eg4").html(RN.eg);
   $("#eg5").html(RN.eg);
   $("#valipn").html(RN.ipn());
   $("#valipn1").html(RN.ipn());
   $("#valipn2").html(RN.ipnTemuco() + ", " + RN.ipnTemucoCondicion());
   $("#pesoeg1").html(RN.pesoChile() + ", " + RN.pesoChileCondicion());
   $("#pesoeg2").html(RN.pesoTemuco() + ", " + RN.pesoTemucoCondicion());
   $("#ipneg1").html(RN.ipnChile() + ", " + RN.ipnChileCondicion());
   $("#ipneg2").html(RN.ipnTemuco() + ", " + RN.ipnTemucoCondicion());
 })

 $('#g1').click(function () {
  show_hide('div3');
  show_hide('div4');
  tipografico = 0;
  Tablas = new Tabla('Android');
  $('#grafico1').highcharts({
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
    backgroundColor: "rgba(0, 0, 0, 0)"
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
 })

 $('#chg1').click(function () {
 Tablas = new Tabla('Android');
  if (tipografico == 0) {
   tipografico = 1;
   var chart = $('#grafico1').highcharts();
   chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL' });
   chart.series[1].setData(Tablas.pct90PesoTemuco);
   chart.series[0].setData(Tablas.pct10PesoTemuco);
  }
  else if (tipografico == 1) {
   tipografico = 0;
   var chart = $('#grafico1').highcharts();
   chart.setTitle(null, { text: 'REFERENCIA TABLA NACIONAL' });
   chart.series[1].setData(Tablas.pct90PesoNacional);
   chart.series[0].setData(Tablas.pct10PesoNacional);
  }
 })

document.getElementById("g2").addEventListener("click", function () {
 show_hide('div3');
 show_hide('div5');
 tipografico = 0;
 Tablas = new Tabla('Android');
 $('#grafico2').highcharts({
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
})

 $('#chg2').click(function () {
 Tablas = new Tabla('Android');
   if (tipografico == 0) {
    tipografico = 1;
    var chart = $('#grafico2').highcharts();
    chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL' });
    chart.series[0].setData(Tablas.pct10IpnTemuco);
    chart.series[1].setData(Tablas.pct90IpnTemuco);
   }
   else if (tipografico == 1) {
    tipografico = 0;
    var chart = $('#grafico2').highcharts();
    chart.setTitle(null, { text: 'REFERENCIA TABLA NACIONAL' });
    chart.series[0].setData(Tablas.pct10IpnNacional);
    chart.series[1].setData(Tablas.pct90IpnNacional);
   }
 })

 document.getElementById("p4").addEventListener("click", function () {
  show_hide('div3');
  show_hide('div6');
  var apell = 0;
  $("#titulopesoeg5").html("Peso / EG sin ajuste");
  $("#titulopesoeg6").html("Peso / EG con ajuste");
  Tablas = new Tabla('Android');
  if ($("#apellm").val() == 2) {
   apell = 1;
  }
  else {
   apell = $("#apellm").val();
  }
  varMama = new Mama($("#tm").val(),$("#pesom").val(),$("#em").val(),apell);
  $('#valorimc').val(varMama.imc());
  $('#imc').val(varMama.imcCondicion());
 })

 $('#tm').change(function () {
  varMama.talla = $("#tm").val();
  $('#valorimc').val(varMama.imc());
  $('#imc').val(varMama.imcCondicion());
 })

 $('#pesom').change(function () {
  varMama.peso = $("#pesom").val();
  $('#valorimc').val(varMama.imc());
  $('#imc').val(varMama.imcCondicion());
 })

 $('#g3').click(function () {
  show_hide('div6');
  show_hide('div7');
  tipografico = 0;
  var apell = 0;
  if ($("#apellm").val() == 2) {
   apell = 1;
  }
  else {
   apell = $("#apellm").val();
  }

  varMama.edad = $("#em").val();
  varMama.apellido = apell;
  varMama.paridad = $("#pm").val();
  RN.sexo = $("#sn").val();

  var p90 = [0.2418159,-0.0038925,0.0000168,-0.0130562,-0.0127872,-0.0034632,0.0117179,0.0021092,-0.9260631];
  var p10 = [-0.2639902,0.0110356,-0.0001265,-0.0146183,-0.0134044,-0.0020684,0.0092266, 0.0009001, 4.474501];

  for (i = 24; i < 43; i++) {
   x = i - 24;
   p90Pso[x] = Math.pow(10, ((i * p90[0]) + (Math.pow(i, 2) * p90[1]) + (Math.pow(i, 3) * p90[2]) + (p90[3] * $("#pm").val()) + (p90[4] * $("#sn").val()) + (p90[5] * apell) + (p90[6] * $("#imc").val()) + (p90[7] * $("#em").val()) + p90[8]));
   p10Pso[x] = Math.pow(10, ((i * p10[0]) + (Math.pow(i, 2) * p10[1]) + (Math.pow(i, 3) * p10[2]) + (p10[3] * $("#pm").val()) + (p10[4] * $("#sn").val()) + (p10[5] * apell) + (p10[6] * $("#imc").val()) + (p10[7] * $("#em").val()) + p10[8]));;
  }
  Tablas.pct10PesoAjustado = p10Pso;
  Tablas.pct90PesoAjustado = p90Pso;
  $('#grafico3').highcharts({
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
      for (i = 24; i < 43; i++) {
       x = i - 24;
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
      for (i = 24; i < 43; i++) {
       x = i - 24;
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

  $("#pesoeg5").html(RN.pesoTemuco() + ", " + RN.pesoTemucoCondicion());
  ege = RN.eg - 24;
  var uno=p90Pso[ege] - p10Pso[ege];
  var dos = parseInt(RN.peso) - p10Pso[ege];
  valor = parseInt((80 / (uno)) * (dos)) + 10;

  if (parseInt(RN.peso) < p10Pso[ege]){
   valor = "Pct " + valor + " Peque&ntilde;o.";
  }
  else if (parseInt(RN.peso) <= p90Pso[ege]) {
   valor = "Pct " + valor + " Adecuado.";
  }
  else if (parseInt(RN.peso) > p90Pso[ege]) {
   valor = "Pct " + valor + " Grande.";
  }
  $("#pesoeg6").html(valor);

  })

  $('#chg3').click(function () {
  Tablas = new Tabla('Android');
   if (tipografico == 0) {
    tipografico = 1;
    var chart = $('#grafico3').highcharts();
    chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL TEMUCO' });
    chart.series[0].setData([600,662,739,830,938,1064,1208,1373,1565,1756,1970,2192,2415,2628,2820,2978,3089,3120,3123]);
    chart.series[1].setData([800,960,1139,1337, 1551,1781,2022,2272,2527,2781,3031,3270, 3494,3699,3878,4030,4150,4236,4287]);
   }
   else if (tipografico == 1) {
    tipografico = 0;
    Tablas = new Tabla('Android');
    var chart = $('#grafico3').highcharts();
    chart.setTitle(null, { text: 'TABLA DE AJUSTE AL PESO TEMUCO' });
    chart.series[0].setData(p10Pso);
    chart.series[1].setData(p90Pso);
   }
   else if (tipografico == 2) {
    tipografico = 3;
    var chart = $('#grafico3').highcharts();
    chart.setTitle(null, { text: 'REFERENCIA TABLA REGIONAL TEMUCO' });
    chart.series[0].setData([600,662,739,830,938,1064,1208,1373,1565,1756,1970,2192,2415,2628,2820,2978,3089,3120,3123]);
    chart.series[1].setData([800,960,1139,1337, 1551,1781,2022,2272,2527,2781,3031,3270, 3494,3699,3878,4030,4150,4236,4287]);
    chart.series[3].setData([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    chart.series[4].setData([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
   }
   else if (tipografico == 3) {
    tipografico = 2;
    var chart = $('#grafico3').highcharts();
    chart.setTitle(null, { text: 'TABLA DE AJUSTE AL PESO TEMUCO' });
    chart.series[0].setData([614.911761594748,688.2409351621351,775.8261252713739,879.2765685663702,1000.14921864602,1139.7859521609507,1299.0982567628794,1478.2976958841446,1676.578914688683,1891.7742075463264,2120.0143470672206,2355.4478861757852,2590.0872856319534,2813.8600915466154,3014.940876697811,3180.418712251241,3297.311672544965,3353.875214095742,3341.073271117301]);
    chart.series[1].setData([845.6847516567528,1019.8791186895171,1215.1332367429115,1430.6549439464502,1664.8783277732855,1915.435357904167,2179.1679353682594,2452.1831280795927,2729.951302092218,3007.4436584447762,3279.3026501881805,3540.0361747837806,3784.224559989481,4006.728359825368,4202.884932894939,4368.682671927062,4500.903482341126,4597.226484532643,4656.288703467283]);
    chart.series[3].setData([532.7720094718462,596.3058912325178,672.1914745777674,761.8230347419276,866.5495478697786,987.5336430802754,1125.5650517432623,1280.827076703167,1452.6219422120837,1639.0715041903895,1836.8233856299587,2040.8077742235917,2244.1041041316807,2437.985397218539,2612.205863734485,2755.5792133386753,2856.8576426002764,2905.8654410796826,2894.7735782926065]);
    chart.series[4].setData([711.5447194612854,858.108887467441,1022.3923706232943,1203.7286574482926,1400.800215862748,1611.6146255636006,1833.5147159659111,2063.2250404407005,2296.9344422785457,2530.4117758437037,2759.1492925532416,2978.526031047196,3183.981971581188,3371.1928720061205,3536.235665413285,3675.7350538979554,3786.9833875928784,3868.0279180018288,3917.721861188435]);
   }
  });

  document.getElementById("opt4").addEventListener("click", function () {
       show_hide('div6');
       show_hide('div7');
       tipografico = 2;

       var p10Pso1 = [614.911761594748,688.2409351621351,775.8261252713739,879.2765685663702,1000.14921864602,1139.7859521609507,1299.0982567628794,1478.2976958841446,1676.578914688683,1891.7742075463264,2120.0143470672206,2355.4478861757852,2590.0872856319534,2813.8600915466154,3014.940876697811,3180.418712251241,3297.311672544965,3353.875214095742,3341.073271117301];
       var p90Pso1 = [845.6847516567528,1019.8791186895171,1215.1332367429115,1430.6549439464502,1664.8783277732855,1915.435357904167,2179.1679353682594,2452.1831280795927,2729.951302092218,3007.4436584447762,3279.3026501881805,3540.0361747837806,3784.224559989481,4006.728359825368,4202.884932894939,4368.682671927062,4500.903482341126,4597.226484532643,4656.288703467283];

       $("#titulopesoeg5").html("P / Eg cond. superior");
       ege = RN.eg - 24;
       console.log (ege);
       console.log(p90Pso1[ege]);
       console.log(p10Pso1[ege]);
       var uno=p90Pso1[ege] - p10Pso1[ege];
       console.log (uno);
       var dos = parseInt(RN.peso) - p10Pso1[ege];
       console.log (dos);
       valor = parseInt((80 / (uno)) * (dos)) + 10;
       console.log (valor);

       if (parseInt(RN.peso) < p10Pso1[ege]){
           valor = "Pct " + valor + " Peque&ntilde;o.";
       }
       else if (parseInt(RN.peso) <= p90Pso1[ege]) {
           valor = "Pct " + valor + " Adecuado.";
       }
       else if (parseInt(RN.peso) > p90Pso1[ege]) {
          valor = "Pct " + valor + " Grande.";
       }
       $("#pesoeg5").html(valor);

       var p10Pso2 = [532.7720094718462,596.3058912325178,672.1914745777674,761.8230347419276,866.5495478697786,987.5336430802754,1125.5650517432623,1280.827076703167,1452.6219422120837,1639.0715041903895,1836.8233856299587,2040.8077742235917,2244.1041041316807,2437.985397218539,2612.205863734485,2755.5792133386753,2856.8576426002764,2905.8654410796826,2894.7735782926065];
       var p90Pso2 = [711.5447194612854,858.108887467441,1022.3923706232943,1203.7286574482926,1400.800215862748,1611.6146255636006,1833.5147159659111,2063.2250404407005,2296.9344422785457,2530.4117758437037,2759.1492925532416,2978.526031047196,3183.981971581188,3371.1928720061205,3536.235665413285,3675.7350538979554,3786.9833875928784,3868.0279180018288,3917.721861188435];

       $("#titulopesoeg6").html("P / Eg cond. inferior");
       ege = RN.eg - 24;
       var uno=p90Pso2[ege] - p10Pso2[ege];
       var dos = parseInt(RN.peso) - p10Pso2[ege];
       valor = parseInt((80 / (uno)) * (dos)) + 10;

       if (parseInt(RN.peso) < p10Pso2[ege]){
           valor = "Pct " + valor + " Peque&ntilde;o.";
       }
       else if (parseInt(RN.peso) <= p90Pso2[ege]) {
           valor = "Pct " + valor + " Adecuado.";
       }
       else if (parseInt(RN.peso) > p90Pso2[ege]) {
          valor = "Pct " + valor + " Grande.";
       }
       $("#pesoeg6").html(valor);

    $('#grafico3').highcharts({
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
     plotOptions: {
      series: {
       enableMouseTracking: false
      }
     },
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
       data: (function () {
        var data = [];
        for (i = 24; i < 43; i++) {
         x = i - 24;
         data.push({
          y: p10Pso1[x],
         });
        }
        return data;
       }())
      }, {
       type: "line",
       name: 'Pct. 90',
       marker: { enabled: false },
       data: (function () {
        var data = [];
        for (i = 24; i < 43; i++) {
         x = i - 24;
         data.push({
          y: p90Pso1[x],
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
      },{
        type: "line",
        name: 'Pct. 10',
             marker: { enabled: false },
             dashStyle: "Dash",
             color: '#003d99',
             data: (function () {
              var data = [];
              for (i = 24; i < 43; i++) {
               x = i - 24;
               data.push({
                y: p10Pso2[x],
               });
              }
              return data;
             }())
            }, {
             type: "line",
             name: 'Pct. 90',
             marker: { enabled: false },
             color: '#003d99',
             dashStyle: "Dash",
             data: (function () {
              var data = [];
              for (i = 24; i < 43; i++) {
               x = i - 24;
               data.push({
                y: p90Pso2[x],
               });
              }
              return data;
             }())
            }]
    });

   });

   $('#opt1').click(function () {
    $('#pm').val("1");
    $('#sn').val("1");
    $('#tm').val("149");
    $('#pesom').val("70");
    $('#em').val("6");
    $('#apellm').val("1");
    varMama = new Mama('149','70',$("#em").val(),$('#apellm').val());
    varMama.talla = '149';
    varMama.peso = '70';
    $('#valorimc').val(varMama.imc());
    $('#imc').val(varMama.imcCondicion());
    RN.ajustePequeno = false;
   });
   $('#opt2').click(function () {
    $('#pm').val("0");
    $('#sn').val("0");
    $('#tm').val("170");
    $('#pesom').val("91");
    $('#em').val("6");
    $('#apellm').val("0");
    $('#tm').change();
    varMama = new Mama('170','91',$("#em").val(),$('#apellm').val());
    varMama.talla = '170';
    varMama.peso = '91';
    $('#valorimc').val(varMama.imc());
    $('#imc').val(varMama.imcCondicion());
    RN.ajustePequeno = false;
   });
   $('#opt3').click(function () {
    $('#sn').val("1");
    $('#pm').val("1");
    $('#tm').val("149");
    $('#pesom').val("44");
    $('#em').val("1");
    $('#apellm').val("1");
    $('#tm').change();
    varMama = new Mama('149','44',$("#em").val(),$('#apellm').val());
    varMama.talla = '149';
    varMama.peso = '44';
    $('#valorimc').val(varMama.imc());
    $('#imc').val(varMama.imcCondicion());
    RN.ajustePequeno = true;
   });
}

function back() {
    var p2 = document.getElementById('div2');
    var p3 = document.getElementById('div3');
    var p4 = document.getElementById('div4');
    var p5 = document.getElementById('div5');
    var p6 = document.getElementById('div6');
    var p7 = document.getElementById('div7');

    if (p7.style.display == 'table') {
        show_hide('div7');
        show_hide('div6');
        return false;
    }
    else if (p6.style.display == 'table') {
        show_hide('div6');
        show_hide('div3');
        return false;
    }
    else if (p5.style.display == 'table') {
        show_hide('div5');
        show_hide('div3');
        return false;
    }
    else if (p4.style.display == 'table') {
        show_hide('div4');
        show_hide('div3');
        return false;
    }
    else if (p3.style.display == 'table') {
        show_hide('div3');
        show_hide('div2');
        return false;
    }
    else {
        app.salir()
        return false;
    }
}
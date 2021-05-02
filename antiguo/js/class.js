function RecienNacido(peso, talla,eg) {
           this.peso = peso;
           this.talla = talla;
           this.eg = eg;
           this.ipn = function ipn(){
                      var valor = this.peso / (Math.pow(this.talla, 3));
                      valor = valor * 100000;
                      return valor.toFixed(1);
           };
           this.pesoChile = function pesoChile(){
                      eg = this.eg - 24;
                      var tablas = new Tabla;
                      var uno = tablas.pct90PesoNacional[eg] - tablas.pct10PesoNacional[eg];
                      var dos = this.peso - tablas.pct10PesoNacional[eg];
                      return parseInt((80 / (uno)) * (dos)) + 10;
           };
           this.pesoTemuco = function pesoTemuco(){
                      eg = this.eg - 24;
                      var tablas = new Tabla;
                      var uno = tablas.pct90PesoTemuco[eg] - tablas.pct10PesoTemuco[eg];
                      var dos = this.peso - tablas.pct10PesoTemuco[eg];
                      return parseInt((80 / (uno)) * (dos)) + 10;
           };
           this.pesoAjustado = 0;
           this.pesoChileCondicion = function pesoChileC(){
                      eg = this.eg - 24;
                      var tablas = new Tabla;
                      if (this.peso < tablas.pct10PesoNacional[eg]){
                       return "Peque&ntilde;o";
                      }
                      else if (this.peso <= tablas.pct90PesoNacional[eg]) {
                       return "Adecuado";
                      }
                      else if (this.peso > tablas.pct90PesoNacional[eg]) {
                       return "Grande";
                      }
           };
           this.pesoTemucoCondicion = function pesoTemucoC(){
                      eg = this.eg - 24;
                      var tablas = new Tabla;
                      if (this.peso < tablas.pct10PesoTemuco[eg]){
                       return "Peque&ntilde;o";
                      }
                      else if (this.peso <= tablas.pct90PesoTemuco[eg]) {
                       return "Adecuado";
                      }
                      else if (this.peso > tablas.pct90PesoTemuco[eg]) {
                       return "Grande";
                      }
           };
           this.pesoAjutadoCondicion = '';
           this.ipnChile = function ipnChile(){
                      var eg = this.eg - 24;
                      var tablas = new Tabla;
                      var uno = tablas.pct90IpnNacional[eg] - tablas.pct10IpnNacional[eg];
                      var dos= this.ipn() - tablas.pct10IpnNacional[eg];
                      return parseInt((80 / (uno)) * (dos)) + 10;
           };
           this.ipnTemuco = function ipnTemuco(){
                      var eg = this.eg - 24;
                      var tablas = new Tabla;
                      var uno = tablas.pct90IpnTemuco[eg] - tablas.pct10IpnTemuco[eg];
                      var dos = this.ipn() - tablas.pct10IpnTemuco[eg];
                      return parseInt((80 / (uno)) * (dos)) + 10;
           };
           this.ipnChileCondicion = function ipnChileC(){
                     var eg = this.eg - 24;
                     var tablas = new Tabla;
                     if (this.ipn() < tablas.pct10IpnNacional[eg]){
                      return "Enflaquecido";
                     } else if (this.ipn() <= tablas.pct90IpnNacional[eg]) {
                      return "Eutr&oacute;fico";
                     } else if (this.ipn() > tablas.pct90IpnNacional[eg]) {
                      return "RN Obeso";
                     }
           };
           this.ipnTemucoCondicion = function ipnTemucoC(){
                    var eg = this.eg - 24;
                    var tablas = new Tabla;
                    if (this.ipn() < tablas.pct10IpnTemuco[eg]){
                     return "Enflaquecido";
                    } else if (this.ipn() <= tablas.pct90IpnTemuco[eg]) {
                     return "Eutr&oacute;fico";
                    } else if (this.ipn() > tablas.pct90IpnTemuco[eg]) {
                     return "RN Obeso";
                    }
           };
           this.sexo = '';
           this.ajustePequeno = false;
}

function Tabla(plataforma) {
           this.plataforma = plataforma;
           this.pct10IpnNacional = [1.79, 1.83, 1.87, 1.91, 1.95, 1.99, 2.04, 2.08, 2.12, 2.16, 2.2, 2.25, 2.29, 2.33, 2.37, 2.41, 2.45, 2.5, 2.54];
           this.pct90IpnNacional = [2.54, 2.57, 2.59, 2.62, 2.65, 2.68, 2.71, 2.74, 2.77, 2.8, 2.83, 2.86, 2.89, 2.92 ,2.95, 2.98, 3.01,3.04, 3.07];
           this.pct10PesoNacional = [640.6,666,728.2,822.9,945.7,1092.2,1258.2,1439.2,1630.8,1828.7,2028.6,2226,2416.7,2596.2,2760.2,2904.2,3024.1,3115.3,3173.5];
           this.pct90PesoNacional = [897.9,963.3,1070.6,1214.6,1390.1,1592,1815,2053.8,2303.4,2558.5,2813.9,3064.4,3304.7,3529.8,3734.4,3913.2,4061.2,4173,4243.5];
           this.pct10IpnTemuco = [1.95,1.93,1.92,1.92,1.94,1.97,2.01,2.06,2.11,2.17,2.23,2.28,2.33,2.38,2.41,2.44,2.44,2.42,2.39];
           this.pct90IpnTemuco = [2.43,2.44,2.46,2.49,2.53,2.57,2.62,2.68,2.74,2.79,2.85,2.9,2.95,2.99,3.02,3.04,3.05,3.04,3.01];
           this.pct10PesoTemuco = [600,662,739,830,938,1064,1208,1373,1565,1756,1970,2192,2415,2628,2820,2978,3089,3120,3123];
           this.pct90PesoTemuco = [800,960,1139,1337, 1551,1781,2022,2272,2527,2781,3031,3270, 3494,3699,3878,4030,4150,4236,4287];
           this.pct10PesoAjustado = [];
           this.pct90PesoAjustado = [];
}

function Mama(talla,peso,edad,apellido) {
           this.paridad = 0
           this.talla = talla;
           this.peso = peso;
           this.edad = edad;
           this.apellido = apellido;
           this.imc = function imc(){
                  var valor = ((this.peso / (Math.pow(this.talla, 2))) * 10000);
                  return valor.toFixed(1);
           };
           this.imcCondicion = function imcC(){
                  if (this.imc() < 20){
                   return 1
                  }
                  else if (this.imc() < 25) {
                   return 2
                  }
                  else if (this.imc() <= 30) {
                   return 3
                  }
                  else if (this.imc() > 30) {
                   return 4
                  }
           };
}
//Leer archivos facilito. FECTH ES UNA PROMESA, entonces debemos resolverla
const URL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

const t = (callback) => {
  fetch(URL).then((element) => {
    const a = element.json();
    a.then((r) => {
      callback(r);
    });
  });
};

//Vamos a hacer marranadas y los metemos al dom
t((ar) => {
  let dict = {};
  const keys = [];

  const conte = document.getElementById("container");

  //Primero creemos la tabla
  var tbl = document.createElement("table");
  tbl.style.width = "100%";
  tbl.setAttribute("class", "table table-hover");

  var primera = document.createElement("tr");

  var thead1 = document.createElement("th");
  var l = document.createTextNode("#");
  thead1.appendChild(l);
  var thead2 = document.createElement("th");
  var n = document.createTextNode("Events");
  thead2.appendChild(n);

  var thead3 = document.createElement("th");
  var o = document.createTextNode("Squirrel");
  thead3.appendChild(o);

  primera.appendChild(thead1);
  primera.appendChild(thead2);
  primera.appendChild(thead3);

  tbl.appendChild(primera);

  var tbdy = document.createElement("tbody");

  for (let k = 0; k < ar.length; k++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    var celda = document.createElement("td");
    var num = document.createTextNode(k + 1);
    celda.appendChild(num);
    hilera.appendChild(celda);

    //AQUI ME HAGO MI MATRIZ
    for (let z = 0; z < ar[k].events.length; z++) {
      let u = ar[k].events[z];
      if (dict[u] == null) {
        let h = new Object();
        h["TP"] = 0;
        h["FN"] = 0;
        h["TN"] = 0;
        h["FP"] = 0;
        dict[u] = h;
        keys.push(u);
      }
      if (ar[k].squirrel == true) {
        dict[u]["TP"] += 1;
      } else {
        dict[u]["FN"] += 1;
      }
    }
    var eventos = ar[k].events.join();
    var celda = document.createElement("td");
    var uno = document.createTextNode(eventos);
    celda.appendChild(uno);
    hilera.appendChild(celda);

    var ardilla = ar[k].squirrel;
    var celda = document.createElement("td");
    var dos = document.createTextNode(ardilla);
    celda.appendChild(dos);
    hilera.appendChild(celda);

    if (ardilla == true) {
      hilera.setAttribute("class", "table-danger");
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tbdy.appendChild(hilera);
  }
  tbl.append(tbdy);
  conte.append(tbl);

  //SEGUNDA PARTE

  for (let i = 0; i < ar.length; i++) {
    let check = ar[i];
    let rev = keys;
    rev = rev.filter(function (val) {
      return check.events.indexOf(val.toString()) == -1;
    });

    for (let r = 0; r < rev.length; r++) {
      let a = rev[r];
      if (check.squirrel == true) {
        dict[a]["FP"] += 1;
      } else {
        dict[a]["TN"] += 1;
      }
    }
  }

  console.log(dict);
});

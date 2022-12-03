

$(document).ready(function(){
    let grid = window.data;
    let listColores = [];
    var idCirculo = "";
    var fila = 0;
    fila = 0;
    var comprobar = false;
    $(".circle").click(function(){
        idCirculo = $(this).data("id");
        $(".paleta-" + idCirculo).slideToggle("slow");
    });
    $(".pincel").click(function(){
        var exa = $(this).data("hex");
        dictColor = {
          "circulo": idCirculo,
          "color": exa,
        };
        
        agregar(grid, idCirculo, exa);
        
        if(listColores.length == 4){
          $(".btn").css({ "background-color": "green","color":"white" });
        }

        $(".paletaColores").slideUp("fast");
        $(".circle-" + idCirculo).css("background-color", "#" + exa);
    })
    $(".comprobar").click(function(){
      sendData(listColores);
      listColores = [];
    })
})

function agregar(grid, circulo, valor) {
  let list = grid.args;
  console.log(list[0]);
  list.forEach(function (list, index) {
    if (list[index]) {
      if (list[index].fila === circulo) {
        list[index].value = valor;
        console.log("se encontro: " + list[index].fila);

        return 1;
      }
    }
    
  });
  console.log(list);
  return -1;
}

function sendData(listColores, id) {
  var juego = {
        "game":$(".consola").data("id"),
        "lista":listColores
    }
  var data = JSON.stringify(juego);
  $.ajax({
    url: "/api/",
    type: "POST",
    datatype: "json",
    data: data,
    success: function (e) {
      var resultados = JSON.parse(e);
      console.log(typeof(resultados))
      listColores.forEach(function(element, index, array){
        console.log(element);
        $(".ayuda-" + element["circulo"]).empty()
        $(".ayuda-" + element["circulo"]).append(
          "<div class='circle' style=background:#" +
            resultados[index] +
          "></div>"
        );
      });
      return e;
    },
  });
}
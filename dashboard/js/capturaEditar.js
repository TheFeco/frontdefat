$(document).ready(function () {
    function getDeportista() {
        var idDeportista = getQueryVariable('id');
        $('.loading').show();
        let url = "deportistasUpdate.php?id_usuario=" + getUsuario() + "&id_deportista=" + idDeportista+ "&token=" + getToken();
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {

                var datos = data[0];
                console.log(datos);
                $('#funcion').val(parseInt(datos.id_funcion));
                $('#curp').val(datos.curp);
                $('#nombre').val(datos.nombre);
                $('#apellidos').val(datos.apellidos);
                $('#fh_nacimiento').val(datos.fh_nacimiento);
                $('#ciclo').val(parseInt(datos.id_ciclo));
                $('#cct').val(datos.cct);
                $('#escuela').val(datos.escuela);
                $('#turno').val(parseInt(datos.turno));
                $('#municipio').val(parseInt(datos.id_municipio));
                $('#zona').val(datos.zona);
                $('#deporte').val(parseInt(datos.id_deporte));
                $('#rama').val(parseInt(datos.id_rama));
                $('#peso').val(parseInt(datos.id_peso));
                $('#categoria').val(parseInt(datos.id_categoria));
                // Obtener el valor del campo "id_prueba"
                let id_prueba = datos.id_prueba;
                console.log(id_prueba);
                $('#funcion').change();
                
                if ($('#deporte').val() && $('#deporte').val() !== "0") {
                    $("#deporte").change();
                    $('#rama').val(parseInt(datos.id_rama));
                }
                if ($('#rama').val() && $('#rama').val() !== "0") {
                    $("#rama").change();
                    $('#peso').val(parseInt(datos.id_peso));
                    $('#categoria').val(parseInt(datos.id_categoria));
                    $('#prueba').val(parseInt(datos.id_prueba));
                  }
                if ($('#peso').val() && $('#peso').val() !== "0") {
                    $("#peso").change();
                    $('#peso').val(parseInt(datos.id_peso));
                    $('#prueba').val(parseInt(datos.id_prueba));
                }
                if ($('#categoria').val() && $('#categoria').val() !== "0") {
                    $("#categoria").change();
                    $('#categoria').val(parseInt(datos.id_categoria));
                    $('#prueba').val(parseInt(datos.id_prueba));
                }
                $('#prueba').val(1);
                console.log($('#prueba').val());

                $('.loading').hide();
            },
            error: function () {
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }

    function CargarDatos() {
        let url = "funciones.php?id=" + getUsuario();
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {

                var datos = JSON.parse(data);
                $.each(datos.funciones, function (key, funcion) {
                    $("#funcion").append('<option value=' + funcion.id + '>' + funcion.nombre + '</option>');
                });
                $.each(datos.ciclos, function (key, ciclo) {
                    $("#ciclo").append('<option value=' + ciclo.id + '>' + ciclo.nombre + '</option>');
                });
                $.each(datos.cct, function (key, cct) {
                    $("#cct").append('<option value=' + cct.id + '>' + cct.nombre + '</option>');
                });
                $.each(datos.escuela, function (key, cct) {
                    $("#escuela").append('<option value=' + escuela.id + '>' + escuela.nombre + '</option>');
                });
                $.each(datos.turno, function (key, turno) {
                    $("#turno").append('<option value=' + turno.id + '>' + turno.nombre + '</option>');
                });
                $.each(datos.municipios, function (key, municipio) {
                    $("#municipio").append('<option value=' + municipio.id + '>' + municipio.nombre + '</option>');
                });
                $.each(datos.zona, function (key, zona) {
                    $("#zona").append('<option value=' + zona.id + '>' + zona.nombre + '</option>');
                });
                $.each(datos.deportes, function (key, deporte) {
                    $("#deporte").append('<option value=' + deporte.id + '>' + deporte.nombre + '</option>');
                });
                $.each(datos.ramas, function (key, rama) {
                    $("#rama").append('<option value=' + rama.id + '>' + rama.nombre + '</option>');
                });
                getDeportista();
                
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return null;
    }

    function mostrarDeportistas() {
        $(".deporte").css("display", "block");
        $(".rama").css("display", "block");
        $(".fnDeportista").css("display", "block");
        $(".fnEntrenadores").css("display", "none");
        $(".categoria").css("display", "none");
        $(".peso").css("display", "none");
        $(".prueba").css("display", "none");
      }
      
      function mostrarEntrenadores() {
        $(".deporte").css("display", "block");
        $(".rama").css("display", "block");
        $(".fnEntrenadores").css("display", "block");
        $(".fnDeportista").css("display", "none");
        $(".categoria").css("display", "none");
        $(".peso").css("display", "none");
        $(".prueba").css("display", "none");
      }
    $('#funcion').change(function () {
        const key = parseInt($(this).val());
        
        // Ocultar todos los elementos
        $(".deporte, .rama, .categoria, .peso, .prueba, .fnDeportista, .fnEntrenadores").css("display", "none");
        
        // Mostrar los elementos según la key
        switch (key) {
          case 1:
            mostrarDeportistas();
            break;
          case 2:
            mostrarEntrenadores();
            break;
          case 3:
            $(".fnEntrenadores.fnDelegados").css("display", "block");
            break;
          case 4:
            $(".deporte").css("display", "block");
            break;
          case 6:
            $(".deporte").css("display", "block");
            break;
          case 7:
            $(".deporte").css("display", "block");
            $(".fnEntrenadores.fnDelegados").css("display", "block");
            break;
          case 8:
            mostrarEntrenadores();
            break;
          default:
            // Manejar keys que no estén incluidas en los casos anteriores
            $(".deporte").css("display", "block");
            break;
        }
      });
    CargarDatos();
    
});
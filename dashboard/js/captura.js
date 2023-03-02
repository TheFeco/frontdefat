// Incluye el archivo de configuración
$(document).ready(function () {
    //Llamadas por jquery
    $('#cct').inputmask("25AAA9999A");

    $('#cct').change(function() {
        // Obtiene el valor del campo "cct"
        const cct = $(this).val().trim();
        
        // Valida que el campo "cct" no esté vacío
        if (!cct) {
            // Muestra una alerta si el campo "cct" está vacío
            Swal.fire({
                title: "Lo sentimos",
                text: "Por favor, proporcione una clave de centro de trabajo válida.",
                icon: "warning",
                button: "OK",
            });
            $(this).addClass('is-invalid');
            return;
        }
        $(this).removeClass('is-invalid');
        
        // Realiza la llamada AJAX para obtener datos de las escuelas
        const url = "escuelas.php?escuela='" + cct + "'";
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function(data) {
                // Agrega aquí el código para manipular los datos obtenidos

                if (data.length > 0) {
                    $('#escuela').val(data[0]["nombre"]);
                    $('#municipio').val(data[0]["id_municipio"]);
                    $('#turno').val(data[0]["id_turno"]);
                    $('#zona').val(data[0]["zona"]);
                }
                
            },
            error: function(xhr, status, error) {
                // Muestra una alerta si la llamada AJAX falla
                Swal.fire({
                    title: "Lo sentimos",
                    text: "No se pudo obtener información de las escuelas. Por favor, inténtelo de nuevo más tarde.",
                    icon: "error",
                    button: "OK",
                });
            },
        });
    });

    $('#curp').change( function(){
        $('#curp').val($('#curp').val().toUpperCase());
        var curp = $('#curp').val();
        //Valdiamos la curp si esta escrita bien por renapo
        if(curp.length != 18) return;
        if (curpValida(curp)) {
            $(this).removeClass('is-invalid');
        } else {
            // resultado.classList.remove("ok");
            $(this).addClass('is-invalid');
            //Muesta mensaje si la curp esta escrita mal
            Swal.fire({
                title: "Lo sentimos",
                text: "La curp proporcionada es erronea favor de consultarla",
                icon: "warning",
                button: "salir",
            });
        }
    });

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
          case 4:
            $(".deporte").css("display", "block");
            break;
          case 6:
            $(".deporte").css("display", "block");
            break;
          default:
            // Manejar keys que no estén incluidas en los casos anteriores
            $(".deporte").css("display", "block");
            break;
        }
      });
      
    //Funciones
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
    //Validador de curp
    function curpValida(curp) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);
        
        if (!validado)  //Coincide con el formato general?
        
            return false;
        
        //Validar que coincida el dígito verificador
        function digitoVerificador(curp17) {
            //Fuente https://consultas.curp.gob.mx/CurpSP/
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if(lngDigito == 10)
                return 0;
            return lngDigito;
        }
        if (validado[2] != digitoVerificador(validado[1])) 
            return false;
            
        return true; //Validado
    }
    // submit
    $("#formInformes").submit(function (e) {
        e.preventDefault();
        array1 = [1, 2, 4];
        array2 = [1, 2];
        var nombre = $.trim($("#formInformes #nombre").val());
        curp = $.trim($("#formInformes #curp").val());
        apellidos = $.trim($("#formInformes #apellidos").val());
        ciclo = parseInt($("#formInformes #ciclo").val());
        escuela = $.trim($("#formInformes #escuela").val());
        funcion = parseInt($("#formInformes #funcion").val());
        deporte = parseInt($("#deporte").val());
        rama = parseInt($("#rama").val());
        categoria = parseInt($("#categoria").val());
        peso = parseInt($("#peso").val());
        prueba = parseInt($("#prueba").val());
        archivo = $("#formInformes #foto").val();
        actNacimiento = $("#formInformes #actNacimiento").val();
        curpPdf = $("#formInformes #curpPdf").val();
        cerMedico = $("#formInformes #cerMedico").val();
        cartaResponsiva = $("#formInformes #cartaResponsiva").val();
        ine = $("#formInformes #ine").val();
        METHOD = "POST";

        if (!funcion) {
            $('#formInformes #funcion').addClass('is-invalid');
        } else {
            $('#formInformes #funcion').removeClass('is-invalid');
        }
        if (!nombre) {
            $('#formInformes #nombre').addClass('is-invalid');
        } else {
            $('#formInformes input#nombre').removeClass('is-invalid');
        }
        if (!curp) {
            $('#formInformes #curp').addClass('is-invalid');
        } else {
            $('#formInformes input#curp').removeClass('is-invalid');
        }
        if (!apellidos) {
            $('#formInformes #apellidos').addClass('is-invalid');
        } else {
            $('#formInformes #apellidos').removeClass('is-invalid');
        }
        if (!ciclo) {
            $('#formInformes #ciclo').addClass('is-invalid');
        } else {
            $('#formInformes #ciclo').removeClass('is-invalid');
        }
        if (!escuela) {
            $('#formInformes #escuela').addClass('is-invalid');
        } else {
            $('#formInformes #escuela').removeClass('is-invalid');
        }

        if ($.inArray(funcion, array1) != -1) {
            if (!deporte) {
                $('#deporte').addClass('is-invalid');
            } else {
                $('#deporte').removeClass('is-invalid');
            }
            if ($.inArray(funcion, array2) != -1) {
                if (!rama) {
                    $('#rama').addClass('is-invalid');
                } else {
                    $('#rama').removeClass('is-invalid');
                }
                if (funcion == 1) {
                    switch (deporte) {
                        case 1:
                            if (!categoria) {
                                $('#categoria').addClass('is-invalid');
                            } else {
                                $('#categoria').removeClass('is-invalid');
                            }
                            break;
                        case 2:
                            if (!prueba) {
                                $('#prueba').addClass('is-invalid');
                            } else {
                                $('#prueba').removeClass('is-invalid');
                            }
                            break;
                        case 3:
                            if (!categoria) {
                                $('#cateogira').addClass('is-invalid');
                            } else {
                                $('#cateogira').removeClass('is-invalid');
                            }
                            break;
                        case 8:
                            if (!peso) {
                                $('#peso').addClass('is-invalid');
                            } else {
                                $('#peso').removeClass('is-invalid');
                            }
                            if (!prueba) {
                                $('#prueba').addClass('is-invalid');
                            } else {
                                $('#prueba').removeClass('is-invalid');
                            }
                            break;
                        case 9:
                            if (!categoria) {
                                $('#cateogira').addClass('is-invalid');
                            } else {
                                $('#cateogira').removeClass('is-invalid');
                            };
                            break;
                    }
                }
            }
        }
        if (!archivo) {
            $("#formInformes #archivo").addClass('is-invalid');
        } else {
            $('#formInformes #archivo').removeClass('is-invalid');
        }
        if (!actNacimiento && funcion == 1) {
            $("#formInformes #actNacimiento").addClass('is-invalid');
        } else {
            $('#formInformes #actNacimiento').removeClass('is-invalid');
        }
        if (!curpPdf && funcion == 1 ) {
            $("#formInformes #curpPdf").addClass('is-invalid');
        } else {
            $('#formInformes #curpPdf').removeClass('is-invalid');
        }
        if (!cerMedico && funcion == 1) {
            $("#formInformes #cerMedico").addClass('is-invalid');
        } else {
            $('#formInformes #cerMedico').removeClass('is-invalid');
        }
        if (!cartaResponsiva && funcion == 1) {
            $("#formInformes #cartaResponsiva").addClass('is-invalid');
        } else {
            $('#formInformes #cartaResponsiva').removeClass('is-invalid');
        }
        if (!ine && funcion == 1) {
            $("#formInformes #ine").addClass('is-invalid');
        } else {
            $('#formInformes #ine').removeClass('is-invalid');
        }
        if ($('#cct').inputmask('isComplete')) {
            $('#cct').removeClass('is-invalid');
        } else {
            $('#cct').addClass('is-invalid');
        }
        if (curpValida(curp.toUpperCase())) {
            $('#curp').removeClass('is-invalid');
        } else {
            $('#curp').addClass('is-invalid');
        }
        usuario = getUsuario();
        nivel = getNivel();
        formData = new FormData(this);
        formData.append('usuario', usuario);
        formData.append('nivel', nivel);
        formData.append('METHOD', 'POST');
        if (validar()) {
            $.ajax({
                url: baseUrl + "storeRegistro.php",
                type: "POST",
                dataType: "JSON",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    var datos = data;
                    $("#modalSuccess").modal('show');

                },
                error: function (data) {
                    var error = data;
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al obtener los datos'
                    });
                }
            });

        }
    });

    function validar() {
        var hasError = true
        $('#formInformes input, #formInformes select').each(function () {
            var input = $(this);
            if (input.hasClass('is-invalid')) {
                hasError = false;
            }

        });
        return hasError;
    }

    CargarDatos();
});
//variables 
var fila; //capturar la fila para editar o borrar el registro
var ciclo;
var periodos;
$(document).ready(function () {
    if (localStorage.getItem("s_storage") === null) {
        window.location.href = "../index.php";
    }

    if (!window.location.pathname.endsWith('deportistas.php') && sessionStorage.getItem('informe')) {
        sessionStorage.removeItem('informe');
    }


    $('.loading').hide();


    tablaPersonas = $("#tablaPersonass").DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
        }],

        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        },

    });


    $('.usuarioNombre').text(getUsuarioNombre());
    $('textarea.editor').ckeditor();


    $("#btnNuevo").click(function () {
        window.location.href = "captura.php"
    });



    $("#formComentarios").submit(function (e) {
        e.preventDefault();
        comentario = $.trim($("#formComentarios #comentario").val());
        id = $.trim($("#formComentarios #id").val());
        fila = $(this);
        usuario = getUsuario();
        opcion = 1;
        METHOD = "POST";
        if (!comentario) {
            $('#formComentarios #comentario').addClass('is-invalid');
        } else {
            $('#formComentarios #comentario').removeClass('is-invalid');
        }

        if (validar()) {
            $.ajax({
                url: "bd/funcionesAdmin.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    METHOD: METHOD,
                    id: id,
                    opcion: opcion,
                    usuario: usuario,
                    comentario: comentario
                },
                success: function (data) {
                    var datos = data;
                    $("#modalComentarios").modal("hide");
                    llenaTablaInformes(datos.informes, getRol());
                },
                error: function (data) {
                    var error = JSON.parse(data);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.menssage
                    });
                }
            });

        }

    });

    $('#logout').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: baseUrl + "logout.php",
            type: "GET",
            datatype: "json",
            success: function (data) {
                localStorage.removeItem('s_storage')
                window.location.href = "../index.php";
            }
        });
    });

    $(document).on("click", ".btnVer", function () {
        cct = $(this).data('cct');
        id_ciclo = $(this).data('id_ciclo');
        id_funcion = $(this).data('id_funcion');
        id_deporte = $(this).data('id_deporte');
        id_rama = $(this).data('id_rama');
        $(".bd-example-modal-lg").modal("show");
        let url = "getDeportistas.php?id_usuario=" + getUsuario() + "&id_ciclo=" + id_ciclo + "&id_funcion=" + id_funcion + '&id_deporte=' + id_deporte + '&id_rama=' + id_rama + '&cct=' + cct;
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {
                var datos = JSON.parse(data);
                var html;
                $.each(datos.registros, function (key, informe) {
                    var deporte = (informe.deporte == null) ? "" : informe.deporte;
                    var rama = (informe.rama == null) ? "" : informe.rama;
                    html += '<tr>' +
                        '<td >' + informe.escuela + '</td>' +
                        '<td>' + informe.ciclo + '</td>' +
                        '<td>' + informe.nombre + '</td>' +
                        '<td>' + informe.apellidos + '</td>' +
                        '<td>' + informe.funcion + '</td>' +
                        '<td>' + deporte + '</td>' +
                        '<td>' + rama + '</td>' +
                        '<td>' + informe.array_pruebas + '</td>';
                    html += '</tr>';
                });
                $('#DataDeportistas').html(html);
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    });

    // funciones
    function getData() {
        let url = "funciones.php?id=" + getUsuario();
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {

                var datos = JSON.parse(data);

                if (datos.registros.length > 0) {
                    llenaTablaInformes(datos.registros);

                }
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

    function llenaTablaInformesOld(data) {
        var html;

        $.each(data, function (key, informe) {
            var deporte = (informe.deporte == null) ? "" : informe.deporte;
            var rama = (informe.rama == null) ? "" : informe.rama;
            html += '<tr>' +
                '<td >' + informe.escuela + '</td>' +
                '<td>' + informe.ciclo + '</td>' +
                '<td>' + informe.funcion + '</td>' +
                '<td>' + deporte + '</td>' +
                '<td>' + rama + '</td>';
            html += '<td><div class="text-center"><div class="btn-group"><button type="button" class="btn btn-info btnVer" data-cct="' + informe.cct + '" data-id_ciclo="' + informe.id_ciclo + '"  data-id_funcion="' + informe.id_funcion + '"  data-id_deporte="' + informe.id_deporte + '" data-id_rama="' + informe.id_rama + '">VER</button></div></div></td>';
            html += '</tr>';
        });
        $('#DataResult').html(html);
    }

    function llenaTablaInformes(data) {
        var html = "";
        $.each(data, function (key, informe) {
            var deporte = (informe.deporte == null) ? "" : informe.deporte;
            var rama = (informe.rama == null) ? "" : informe.rama;
            html += '<tr data-informe="' + encodeURIComponent(JSON.stringify(informe)) + '">' +
                '<td>' + informe.escuela + '</td>' +
                '<td>' + informe.ciclo + '</td>' +
                '<td>' + informe.funcion + '</td>' +
                '<td>' + deporte + '</td>' +
                '<td>' + rama + '</td>' +
                '<td><button type="button" class="btn btn-info btn-sm" id="btnIrDeportistas">Ir a Deportistas</button> <button type="button" class="btn btn-success btn-sm" id="btnExcel">Excel</button></td>' +
                '</tr>';
        });
        $("#DataResult").html(html);
    }

    $(document).on('click', '#btnIrDeportistas', function () {
        var informe = JSON.parse(decodeURIComponent($(this).closest('tr').attr('data-informe')));
        sessionStorage.setItem('informe', JSON.stringify(informe));
        window.location.href = 'deportistas.php';
    });

    // Agrega el comportamiento de búsqueda
    $("#inputBusqueda").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#DataResult tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(document).on('click', '#btnExcel', function () {
        $('.loading').show();
        let EscuelaDatos = JSON.parse(decodeURIComponent($(this).closest('tr').attr('data-informe')));
        METHOD = "POST";
        // Crear un objeto FormData
        let formData = new FormData();

        console.log(EscuelaDatos.cct);
        // Agregar la cadena JSON al objeto FormData
        formData.append('cct', EscuelaDatos.cct);
        formData.append('id_ciclo', EscuelaDatos.id_ciclo);
        formData.append('id_funcion', EscuelaDatos.id_funcion);
        formData.append('id_deporte', EscuelaDatos.id_deporte);
        formData.append('id_rama', EscuelaDatos.id_rama);
        formData.append('usuario', getUsuario());
        formData.append('METHOD', METHOD);

        $.ajax({
            url: baseUrl + "exportExce.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                if (data.length != 0) {
                    var a = $("<a />");
                    a.attr("href", baseUrl + data.file);
                    a.attr("target", "_blank")
                    $("body").append(a);
                    a[0].click();
                    $('.loading').hide();
                } else {
                    $('.loading').hide();
                    Swal.fire({
                        title: 'Lo sentimos',
                        text: 'No se encontró información deseada'
                    });
                    
                }

            },
            error: function (error) {
                $('.loading').hide();
                console.log(error);
                Swal.fire({
                    title: 'Lo sentimos',
                    text: 'Hubo un error al obtener los datos'
                });
                
            }
        });
    });



    $('#deporte').change(function () {
        let key = parseInt($(this).val());
        $(".categoria").css("display", "none");
        $(".peso").css("display", "none");
        $(".prueba").css("display", "none");
        if ($('#funcion').val() == 1) {
            switch (key) {
                case 1:
                    getDeporteCampos('getCategorias.php?id=' + key, 'categoria');
                    break;
                case 2:
                    getDeporteCampos('getPruebas.php?id=' + key, 'prueba');
                    break;
                case 3:
                    getDeporteCampos('getCategorias.php?id=' + key, 'categoria');
                    break;
                case 4:
                    break;
                case 9:
                    getDeporteCampos('getCategorias.php?id=' + key, 'categoria');
                    break;
            }
        }
    });
    
    $('#rama').change(function () {
        let id_usuario = getUsuario();
        let id_deporte = $('#deporte').val();
        let id_rama = $(this).val();
        if (id_deporte == 8 && id_usuario != '' && id_rama != '') {
            getDeporteCampos('getPeso.php?id_deporte=' + id_deporte + '&id_usuario=' + id_usuario + '&id_rama=' + id_rama, 'peso');
        }

    });
    $('#peso').change(function () {
        let id_peso = $(this).val();
        getDeporteCampos('getPesoPruebas.php?id=' + id_peso, 'prueba')
    });


    function getDeporteCampos(url, campo) {
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {
                var datos = JSON.parse(data);
                $("#" + campo).empty();
                $("#" + campo).append('<option value="">Seleccionar...</option>');
                $.each(datos.datos, function (key, dato) {
                    $("#" + campo).append('<option value=' + dato.id + '>' + dato.nombre + '</option>');
                });
                $("." + campo).css("display", "block");
            },
            error: function (error) {
                var error = JSON.parse(error.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.menssage
                });
            }
        });
    }
    $('#btnModalOtro').click(function () {
        let formulario = document.getElementById('formInformes');
        formulario.reset();
        $('#modalSuccess').modal('hide');
    });
    $('#btnRegresar').click(function () {
        $('#modalSuccess').modal('hide');
        window.location.href = "index.php"
    });

    //Llamada de funciones
    getData();

});
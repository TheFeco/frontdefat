$(document).ready(function () {

    // Obtener el objeto informe de la URL y decodificarlo de la cadena JSON
    var informeJson = sessionStorage.getItem('informe');
    var informe = JSON.parse(informeJson);

    var nombreEscuela = informe.escuela.toLowerCase();
    var nombreFuncion = informe.funcion.toLowerCase();

    $('.nombreEscuela').text(nombreEscuela);
    $('.nombreFuncion').text(nombreFuncion);

    var header;

    header += '<tr>' +
        '<td >Escuela</td>' +
        '<td>Ciclo</td>' +
        '<td>Nombre</td>' +
        '<td>Apellidos</td>' +
        '<td>Función</td>';
    if (informe.id_deporte != 0) {
        header += '<td>Deporte</td>' +
            '<td>Rama</td>' +
            '<td>Pruebas</td>';
    }
    header += '<td>Acciones</td>';
    header += '</tr>';
    $('#headerListaDeportistas').html(header);

    function getListaDeportistas() {
        cct = informe.cct;
        id_ciclo = informe.id_ciclo;
        id_funcion = informe.id_funcion;
        id_deporte = informe.id_deporte;
        id_rama = informe.id_rama;
        $('.loading').show();
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
                        '<td>' + informe.funcion + '</td>';
                    if (deporte != "") {
                        html += '<td>' + deporte + '</td>' +
                            '<td>' + rama + '</td>' +
                            '<td>' + informe.array_pruebas + '</td>';
                    }
                    html += '<td><div class="text-center"><div class="btn-group"><button type="button" class="btn btn-danger btnDelete" data-id="' + informe.id + '">Borrar</button></div></div></td>';
                    html += '</tr>';
                });

                $('#ListaDeportistas').html(html);
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

    $(document).on("click", ".btnDelete", function(){
        var id = $(this).data('id');
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar este registro?',
            text: "Esta acción no se puede deshacer",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {
                deleteDeportista(id);
            }
        })
    });
    function deleteDeportista(id){
        METHOD = "DELETE";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        let url = "deleteRegistro.php?id="+id;
        $.ajax({
            url: baseUrl+url,
            type: "POST",
            dataType: "json",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(){
                getListaDeportistas();
            }
        });
    }

    //llamada de funciones 
    getListaDeportistas();
});
$(document).ready(function () {
    function getListaDeportistas() {
        cct = informe.cct;
        id_ciclo = informe.id_ciclo;
        id_funcion = informe.id_funcion;
        id_deporte = informe.id_deporte;
        id_rama = informe.id_rama;
        $('.loading').show();
        let url = "deportistasUpdate.php?id_usuario=" + getUsuario();
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
});
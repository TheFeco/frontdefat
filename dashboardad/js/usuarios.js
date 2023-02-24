$(document).ready(function () {
    function getListaUsuarios() {
        $('.loading').show();
        let url = "usuarios?token=" + getToken();
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {
                var datos = data;
                var html;
                $.each(datos, function (key, usuario) {
                    html += '<tr>' +
                        '<td class="text-center" data-id="'+usuario.id+'">' + usuario.usuario + '</td>' +
                        '<td class="text-center">' + usuario.Estado + '</td>' +
                        '<td class="text-center"><div class="slide-button" ><div class="toggle-button-cover"><div class="button-cover d-flex align-items-center"><div class="button r" id="button-10"><input type="checkbox" class="checkbox" ' + (usuario.Estado == "Activo" ? "" : "checked") + '><div class="knobs"><span>ON</span></div><div class="layer"></div></div><div class="ml-2"><span class="ios-switch-control-description">' + usuario.Estado + '</span></div></div></div></div ></td > ';
                });

                $('#DataResultUsuario').html(html);
                $('.loading').hide();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }

    // Agregar un evento 'change' a los checkboxes
$(document).on('change', '.checkbox', function() {
    var usuario = $(this).closest('tr').find('td:eq(0)').data("id"); // obtener el nombre del usuario
    var estado = $(this).is(':checked') ? "Inactivo" : "Activo"; // obtener el nuevo estado del usuario

    $.ajax({
        url: baseUrl + "cambiarEstadoUsuario",
        type: "POST",
        data: {
            token: getToken(),
            usuario: usuario,
            METHOD : "PUT",
            estado: estado
        },
        success: function(data) {
            // manejar la respuesta exitosa
            console.log(data)
        },
        error: function(xhr, status, error) {
            // manejar el error
        }
    });
});

    //llamada de metodos
    getListaUsuarios();
});
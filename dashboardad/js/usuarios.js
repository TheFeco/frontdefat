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
                        '<td class="text-center" data-id="' + usuario.id + '">' + usuario.usuario + '</td>' +
                        '<td class="text-center"><div class="slide-button" ><div class="toggle-button-cover"><div class="button-cover d-flex align-items-center"><div class="button r" id="button-10"><input type="checkbox" class="checkbox" ' + (usuario.Estado == "Activo" ? "" : "checked") + '><div class="knobs"><span>ON</span></div><div class="layer"></div></div><div class="ml-2"><span class="ios-switch-control-description">' + usuario.Estado + '</span></div></div></div></div ></td >' +
                        '<td class="text-center"><div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-primary btn-editar" data-id="' + usuario.id + '">Editar</button><button type="button" class="btn btn-success btn-reset" data-id="' + usuario.id + '" data-toggle="modal" data-target="#resetPassword">Cambiar Contraseña</button><button type="button" class="btn btn-danger btn-eliminar" data-id="' + usuario.id + '">Eliminar</button></div></td>';
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
    $(document).on('change', '.checkbox', function () {
        var usuario = $(this).closest('tr').find('td:eq(0)').data("id"); // obtener el nombre del usuario
        var estado = $(this).is(':checked') ? "Inactivo" : "Activo"; // obtener el nuevo estado del usuario

        $.ajax({
            url: baseUrl + "cambiarEstadoUsuario",
            type: "POST",
            data: {
                token: getToken(),
                usuario: usuario,
                METHOD: "PUT",
                estado: estado
            },
            success: function (data) {
                // manejar la respuesta exitosa
                console.log(data)
            },
            error: function (xhr, status, error) {
                // manejar el error
            }
        });
    });

    // Agregar el evento click a los botones "Editar" y "Eliminar"
    $(document).on("click", ".btn-editar", function(){
        let id = $(this).data('id');
        window.location.href = 'usuarioEditar.php?id=' + id;
    });

    $(document).on("click", ".btn-eliminar", function(){
        let id = $(this).data('id');
        console.log("elimino");
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar este usuario?',
            text: "Esta acción no se puede deshacer",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {
                deleteUsuario(id);
            }
        })
    });

    function deleteUsuario(id){
        METHOD = "DELETE";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        formData.append('id',id);
        formData.append('token', getToken());
        let url = "usuarios.php?id="+id;
        $.ajax({
            url: baseUrl+url,
            type: "POST",
            dataType: "json",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(){
                getListaUsuarios();
            }
        });
    }

    $('#newPassword').click(function (e) {
        e.preventDefault();
        var password = $('#nvoPassword').val();
        var id = $('#idUsuario').val();
        if (!password || password.trim().length === 0) {
            Swal.fire('Error', 'Por favor ingrese una contraseña', 'error');
            return;
        }

        nuevoPassword(id, password);

    });

    function nuevoPassword(id, password) {
        $('.loading').show();
        METHOD = "PUT";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        formData.append('token', getToken());
        formData.append('id', id);
        formData.append('password', password);
        let url = "cambiarPasswordUsuario";
        $.ajax({
            url: baseUrl + url,
            type: "POST",
            dataType: "json",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);

                $('#modelId').modal('hide');
                getListaCiclos();
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
    $(document).on("click", ".btn-reset", function(){
        let idUsuario = $(this).data('id');
        $('#idUsuario').val(idUsuario);
    });

    $('#nvoUsuario').click(function () {
        window.location.replace("usuarioNuevo.php");
    });

    //llamada de metodos
    getListaUsuarios();
});
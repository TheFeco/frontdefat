$(document).ready(function() {

    function getUsuarios() {

        $('.loading').show();

        var idUsuario = getParam('id');;
        let url = "usuarios.php?id=" + idUsuario + "&token=" + getToken();

        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {
                var datos = data;

                $('#id').val(datos[0].id);
                $('#usuario').val(datos[0].usuario);
                $('#rol').val(datos[0].id_rol);
                $('#nivel').val(datos[0].id_nivel);
                $('.loading').hide();
            },
            error: function (xhr, status, error) {
                $('.loading').hide();
                var errorMessage = 'Ocurrió un error';
                if (xhr.responseText) {
                    var errorData = JSON.parse(xhr.responseText);
                    errorMessage = errorData.result.error_msg;
                }
                Swal.fire('Error', errorMessage, 'error');
            }
        });
    }


    // Validar el formulario cuando se envía
    $('#formEditarUsuario').submit(function(event) {
        event.preventDefault(); // Prevenir que se envíe el formulario de forma normal

        // Obtener los valores de los campos de entrada
        var id = $('#id').val();
        var usuario = $('#usuario').val();
        var password = "";
        var rol = $('#rol').val();
        var nivel = $('#nivel').val();
        var method ="PUT";
        // Validar los campos de entrada
        if (!usuario || usuario.trim().length === 0) {
            Swal.fire('Error', 'Por favor ingrese un usuario', 'error');
            return;
        }
        
        if (!rol || rol.trim().length === 0) {
            Swal.fire('Error', 'Por favor seleccione un rol', 'error');
            return;
        }

        if (!nivel || nivel.trim().length === 0) {
            Swal.fire('Error', 'Por favor seleccione un nivel', 'error');
            return;
        }

        // Enviar el formulario utilizando AJAX
        $.ajax({
            url: baseUrl + "usuarios.php",
            type: 'POST',
            data: {
                id: id,
                usuario: usuario,
                password: password,
                rol: rol,
                nivel: nivel,
                token: getToken(),
                METHOD: method
            },
            success: function(response) {
                Swal.fire('Éxito', 'Registro exitoso', 'success');
                window.location.replace("usuarios.php");
            },
            error: function(xhr, status, error) {
                var errorMessage = 'Ocurrió un error al enviar el formulario';
                if (xhr.responseText) {
                    var errorData = JSON.parse(xhr.responseText);
                    errorMessage = errorData.result.error_msg;
                }
                Swal.fire('Error', errorMessage, 'error');
            }
        });
    });

    function getParam(param) {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
      }

    $(document).on("click", "#regresar", function(){
        window.location.replace("usuarios.php");
    });

    getUsuarios();
});
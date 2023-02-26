$(document).ready(function() {
    // Validar el formulario cuando se envía
    $('#formNvoUsuario').submit(function(event) {
        event.preventDefault(); // Prevenir que se envíe el formulario de forma normal

        // Obtener los valores de los campos de entrada
        var usuario = $('#usuario').val();
        var password = $('#password').val();
        var repeatPassword = $('#repeat_password').val();
        var rol = $('#rol').val();
        var nivel = $('#nivel').val();
        var method ="POST";

        // Validar los campos de entrada
        if (!usuario || usuario.trim().length === 0) {
            Swal.fire('Error', 'Por favor ingrese un usuario', 'error');
            return;
        }

        if (!password || password.trim().length === 0) {
            Swal.fire('Error', 'Por favor ingrese una contraseña', 'error');
            return;
        }

        if (password !== repeatPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
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
                usuario: usuario,
                password: password,
                rol: rol,
                nivel: nivel,
                token: getToken(),
                METHOD: method
            },
            success: function(response) {
                Swal.fire('Éxito', 'Registro exitoso', 'success');
                $('#formNvoUsuario')[0].reset(); // Limpiar el formulario
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
});
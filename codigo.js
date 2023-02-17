// Incluye el archivo de configuración
document.write('<script src="config.js"></script>');

$(document).ready(function () {
    if (localStorage.getItem("s_storage") != null) {
        var token = getToken();

        // Realiza una solicitud AJAX para validar el token
        $.ajax({
            url: baseUrl + "validar_token.php",
            type: "POST",
            data: { token: token },
            success: function(data) {
                // Si el token es válido, redirige al usuario a la página correspondiente
                var newObject = JSON.parse(localStorage.getItem("s_storage"));
                if (newObject[0].id_rol != 1) {
                    window.location.href = "dashboard/index.php";
                } else {
                    window.location.href = "dashboardad/index.php";
                }
            },
            error: function() {
                // Si el token no es válido, elimina el almacenamiento local y redirige al usuario a la página de inicio de sesión
                localStorage.removeItem("s_storage");
                window.location.href = "/";
            }
        });
    }
});
//


$('#formLogin').submit(function(e){
    e.preventDefault();
    var usuario = $.trim($("#usuario").val());    
    var password =$.trim($("#password").val());
    var url = "";
    
    if(usuario.length == "" || password == ""){
      Swal.fire({
          type:'warning',
          title:'Debe ingresar un usuario y/o password',
      });
      return false; 
    }else{
        // Crea un objeto JSON con los valores de usuario y contraseña
        var datos = {usuario: usuario, password: password};

        $.ajax({
           url:baseUrl+"login",
           type:"POST",
           datatype: "json",
           data: datos, 
           success:function(data){ 
               if(data == "null"){
                   Swal.fire({
                       type:'error',
                       title:'Usuario y/o password incorrecta',
                   });
               }else{
                   // Convierte los datos devueltos a un objeto JSON
                   var usuarioObj = JSON.parse(data);
                    console.log(usuarioObj.Estado );
                   // Verifica si el usuario está activo
                   if (usuarioObj.Estado != 'Activo') {
                       Swal.fire({
                           type:'error',
                           title:'El usuario no tiene permiso para entrar',
                       });
                       return;
                   }
                   // Crea un objeto con los datos del usuario que se van a almacenar en el localStorage
                    var usuarioStorage = {
                        id: usuarioObj.id,
                        usuario: usuarioObj.usuario,
                        id_nivel: usuarioObj.id_nivel,
                        id_rol: usuarioObj.id_rol,
                        token: usuarioObj.token
                    };
                   // Almacena los datos del usuario en la memoria local
                   var usuarioStr = JSON.stringify(usuarioStorage);
                   miStorage.setItem('s_storage', usuarioStr);

                   // Redirecciona al usuario al panel de control o al área de administrador
                   if(getRol() != 1){
                       url = "dashboard/index.php";
                   }else{
                       url = "dashboardad/index.php";
                   }

                   // Muestra un mensaje de éxito y redirecciona al usuario
                   Swal.fire({
                       type:'success',
                       title:'¡Conexión exitosa!',
                       confirmButtonColor:'#3085d6',
                       confirmButtonText:'Ingresar'
                   }).then((result) => {
                       if(result.value){
                           window.location.href = url;
                       }
                   })
               }
           }    
        });
    }     
});

// Incluye el archivo de configuración
document.write('<script src="config.js"></script>');

const DASHBOARD_URL = "dashboard/";
const DASHBOARD_AD_URL = "dashboardad/";


function redirigirADashboard() {
  // Redirigir al usuario al dashboard correspondiente según su rol
  
  if (getRol() != 1) {
    window.location.href = DASHBOARD_URL;
  } else {
    window.location.href = DASHBOARD_AD_URL;
  }
}

$(document).ready(function () {
    if (localStorage.getItem("s_storage") != null) {
        // Si s_storage existe en el almacenamiento local, redirigir al usuario al dashboard correspondiente
        redirigirADashboard();
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
           url:baseUrl+"login.php",
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

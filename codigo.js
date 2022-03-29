$(document).ready(function(){
    if (localStorage.getItem("s_storage") != null) {
        let newObject = JSON.parse(window.localStorage.getItem("s_storage"));
        if(newObject[0].id_rol !=1){
            // window.location.href = "vistas/pag_inicio.php";
            window.location.href = "dashboard/index.php";
        }else{
            window.location.href = "dashboard/indexAdmin.php";
        }
      }
});
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
        $.ajax({
           url:baseUrl+"login.php",
           type:"POST",
           datatype: "json",
           data: {usuario:usuario, password:password}, 
           success:function(data){           
               if(data == "null"){
                   Swal.fire({
                       type:'error',
                       title:'Usuario y/o password incorrecta',
                   });
               }else{
                   miStorage.setItem('s_storage', data);
                   if(getRol() != 1){
                    url = "dashboard/index.php";
                   }else{
                    url = "dashboard/indexAdmin.php";
                   }
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
$(document).ready(function(){
    function getData(){
        let url = "deportistas";
        $.ajax({
            url:baseUrl+url,
            type:"GET",
            datatype: "json", 
            success:function(data){
                
                var datos = JSON.parse(data);
                console.log(datos);
                // if(datos.registros.length > 0){
                //     llenaTablaInformes(datos.registros);
                    
                // }                
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }   
         });
    } 
});
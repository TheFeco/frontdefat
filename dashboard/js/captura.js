// Incluye el archivo de configuración
document.write('<script src="../../../config.js"></script>');

function getData(){
    let url = (getRol() != 1) ? "funciones.php?id="+getUsuario(): "funciones.php";
    $.ajax({
        url:baseUrl+url,
        type:"GET",
        datatype: "json", 
        success:function(data){
            
            var datos = JSON.parse(data);
            $.each(datos.funciones,function(key, funcion) {
                $("#funcion").append('<option value='+funcion.id+'>'+funcion.nombre+'</option>');
            });
            $.each(datos.ciclos,function(key, ciclo) {
                $("#ciclo").append('<option value='+ciclo.id+'>'+ciclo.nombre+'</option>');
            });
            $.each(datos.cct,function(key, cct) {
                $("#cct").append('<option value='+cct.id+'>'+cct.nombre+'</option>');
            });
            $.each(datos.escuela,function(key, cct) {
                $("#escuela").append('<option value='+escuela.id+'>'+escuela.nombre+'</option>');
            });
            $.each(datos.turno,function(key, turno) {
                $("#turno").append('<option value='+turno.id+'>'+turno.nombre+'</option>');
            });
            $.each(datos.municipios,function(key, municipio) {
                $("#municipio").append('<option value='+municipio.id+'>'+municipio.nombre+'</option>');
            });
            $.each(datos.zona,function(key, zona) {
                $("#zona").append('<option value='+zona.id+'>'+zona.nombre+'</option>');
            });
            $.each(datos.deportes,function(key, deporte) {
                $("#deporte").append('<option value='+deporte.id+'>'+deporte.nombre+'</option>');
            });
            $.each(datos.ramas,function(key, rama) {
                $("#rama").append('<option value='+rama.id+'>'+rama.nombre+'</option>');
            });
            if(datos.registros.length > 0){
                llenaTablaInformes(datos.registros);
                
            }                
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
// submit
$("#formInformes").submit(function(e){
    e.preventDefault();
    array1 = [1 ,2, 4 ];
    array2 = [1, 2]; 
    var nombre  = $.trim($("#formInformes #nombre").val());
    curp        = $.trim($("#formInformes #curp").val());
    apellidos   = $.trim($("#formInformes #apellidos").val());
    ciclo       = parseInt($("#formInformes #ciclo").val());
    escuela     = $.trim($("#formInformes #escuela").val());
    funcion     = parseInt($("#formInformes #funcion").val());
    deporte     = parseInt($("#deporte").val());
    rama        = parseInt($("#rama").val());
    categoria   = parseInt($("#categoria").val());
    peso        = parseInt($("#peso").val());
    prueba      = parseInt($("#prueba").val());
    archivo     = $("#formInformes #archivo").val();
    METHOD = "POST";

    if (!funcion) {
        $('#formInformes #funcion').addClass('is-invalid');
     } else {
        $('#formInformes #funcion').removeClass('is-invalid');
    }
    if (!nombre) {
        $('#formInformes #nombre').addClass('is-invalid');
     } else {
        $('#formInformes input#nombre').removeClass('is-invalid');
    }
    if (!curp) {
        $('#formInformes #curp').addClass('is-invalid');
     } else {
        $('#formInformes input#curp').removeClass('is-invalid');
    }
    if (!apellidos) {
        $('#formInformes #apellidos').addClass('is-invalid');
     } else {
        $('#formInformes #apellidos').removeClass('is-invalid');
    }
    if (!ciclo) {
        $('#formInformes #ciclo').addClass('is-invalid');
     } else {
        $('#formInformes #ciclo').removeClass('is-invalid');
    }
    if (!escuela) {
        $('#formInformes #escuela').addClass('is-invalid');
     } else {
        $('#formInformes #escuela').removeClass('is-invalid');
    }

    if( $.inArray( funcion, array1 ) != -1){
        if (!deporte) {
            $('#deporte').addClass('is-invalid');
         } else {
            $('#deporte').removeClass('is-invalid');
        }
        if( $.inArray( funcion, array2 ) != -1){
            if (!rama) {
                $('#rama').addClass('is-invalid');
             } else {
                $('#rama').removeClass('is-invalid');
            }
            if(funcion == 1){
                switch (deporte) {
                    case 1:
                        if (!categoria) {
                            $('#categoria').addClass('is-invalid');
                         } else {
                            $('#categoria').removeClass('is-invalid');
                        }
                        break;
                    case 2:
                        if (!prueba) {
                            $('#prueba').addClass('is-invalid');
                         } else {
                            $('#prueba').removeClass('is-invalid');
                        }
                        break;
                    case 3:
                        if (!categoria) {
                            $('#cateogira').addClass('is-invalid');
                         } else {
                            $('#cateogira').removeClass('is-invalid');
                        }
                        break;
                    case 8:
                        if (!peso) {
                            $('#peso').addClass('is-invalid');
                         } else {
                            $('#peso').removeClass('is-invalid');
                        }
                        if (!prueba) {
                            $('#prueba').addClass('is-invalid');
                         } else {
                            $('#prueba').removeClass('is-invalid');
                        }
                        break;
                    case 9:
                        if (!categoria) {
                            $('#cateogira').addClass('is-invalid');
                         } else {
                            $('#cateogira').removeClass('is-invalid');
                        };
                        break;
                }
            }
        }
    }  
    if(!archivo){
        $("#formInformes #archivo").addClass('is-invalid');
    }else{
        $('#formInformes #archivo').removeClass('is-invalid');
        
    }
    if ($('#cct').inputmask('isComplete')) {
        $('#cct').removeClass('is-invalid');
    }else{
        $('#cct').addClass('is-invalid');
    }
    if(curpValida(curp.toUpperCase())){
        $('#curp').removeClass('is-invalid');
    }else{
        $('#curp').addClass('is-invalid');
    }
    usuario     = getUsuario();
    nivel = getNivel();
    formData = new FormData(this);
    formData.append('usuario', usuario);
    formData.append('nivel', nivel);
    formData.append('METHOD', 'POST');
    if(validar()){ 
        $.ajax({
            url: baseUrl+"storeRegistro.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                var datos = data;
                $("#modalSuccess").modal('show');            
                      
            },
            error: function(data) {
                var error = data;
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al obtener los datos'
                });
            }        
        });
        
    } 
    
});
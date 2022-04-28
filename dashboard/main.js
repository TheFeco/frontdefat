//variables 
var fila; //capturar la fila para editar o borrar el registro
var ciclo;
var periodos;
$(document).ready(function(){
    if (localStorage.getItem("s_storage") === null) {
        window.location.href = "../index.php";
      }

     getData();
    tablaPersonas = $("#tablaPersonas").DataTable({
       "columnDefs":[{
        "targets": -1,
        "data":null,
       }],
        
    "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
        
    });

    
    $('.usuarioNombre').text(getUsuarioNombre());
    $( 'textarea.editor' ).ckeditor();
    

    $("#btnNuevo").click(function(){
        window.location.href ="captura.php"
    });

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

$("#formComentarios").submit(function(e){
    e.preventDefault();    
    comentario  = $.trim($("#formComentarios #comentario").val());
    id  = $.trim($("#formComentarios #id").val());
    fila = $(this);
    usuario = getUsuario();
    opcion = 1;
    METHOD = "POST";
    if (!comentario) {
        $('#formComentarios #comentario').addClass('is-invalid');
     } else {
        $('#formComentarios #comentario').removeClass('is-invalid');
    }

    if(validar()){ 
        $.ajax({
            url: "bd/funcionesAdmin.php",
            type: "POST",
            dataType: "JSON",
            data: {METHOD:METHOD, id:id, opcion:opcion, usuario:usuario, comentario:comentario},
            success: function(data){
                var datos = data;
                $("#modalComentarios").modal("hide");
                llenaTablaInformes(datos.informes,getRol());       
            },
            error: function(data) {
                var error = JSON.parse(data);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.menssage
                });
            }        
        });
        
    } 
    
});

    $('#logout').click(function(e){
        e.preventDefault();
        $.ajax({
            url:baseUrl+"logout.php",
            type:"GET",
            datatype: "json", 
            success:function(data){
                localStorage.removeItem('s_storage')
                window.location.href = "../index.php";
            }    
        });     
    });

    $(document).on("click", ".btnVer", function(){
        id_ciclo = $(this).data('id_ciclo');
        id_funcion = $(this).data('id_funcion');
        id_deporte = $(this).data('id_deporte');
        id_rama = $(this).data('id_rama');
        $(".bd-example-modal-lg").modal("show");
        let url = "getDeportistas.php?id_usuario="+getUsuario()+"&id_ciclo="+id_ciclo+"&id_funcion="+id_funcion+'&id_deporte='+id_deporte+'&id_rama='+id_rama;
        $.ajax({
            url:baseUrl+url,
            type:"GET",
            datatype: "json", 
            success:function(data){
                var datos = JSON.parse(data);
                var html;
                $.each(datos.registros,function(key, informe) {
                    var deporte = (informe.deporte == null) ? "" : informe.deporte;
                    var rama = (informe.rama == null) ? "" : informe.rama;
                    html += '<tr>' +
                    '<td >' + informe.escuela + '</td>' +
                    '<td>' + informe.ciclo + '</td>' +
                    '<td>' + informe.nombre + '</td>' +
                    '<td>' + informe.apellidos + '</td>' +
                    '<td>' + informe.funcion + '</td>' +
                    '<td>' + deporte + '</td>' +
                    '<td>' + rama + '</td>'+
                    '<td>' + informe.array_pruebas + '</td>';
                    html += '</tr>';
                });
                $('#DataDeportistas').html(html);
            },
            error: function() {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }   
         });
    });

    // funciones
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

    function llenaTablaInformes(data){
        var html;
    
        $.each(data,function(key, informe) {
            var deporte = (informe.deporte == null) ? "" : informe.deporte;
            var rama = (informe.rama == null) ? "" : informe.rama;
            html += '<tr>' +
            '<td >' + informe.escuela + '</td>' +
            '<td>' + informe.ciclo + '</td>' +
            '<td>' + informe.funcion + '</td>' +
            '<td>' + deporte + '</td>' +
            '<td>' + rama + '</td>';
            html += '<td><div class="text-center"><div class="btn-group"><button type="button" class="btn btn-info btnVer" data-id_ciclo="'+informe.id_ciclo+'"  data-id_funcion="'+informe.id_funcion+'"  data-id_deporte="'+informe.id_deporte+'" data-id_rama="'+informe.id_rama+'">VER</button></div></div></td>';
            html += '</tr>';
        });
        $('#DataResult').html(html);
    }

    function validar(){
        var hasError =true
        $('#formInformes input, #formInformes select').each(function (){
            var input = $(this);
            if(input.hasClass('is-invalid')){
                hasError = false;
            }

        });
         return hasError;
    }

    $('#deporte').change(function(){
        let key = parseInt($(this).val());
        $(".categoria").css("display", "none");
        $(".peso").css("display", "none");
        $(".prueba").css("display", "none");
        if($('#funcion').val() == 1)
        {
            switch (key) {
                case 1:
                    getDeporteCampos('getCategorias.php?id='+key,'categoria');
                    break;
                case 2:
                    getDeporteCampos('getPruebas.php?id='+key,'prueba');
                    break;
                case 3:
                    getDeporteCampos('getCategorias.php?id='+key,'categoria');
                    break;
                case 4:
                    break;
                case 9:
                    getDeporteCampos('getCategorias.php?id='+key,'categoria');
                    break;
            }
        }
    });
    $('#funcion').change(function(){
        let key = parseInt($(this).val());
        $(".deporte").css("display", "none");
        $(".rama").css("display", "none");
        $(".categoria").css("display", "none");
        $(".peso").css("display", "none");
        $(".prueba").css("display", "none");
        switch (key) {
            case 1:
                $(".deporte").css("display", "block");
                $(".rama").css("display", "block");
            case 2:
                $(".deporte").css("display", "block");
                $(".rama").css("display", "block");
                break;
             case 4:
                $(".deporte").css("display", "block");
                break;
            case 6:
                $(".deporte").css("display", "block");
                break;
        }
    });
    $('#rama').change(function(){
        let id_usuario = getUsuario();
        let id_deporte = $('#deporte').val();
        let id_rama = $(this).val();
        if(id_deporte == 8 && id_usuario != '' && id_rama != ''){
            getDeporteCampos('getPeso.php?id_deporte='+id_deporte+'&id_usuario='+id_usuario+'&id_rama='+id_rama, 'peso');
        }
        
    });
    $('#peso').change(function(){
        let id_peso = $(this).val();
        getDeporteCampos('getPesoPruebas.php?id='+id_peso, 'prueba')
    });


    function getDeporteCampos(url,campo){
        $.ajax({
            url:baseUrl+url,
            type:"GET",
            datatype: "json", 
            success:function(data){
                var datos = JSON.parse(data);
                $("#"+campo).empty();
                $("#"+campo).append('<option value="">Seleccionar...</option>');
                $.each(datos.datos,function(key, dato) {
                    $("#"+campo).append('<option value='+dato.id+'>'+dato.nombre+'</option>');
                });
                $("."+campo).css("display", "block");
            },
            error: function(error) {
                var error = JSON.parse(error.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.menssage
                });
            }   
        });
    }
    $('#btnModalOtro').click(function(){
        let formulario = document.getElementById('formInformes');
        formulario.reset();
        $('#modalSuccess').modal('hide');
    });
    $('#btnRegresar').click(function(){
        $('#modalSuccess').modal('hide');
        window.location.href ="index.php"
    });

    //Validador de curp
    function curpValida(curp) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);
        
        if (!validado)  //Coincide con el formato general?
        
            return false;
        
        //Validar que coincida el dígito verificador
        function digitoVerificador(curp17) {
            //Fuente https://consultas.curp.gob.mx/CurpSP/
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma= lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if(lngDigito == 10)
                return 0;
            return lngDigito;
        }
        if (validado[2] != digitoVerificador(validado[1])) 
            return false;
            
        return true; //Validado
    }

    $('#curp').change( function(){
        $('#curp').val($('#curp').val().toUpperCase());
        var curp = $('#curp').val();
        //Valdiamos la curp si esta escrita bien por renapo
        if(curp.length != 18) return;
        if (curpValida(curp)) {
            $(this).removeClass('is-invalid');
        } else {
            // resultado.classList.remove("ok");
            $(this).addClass('is-invalid');
            //Muesta mensaje si la curp esta escrita mal
            Swal.fire({
                title: "Lo sentimos",
                text: "La curp proporcionada es erronea favor de consultarla",
                icon: "warning",
                button: "salir",
            });
        }
    });
    $('#cct').inputmask("25AAA9999A");
    $('#cct').change( function(){
        //Valdiamos la curp si esta escrita bien por renapo
        if ($('#cct').inputmask('isComplete')) {
            $(this).removeClass('is-invalid');
        } else {
            // resultado.classList.remove("ok");
            $(this).addClass('is-invalid');
            //Muesta mensaje si la curp esta escrita mal
            Swal.fire({
                title: "Lo sentimos",
                text: "La clave de centro de trabajo proporcionada es erronea favor de consultarla",
                icon: "warning",
                button: "salir",
            });
        }
    });
});
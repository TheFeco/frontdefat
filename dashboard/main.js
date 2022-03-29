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
        $("#formInformes").trigger("reset");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Capturar Informe");     
        $("#modalInforme").modal("show");     
        id=null;
        opcion = 4; //alta informe
    });

//botón BORRAR con modal
$(document).on("click", ".btnBorrar", function(){    
    fila = $(this);
    id = parseInt($(this).closest("tr").find('td:eq(0)').attr('id'));
    usuario     = getUsuario();
    METHOD = 'DELETE' //borrar
    Swal.fire({
        title: '¿Estas seguro?'+id,
        text: "¡No podrás revertir esto!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, elimínalo!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "bd/funciones.php",
                type: "POST",
                dataType: "json",
                data: {METHOD:METHOD, id:id, usuario:usuario},
                success: function(data){
                    var datos = data;
                    llenaTablaInformes(datos.informes, getRol());
                }
            });
        }
    });  
});

//botón Comentario
$(document).on("click", ".btnVer", function(){
    comentario = $(this).data('comentario');
    $("#modalComentario #comentario").html(comentario);
    $("#modalComentario .modal-header").addClass("bg-azul");
    $("#modalComentario .modal-header").css("color", "white");
    $("#modalComentario .modal-title").text("Comentarios");            
    $("#modalComentario").modal("show");
});
//botón Comentar
$(document).on("click", ".btnComentar", function(){
    comentario = $(this).data('comentario');
    id = parseInt($(this).closest("tr").find('td:eq(0)').attr('id'));
    $("#modalComentarios .editor").val(comentario);
    $("#modalComentarios #id").val(id);
    $("#modalComentarios .modal-header").addClass("bg-azul");
    $("#modalComentarios .modal-header").css("color", "white");
    $("#modalComentarios .modal-title").text("Comentarios");            
    $("#modalComentarios").modal("show");
});
// submit
$("#formInformes").submit(function(e){
    e.preventDefault();    
    var nombre  = $.trim($("#formInformes #nombre").val());
    apellidos   = $.trim($("#formInformes #apellidos").val());
    ciclo       = $("#formInformes #ciclo").val();
    periodo     = $("#formInformes #periodo").val();
    archivo     = $("#formInformes #archivo").val();
    METHOD = "POST";
    if (!nombre) {
        $('#formInformes #nombre').addClass('is-invalid');
     } else {
        $('#formInformes input#nombre').removeClass('is-invalid');
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
    if (!periodo) {
        $('#formInformes #periodo').addClass('is-invalid');
     } else {
        $('#formInformes #periodo').removeClass('is-invalid');
    }    
    if(!archivo){
        $("#formInformes #archivo").addClass('is-invalid');
    }else{
        $('#formInformes #archivo').removeClass('is-invalid');
        
    }
    usuario     = getUsuario();
    formData = new FormData(this);
    formData.append('usuario', usuario);
    formData.append('METHOD', 'POST');
    if(validar()){ 
        $.ajax({
            url: "bd/funciones.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                var datos = data;
                $("#modalInforme").modal("hide");
                let formulario = document.getElementById('formInformes');
                formulario.reset();
                llenaTablaInformes(datos.informes);       
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
                $.each(datos.deportes,function(key, deporte) {
                    $("#deporte").append('<option value='+deporte.id+'>'+deporte.nombre+'</option>');
                });
                $.each(datos.ramas,function(key, rama) {
                    $("#rama").append('<option value='+rama.id+'>'+rama.nombre+'</option>');
                });
                //llenaTablaInformes(datos.informes,getRol());
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

    function llenaTablaInformes(data, rol){
        var html;
        if(rol != 1){
            $.each(data,function(key, informe) {
                html += '<tr>' +
                '<td class = "d-none" id="'+informe.id+'">' + informe.id + '</td>' +
                '<td>' + informe.nombre_rte +' '+ informe.apellido_rte + '</td>' +
                '<td>' + informe.ciclo + '</td>' +
                '<td>' + informe.periodo + '</td>' +
                '<td class="text-center"><a href="../../' + informe.archivo + '" download>Descargar</a></td>' +
                '<td>' + informe.create_at + '</td>';
                if(informe.comentario != null){ 
                    html += '<td><div class="text-center"><div class="btn-group"><button class="btn btn-primary btnVer" data-comentario="'+informe.comentario+'">Nota</button><button class="btn btn-primary btnComentar user">Comentar</button><button class="btn btn-danger btnBorrar">Borrar</button></div></div></td>';   
                }else{
                    html += '<td><div class="text-center"><div class="btn-group"><button class="btn btn-primary btnEditar user">Editar</button><button class="btn btn-primary btnComentar user">Comentar</button><button class="btn btn-danger btnBorrar">Borrar</button></div></div></td>';
                }
                html += '</tr>';
            });
        }else{
            $.each(data,function(key, informe) {
                html += '<tr>' +
                '<td class = "d-none" id="'+informe.id+'">' + informe.id + '</td>' +
                '<td >' + informe.cct + '</td>' +
                '<td>' + informe.nombre_rte +' '+ informe.apellido_rte + '</td>' +
                '<td>' + informe.ciclo + '</td>' +
                '<td>' + informe.periodo + '</td>' +
                '<td class="text-center"><a href="../../' + informe.archivo + '" download>Descargar</a></td>' +
                '<td>' + informe.create_at + '</td>';
                html += '<td><div class="text-center"><div class="btn-group"><button class="btn btn-primary btnComentar" data-comentario="'+informe.comentario+'">Comentar</button><button class="btn btn-danger btnBorrar">Borrar</button></div></div></td>';
                html += '</tr>';
            });
        }
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
        $(".categoria").css("display", "none").val("");
        $(".peso").css("display", "none").val("");
        $(".prueba").css("display", "none").val("");
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
             case 8:
                getDeporteCampos('getPeso.php?id='+key,'peso');
                getDeporteCampos('getPruebas.php?id='+key,'prueba');
                break;
             case 9:
                getDeporteCampos('getCategorias.php?id='+key,'categoria');
                break;
        }
    });

    $("#modalInforme").on('hide.bs.modal', function () {
        //actions you want to perform after modal is closed.
        $(".categoria").css("display", "none").val("");
        $(".peso").css("display", "none").val("");
        $(".prueba").css("display", "none").val("");
    });

    function getDeporteCampos(url,campo){
        $.ajax({
            url:baseUrl+url,
            type:"GET",
            datatype: "json", 
            success:function(data){
                var datos = JSON.parse(data);
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
    
});
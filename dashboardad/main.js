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


// submit
$("#formBuscarDeportistas").submit(function(e){
    e.preventDefault();
    METHOD = "POST";
    formData = new FormData(this);
    formData.append('METHOD', 'POST');
    if(validar()){ 
        $.ajax({
            url: baseUrl+"getAdminData.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                var datos = data;
                // let formulario = document.getElementById('formBuscarDeportistas');
                // formulario.reset();
                if(datos.data.length != 0){
                    llenaTablaInformes(datos.data);
                }else{
                    $('#tablaPersonas tbody').empty();
                }
                      
            },
            error: function(data) {
                var error = data;
                console.log(error);
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
        $.ajax({
            url:baseUrl+"getAdminData.php?rol="+getRol(),
            type:"GET",
            datatype: "json", 
            success:function(data){
                var datos = JSON.parse(data);
                $.each(datos.usuarios,function(key, usuario) {
                    $("#usuario").append('<option value='+usuario.id+'>'+usuario.nombre+'</option>');
                });
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

    function llenaTablaInformes(data){
        var html;
        $.each(data,function(key, informe) {
            var deprote = (informe.deporte == null) ? "" : informe.deporte;
            html += '<tr>' +
            '<td class = "d-none" id="'+informe.id+'">' + informe.id + '</td>' +
            '<td >' + informe.escuela + '</td>' +
            '<td>' + informe.ciclo + '</td>' +
            '<td>' + informe.turno + '</td>' +
            '<td>' + informe.funcion + '</td>' +
            '<td>' + deprote + '</td>' +
            '<td>' + informe.rama + '</td>';
            // html += '<td><div class="text-center"><div class="btn-group"><button class="btn btn-primary btnComentar" data-comentario="'+informe.comentario+'">Comentar</button><button class="btn btn-danger btnBorrar">Borrar</button></div></div></td>';
            html += '</tr>';
        });
        $('#DataResult').html(html);
    }

    function validar(){
        var hasError =true
        $('#formBuscarDeportistas input, #formBuscarDeportistas select').each(function (){
            var input = $(this);
            if(input.val() == "" && input.hasClass("requerido")){

                input.addClass('is-invalid');
            }

        });
        var numItems = $('.is-invalid').length
        if(numItems != 0){
            hasError = false;
        }
         return hasError;
    }
    $('#funcion').change(function(){
        $("deporte").val("");
        $("#rama").val("");
        $(".categoria").css("display", "none");
        $("#categoria").val("");
        $(".peso").css("display", "none");
        $("#peso").val("");
        $(".prueba").css("display", "none");
        $("#prueba").val("");
    });

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
                // getDeporteCampos('getPeso.php?id_deporte='+key,'peso');
                break;
             case 9:
                getDeporteCampos('getCategorias.php?id='+key,'categoria');
                break;
        }
    });
    $('#rama').change(function(){
        let id_usuario = $('#usuario').val();
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

    $('#formBuscarDeportistas select').each(function (){
        var input = $(this);
        if(input.val() != "" && input.hasClass("is-invalid")){

            input.removeClass('is-invalid');
        }

    });

    $('#formBuscarDeportistas select').change(function() { 
        if($(this).hasClass('is-invalid') && $(this).val() != ""){
            $(this).removeClass("is-invalid");
        }
   });

    function getDeporteCampos(url,campo){
        $.ajax({
            url:baseUrl+url,
            type:"GET",
            datatype: "json", 
            success:function(data){
                $("#"+campo).empty();
                $("#"+campo).append('<option value="">Seleccionar...</option>');
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
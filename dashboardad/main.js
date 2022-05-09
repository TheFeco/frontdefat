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
            var rama = (informe.rama == null) ? "" : informe.rama;
            html += '<tr>' +
            '<td class = "d-none" id="'+informe.id+'">' + informe.id + '</td>' +
            '<td >' + informe.escuela + '</td>' +
            '<td>' + informe.ciclo + '</td>' +
            '<td>' + informe.turno + '</td>' +
            '<td>' + informe.funcion + '</td>' +
            '<td>' + deprote + '</td>' +
            '<td>' + rama + '</td>';
            html += '<td> <div class="row">';
            html += '<div class="text-center col-xs-4" title="Ver registros"><div class="btn-group"><button type="button" class="btn btn-info btnVer" data-cct="'+informe.cct+'" data-id_ciclo="'+informe.id_ciclo+'"  data-id_funcion="'+informe.id_funcion+'"  data-id_deporte="'+informe.id_deporte+'"   data-id_zona="'+informe.id_zona+'" data-id_rama="'+informe.id_rama+'"><i class="fas fa-eye"></i></button></div></div>';
            html += '<div class="text-center col-xs-4" title="Imprimir cedula"><div class="btn-group"><button type="button" class="btn btn-success btnCedulas" data-cct="'+informe.cct+'" data-id_ciclo="'+informe.id_ciclo+'"  data-id_funcion="'+informe.id_funcion+'"  data-id_deporte="'+informe.id_deporte+'"   data-id_zona="'+informe.id_zona+'" data-id_rama="'+informe.id_rama+'" data-id_categoria="'+informe.id_categoria+'" data-id_peso="'+informe.id_peso+'" data-id_prueba="'+informe.id_prueba+'"><i class="fas fa-print"></i></button></div></div>';
            html += '<div class="text-center col-xs-4" title="Imprimir gafetes"><div class="btn-group"><button type="button" class="btn btn-success btnGafetes" data-cct="'+informe.cct+'" data-id_ciclo="'+informe.id_ciclo+'"  data-id_funcion="'+informe.id_funcion+'"  data-id_deporte="'+informe.id_deporte+'"   data-id_zona="'+informe.id_zona+'" data-id_rama="'+informe.id_rama+'" data-id_categoria="'+informe.id_categoria+'" data-id_peso="'+informe.id_peso+'" data-id_prueba="'+informe.id_prueba+'"><i class="fas fa-print"></i></button></div></div>';
            html += '</div></td>'
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

    $('#btnCedula').on('click', function(){
        METHOD = "POST";
        if(validar()){
            var myData = $("#formBuscarDeportistas").getFormData(METHOD);
            
            $.ajax({
                url: baseUrl+"certificadopdf.php",
                type: "POST",
                dataType: "JSON",
                data: myData,
                contentType:false,
                cache:false,
                processData:false,
                success: function(data){
                    var a = $("<a />");
                    a.attr("href", baseUrl+data.file);
                    a.attr("target", "_blank")
                    $("body").append(a);
                    a[0].click();
                          
                },
                error: function(data) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lo sentimos',
                        text: 'No se encontró información deseada'
                    });
                }        
            });
        }
    });
    $('#btnGafete').on('click', function(){
        METHOD = "POST";
        if(validar()){
            var myData = $("#formBuscarDeportistas").getFormData(METHOD);
            
            $.ajax({
                url: baseUrl+"pdf.php",
                type: "POST",
                dataType: "JSON",
                data: myData,
                contentType:false,
                cache:false,
                processData:false,
                success: function(data){
                    if( data.length != 0){
                        var a = $("<a />");
                        a.attr("href", baseUrl+data.file);
                        a.attr("target", "_blank")
                        $("body").append(a);
                        a[0].click();
                    }else{
                        Swal.fire({
                            title: 'Lo sentimos',
                            text: 'No se encontró información deseada'
                        });
                    }
                          
                },
                error: function(data) {
                    var error = data;
                    console.log(error);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: error.menssage
                    });
                }        
            });
        }
    });
    $('#btnExcel').on('click', function(){
        METHOD = "POST";
        if(validar()){
            var myData = $("#formBuscarDeportistas").getFormData(METHOD);
            
            $.ajax({
                url: baseUrl+"generarExcel.php",
                type: "POST",
                dataType: "JSON",
                data: myData,
                contentType:false,
                cache:false,
                processData:false,
                success: function(data){
                    if( data.length != 0){
                        var a = $("<a />");
                        a.attr("href", baseUrl+data.file);
                        a.attr("target", "_blank")
                        $("body").append(a);
                        a[0].click();
                    }else{
                        Swal.fire({
                            title: 'Lo sentimos',
                            text: 'No se encontró información deseada'
                        });
                    }
                          
                },
                error: function (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Lo sentimos',
                        text: 'Hubo un error al obtener los datos'
                    });
                }    
            });
        }
    });

    $(document).on("click", ".btnVer", function(){
        cct = $(this).data('cct');
        id_usuario = $(this).data('id_zona');
        id_ciclo = $(this).data('id_ciclo');
        id_funcion = $(this).data('id_funcion');
        id_deporte = $(this).data('id_deporte');
        id_rama = $(this).data('id_rama');
        $(".bd-example-modal-lg").modal("show");
        let url = "getDeportistas.php?id_usuario="+id_usuario+"&id_ciclo="+id_ciclo+"&id_funcion="+id_funcion+'&id_deporte='+id_deporte+'&id_rama='+id_rama+'&cct='+cct;
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
                    html += '<td><div class="text-center"><div class="btn-group"><button type="button" class="btn btn-danger btnDelete" data-id="'+informe.id+'">Borrar</button></div></div></td>';
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

    $(document).on("click", ".btnCedulas", function(){
        cct = $(this).data('cct');
        id_usuario = $(this).data('id_zona');
        id_ciclo = $(this).data('id_ciclo');
        id_funcion = $(this).data('id_funcion');
        id_deporte = $(this).data('id_deporte');
        id_rama = $(this).data('id_rama');
        id_categoria = $(this).data('id_categoria');
        id_peso = $(this).data('id_peso');
        id_prueba = $(this).data('id_prueba');
        METHOD = "POST";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        formData.append('usuario', id_usuario);
        formData.append('ciclo', id_ciclo);
        formData.append('funcion', id_funcion);
        formData.append('deporte', id_deporte);
        formData.append('rama', id_rama);
        formData.append('peso', id_peso);
        formData.append('prueba', id_prueba);
        formData.append('categoria', id_categoria);
        formData.append('cct', cct);
        $.ajax({
            url: baseUrl+"certificadopdf.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                var a = $("<a />");
                a.attr("href", baseUrl+data.file);
                a.attr("target", "_blank")
                $("body").append(a);
                a[0].click();
                      
            },
            error: function(data) {
                console.log(data);
                Swal.fire({
                    title: 'Lo sentimos',
                    text: 'No se encontró información deseada'
                });
            }        
        });

    });
    $(document).on("click", ".btnGafetes", function(){
        cct = $(this).data('cct');
        id_usuario = $(this).data('id_zona');
        id_ciclo = $(this).data('id_ciclo');
        id_funcion = $(this).data('id_funcion');
        id_deporte = $(this).data('id_deporte');
        id_rama = $(this).data('id_rama');
        id_categoria = $(this).data('id_categoria');
        id_peso = $(this).data('id_peso');
        id_prueba = $(this).data('id_prueba');
        METHOD = "POST";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        formData.append('usuario', id_usuario);
        formData.append('ciclo', id_ciclo);
        formData.append('funcion', id_funcion);
        formData.append('deporte', id_deporte);
        formData.append('rama', id_rama);
        formData.append('peso', id_peso);
        formData.append('prueba', id_prueba);
        formData.append('categoria', id_categoria);
        formData.append('cct', cct);
        $.ajax({
            url: baseUrl+"pdf.php",
            type: "POST",
            dataType: "JSON",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(data){
                if( data.length != 0){
                    var a = $("<a />");
                    a.attr("href", baseUrl+data.file);
                    a.attr("target", "_blank")
                    $("body").append(a);
                    a[0].click();
                }else{
                    Swal.fire({
                        title: 'Lo sentimos',
                        text: 'No se encontró información deseada'
                    });
                }
                      
            },
            error: function(data) {
                var error = data;
                console.log(error);
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: error.menssage
                });
            }        
        });

    });
    $.fn.getFormData = function(metodo){
        data = new FormData();
        var dataArray = $(this).serializeArray();
        for(var i=0;i<dataArray.length;i++){
            if(dataArray[i].value != ''){
                data.append( dataArray[i].name,dataArray[i].value);
            }
        }
        data.append('METHOD', metodo);
        return data;
    }

    $(document).on("click", ".btnDelete", function(){
        var id = $(this).data('id');
        Swal.fire({
            title: 'Usted Desea eliminar este registro?',
            text: "¡No podrás revertir esto!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.value) {
                deleteDeportista(id);
            }
        })
    });
    function deleteDeportista(id){
        METHOD = "DELETE";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        let url = "deleteRegistro.php?id="+id;
        $.ajax({
            url: baseUrl+url,
            type: "POST",
            dataType: "json",
            data: formData,
            contentType:false,
            cache:false,
            processData:false,
            success: function(){
                $(".bd-example-modal-lg").modal("hide");
            }
        });
    }
    
});

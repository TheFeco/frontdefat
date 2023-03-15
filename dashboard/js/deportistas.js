$(document).ready(function () {

    // Obtener el objeto informe de la URL y decodificarlo de la cadena JSON
    var informeJson = sessionStorage.getItem('informe');
    var informe = JSON.parse(informeJson);

    var nombreEscuela = informe.escuela.toLowerCase();
    var nombreFuncion = informe.funcion.toLowerCase();

    $('.nombreEscuela').text(nombreEscuela);
    $('.nombreFuncion').text(nombreFuncion);

    var header;

    header += '<tr>' +
        '<td >Escuela</td>' +
        '<td>Ciclo</td>' +
        '<td>Nombre</td>' +
        '<td>Apellidos</td>' +
        '<td>Función</td>';
    if (informe.id_deporte != 0) {
        header += '<td>Deporte</td>' +
            '<td>Rama</td>' +
            '<td>Pruebas</td>';
    }
    header += '<td>Acciones</td>';
    header += '</tr>';
    $('#headerListaDeportistas').html(header);

    function getListaDeportistas() {
        cct = informe.cct;
        id_ciclo = informe.id_ciclo;
        id_funcion = informe.id_funcion;
        id_deporte = informe.id_deporte;
        id_rama = informe.id_rama;
        $('.loading').show();
        let url = "getDeportistas.php?id_usuario=" + getUsuario() + "&id_ciclo=" + id_ciclo + "&id_funcion=" + id_funcion + '&id_deporte=' + id_deporte + '&id_rama=' + id_rama + '&cct=' + cct;
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {

                var datos = JSON.parse(data);
                var html;
                $.each(datos.registros, function (key, informe) {
                    var deporte = (informe.deporte == null) ? "" : informe.deporte;
                    var rama = (informe.rama == null) ? "" : informe.rama;
                    html += '<tr>' +
                        '<td >' + informe.escuela + '</td>' +
                        '<td>' + informe.ciclo + '</td>' +
                        '<td>' + informe.nombre + '</td>' +
                        '<td>' + informe.apellidos + '</td>' +
                        '<td>' + informe.funcion + '</td>';
                    if (deporte != "") {
                        html += '<td>' + deporte + '</td>' +
                            '<td>' + rama + '</td>' +
                            '<td>' + informe.array_pruebas + '</td>';
                    }
                    html += '<td><div class="text-center"><div class="btn-group"> <button type="button" class="btn btn-info btnSubirFormatos" data-id="' + informe.id + '" data-funcion="' + id_funcion + '">Subir formatos</button><button type="button" class="btn btn-danger btnDelete" data-id="' + informe.id + '">Borrar</button></div></div></td>';
                    html += '</tr>';
                });
                // <button type="button" class="btn btn-primary btnEditar" data-id="' + informe.id + '">Editar</button>
                $('#ListaDeportistas').html(html);
                $('.loading').hide();
            },
            error: function () {
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }

    // Agregar evento click al botón "Editar"
    $(document).on("click", ".btnEditar", function(){
        var idDeportista = $(this).attr('data-id');
        // Redirigir a la página de captura de edición con el id del deportista
        window.location.href = "capturaEditar.php?id=" + idDeportista;
    });

    $(document).on("click", ".btnDelete", function(){
        var id = $(this).data('id');
        Swal.fire({
            title: '¿Estás seguro de que quieres eliminar este registro?',
            text: "Esta acción no se puede deshacer",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
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
                getListaDeportistas();
            }
        });
    }
    $(document).on("click", ".btnSubirFormatos", function() {
        var idDeportista = $(this).attr('data-id');
        var idFuncion = $(this).attr('data-funcion');
        
        // Mostrar la barra lateral y cargar el formulario según la función del deportista
        showSidebar(idDeportista, idFuncion);
    });

    $(document).on("click", ".close-sidebar", function() {
        closeSidebar();
    });

    $(document).on("click", "#overlay-2", function() {
        closeSidebar();
    });

    function showSidebar(idDeportista, idFuncion) {
        // Aquí va el código para mostrar la barra lateral y cargar el formulario adecuado según la función del deportista.
        // Puedes agregar condiciones para mostrar distintos campos del formulario según el valor de "idFuncion".
        loadFields(idFuncion);
        // Establecer el valor del campo idDeportista en el formulario
        $('#idDeportista').val(idDeportista);

        // Mostrar la barra lateral
        $('.sidebar-data').addClass('open');
        $('#overlay-2').show();
    }



    function closeSidebar() {
        // Ocultar la barra lateral
        $('.sidebar-data').removeClass('open');
        $('#uploadForm')[0].reset();
        $('#overlay-2').hide();
    }

    function loadFields(idFuncion) {
        // Ocultar todos los campos
        $('#uploadForm .acta-curp, #uploadForm .constancia-estudio, #uploadForm .certificado-medico, #uploadForm .carta-responsiva, #uploadForm .ine, #uploadForm .constancia-acreditacion, #uploadForm .constancia-servicios').hide();
        console.log(idFuncion);
        // Mostrar campos según el valor de idFuncion
        switch (parseInt(idFuncion)) {
            case 1:
                $('#uploadForm .acta-curp, #uploadForm .constancia-estudio, #uploadForm .certificado-medico, #uploadForm .carta-responsiva, #uploadForm .ine').show();
                break;
            case 2:
            case 8:
                $('#uploadForm .constancia-acreditacion, #uploadForm .constancia-servicios').show();
                break;
            case 3:
            case 7:
                $('#uploadForm .constancia-servicios').show();
                break;
        }
    }

    $('#uploadForm').submit(function (event) {
        event.preventDefault();
        // Obtener el archivo seleccionado en el campo de foto
        var archivoFoto = $("#foto")[0].files[0];

        // Comprobar si el archivo tiene un formato de imagen válido
        var formatosPermitidos = ["image/jpeg", "image/png", "image/gif"];
        if (archivoFoto && !formatosPermitidos.includes(archivoFoto.type)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El archivo seleccionado no es una imagen válida. Por favor, elige un archivo en formato JPEG, PNG o GIF.",
            });
            return;
        }
        var id_deportista = $('#idDeportista').val(); // Obtén el ID del deportista del campo oculto
        guardarFormatos(id_deportista);
    });

    function guardarFormatos(id_deportista) {
        $('.loading').show();
        var formData = new FormData($('#uploadForm')[0]);
        formData.append('METHOD', 'POST');
        formData.append('token', getToken());
        formData.append('id_deportista', id_deportista);
        
        $.ajax({
            url: baseUrl + 'updateformatos.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                // Procesar la respuesta del servidor (puedes mostrar un mensaje de éxito o realizar alguna acción)
                console.log(response);
                closeSidebar();
                $('.loading').hide();
            },
            error: function () {
                // Mostrar un mensaje de error si algo sale mal en la petición
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al subir los documentos!'
                });
            }
        });
    }
    
    

    //llamada de funciones 
    getListaDeportistas();
});
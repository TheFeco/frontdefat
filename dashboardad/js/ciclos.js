$(document).ready(function () {
    $('#nvoCiclo').inputmask("9999-9999");

    $('#guardar').click(function (e) {
        e.preventDefault();
        if ($('#cct').inputmask('isComplete')) {
            $('#cct').removeClass('is-invalid');
            guardarCiclo();
        } else {
            $('#cct').addClass('is-invalid');
        }

    });

    function getListaCiclos() {
        $('.loading').show();
        let url = "ciclos.php?token=" + getToken();
        $.ajax({
            url: baseUrl + url,
            type: "GET",
            datatype: "json",
            success: function (data) {
                var datos = data;
                var html;
                $.each(datos, function (key, ciclo) {
                    html += '<tr>' +
                        '<td class="text-center">' + ciclo.nombre + '</td>';
                    html += '</tr>';
                });

                $('#DataResultCiclo').html(html);
                $('.loading').hide();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }

    function guardarCiclo() {
        $('.loading').show();
        METHOD = "POST";
        formData = new FormData();
        formData.append('METHOD', METHOD);
        formData.append('token', getToken());
        formData.append('nombre', $('#nvoCiclo').val());
        let url = "ciclos.php";
        $.ajax({
            url: baseUrl + url,
            type: "POST",
            dataType: "json",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);

                $('#modelId').modal('hide');
                getListaCiclos();
                $('.loading').hide();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                $('.loading').hide();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al obtener los datos!'
                });
            }
        });
    }

    getListaCiclos();
});
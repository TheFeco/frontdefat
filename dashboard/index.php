<?php require_once "vistas/parte_superior.php" ?>

<!--INICIO del cont principal-->
<div class="container">
    <h1 align="center">Lista de Escuelas con alumnos Capturados</h1>
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <button id="btnNuevo" type="button" class="btn btn-success" data-toggle="modal">Nuevo</button>
            </div>
            <div class="col-lg-6">
                <input type="text" class="form-control" id="inputBusqueda" placeholder="Buscar">
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaPersonas" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Nombre</th>
                                <th>Ciclo</th>
                                <th>Funcion</th>
                                <th>Deporte</th>
                                <th>Rama</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="DataResult">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!--Modal para Comenarios-->
    <div class="modal fade" id="modalComentario" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="comentario" id="comentario"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>



</div>
<!--FIN del cont principal-->
<?php require_once "vistas/modalLarge.php" ?>
<?php require_once "vistas/parte_inferior.php" ?>
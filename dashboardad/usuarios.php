<?php require_once "vistas/parte_superior.php" ?>
<div class="container-fluid">
    <h1 class="text-center mb-5" style="color: #651D32;">Usuarios</h1>

    <!-- Button trigger modal -->
    <button type="button" id="nvoUsuario" class="btn btn-success btn-lg">
        Nuevo
    </button>
    <br>
    <div class="row mt-4">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaUsuarios" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>Nombre</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="DataResultUsuario">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="resetPassword" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Cambiar Contraseña</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="nvoPassword">Nueva Contraseña</label>
                    <input type="text" name="nvoPassword" id="nvoPassword" class="form-control" placeholder="" aria-describedby="helpId">
                    <input type="hidden" id="idUsuario" name="idUsuario">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" id="newPassword" class="btn btn-primary">Guardar</button>
            </div>
        </div>
    </div>
</div>

<?php require_once "vistas/parte_inferior.php" ?>
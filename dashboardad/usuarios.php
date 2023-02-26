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


<?php require_once "vistas/parte_inferior.php" ?>
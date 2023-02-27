<?php require_once "vistas/parte_superior.php" ?>
<div class="container-fluid">
    <h1 class="text-center mb-5" style="color: #651D32;">Usuarios</h1>

    <!-- Button trigger modal -->
    <button type="button" id="regresar" class="btn btn-success btn-lg regresar">
        Regresar
    </button>
    <br>
    <div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6 mt-5 mb-5">
				<div class="card">
					<div class="card-header">
						<h4>Formulario de Registro</h4>
					</div>
					<div class="card-body">
                        <input type="hidden" id="id" name="id">
						<form id="formEditarUsuario" class="form-horizontal">
							<div class="form-group row">
								<label for="usuario" class="col-sm-3 col-form-label">Usuario</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="usuario" name="usuario" placeholder="Ingrese su usuario">
								</div>
							</div>
                            <div class="form-group row">
								<label for="rol" class="col-sm-3 col-form-label">Rol</label>
								<div class="col-sm-9">
									<select class="form-control" id="rol" name="rol">
										<option value="">Seleccione un nivel</option>
										<option value="1">Administrador</option>
										<option value="2">Usuario</option>
									</select>
								</div>
							</div>
							<div class="form-group row">
								<label for="nivel" class="col-sm-3 col-form-label">Nivel</label>
								<div class="col-sm-9">
									<select class="form-control" id="nivel" name="nivel">
										<option value="">Seleccione un nivel</option>
										<option value="1">Primaria</option>
										<option value="2">Secundaria</option>
										<option value="3">Administrador</option>
									</select>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-sm-9 offset-sm-3">
									<button type="submit" class="btn btn-primary">Editar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php require_once "vistas/parte_inferior.php" ?>
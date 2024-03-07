<?php require_once "vistas/parte_superior.php" ?>

<div class="container">
    <h1 align="center">Captura de datos</h1>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                </button>
                <form id="formInformes" enctype="multipart/form-data" class="needs-validation" novalidate>
                    <div class="form-group">
                        <label for="funcion" class="col-form-label">Función:</label>
                        <select id="funcion" class="form-control" name="funcion">
                            <option value="">Seleccionar...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="curp" class="col-form-label">CURP:</label>
                        <input type="text" class="form-control" id="curp" name="curp">
                    </div>
                    <div class="form-group">
                        <label for="nombre" class="col-form-label">Nombre(s):</label>
                        <input type="text" class="form-control" id="nombre" name="nombre">
                    </div>
                    <div class="form-group">
                        <label for="apellidos" class="col-form-label">Apellido(s):</label>
                        <input type="text" class="form-control" id="apellidos" name="apellidos">
                    </div>
                    <div class="form-group">
                        <label for="fh_nacimiento" class="col-form-label">Fecha de Nacimiento:</label>
                        <input type="date" class="form-control" id="fh_nacimiento" name="fh_nacimiento">
                    </div>
                    <div class="form-group">
                        <label for="ciclo" class="col-form-label">Ciclo Escolar:</label>
                        <select id="ciclo" class="form-control" name="ciclo">
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cct" class="col-form-label">Clave de Centro de Trabajo:</label>
                        <input type="text" id="cct" class="form-control" name="cct" />
                    </div>
                    <div class="form-group">
                        <label for="escuela" class="col-form-label">Nombre de Escuela:</label>
                        <input type="text" id="escuela" class="form-control" name="escuela" />
                    </div>
            </div>
            <div class="col-lg-6">
                <div class="form-group">
                    <label for="turno" class="col-form-label">Turno:</label>
                    <select id="turno" class="form-control" name="turno">
                        <option value="">Seleccionar...</option>
                        <option value="1">Matutino</option>
                        <option value="2">Vespertino</option>
                        <option value="3">Nocturno</option>
                        <option value="4">Discontinuo</option>
                        <option value="5">Continuo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="municipio" class="col-form-label">Municipio:</label>
                    <select id="municipio" class="form-control" name="municipio">
                        <option value="">Seleccionar...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="zona" class="col-form-label">Zona:</label>
                    <input type="number" class="form-control" min="0" max="130" id="zona" name="zona" />
                </div>
                <div class="form-group deporte">
                    <label for="deporte" class="col-form-label">Deporte:</label>
                    <select id="deporte" class="form-control" name="deporte">
                        <option value="">Seleccionar...</option>
                    </select>
                </div>
                <div class="form-group rama">
                    <label for="rama" class="col-form-label">Rama:</label>
                    <select id="rama" class="form-control" name="rama">
                        <option value="">Seleccionar...</option>
                    </select>
                </div>
                <div class="form-group peso" style="display:none;">
                    <label for="peso" class="col-form-label">Peso:</label>
                    <select id="peso" class="form-control" name="peso">
                    </select>
                </div>
                <div class="form-group categoria" style="display:none;">
                    <label for="categoria" class="col-form-label">Categoria:</label>
                    <select id="categoria" class="form-control" name="categoria">
                    </select>
                </div>
                <div class="form-group prueba" style="display:none;">
                    <label for="prueba" class="col-form-label">Prueba:</label>
                    <select id="prueba" class="form-control" name="prueba">
                    </select>
                </div>
                <div class="form-group prueba2" style="display:none;">
                    <label for="prueba2" class="col-form-label">Segunda Prueba:</label>
                    <select id="prueba2" class="form-control" name="prueba2">
                    </select>
                </div>

                <div class="form-group">
                    <label for="foto" class="col-form-label">Foto:</label>
                    <input type="file" name="foto" class="form-control" id="foto" require>
                </div>
                <div class="form-group fnDeportista">
                    <label for="constanciaEstudio" class="col-form-label">Constancia de Estudio:</label>
                    <input type="file" name="constanciaEstudio" class="form-control" id="constanciaEstudio">
                </div>
                <div class="form-group fnDeportista">
                    <label for="curpPdf" class="col-form-label">Acta de Nacimiento, Curp o Pasaporte:</label>
                    <input type="file" name="curpPdf" class="form-control" id="curpPdf">
                </div>
                <div class="form-group fnDeportista">
                    <label for="cerMedico" class="col-form-label">Certificado Medico:</label>
                    <input type="file" name="cerMedico" class="form-control" id="cerMedico">
                </div>
                <div class="form-group fnDeportista">
                    <label for="cartaResponsiva" class="col-form-label">Carta Responsiva:</label>
                    <input type="file" name="cartaResponsiva" class="form-control" id="cartaResponsiva">
                </div>
                <div class="form-group fnDeportista">
                    <label for="ine" class="col-form-label">INE de Padre, Madre o Tutor:</label>
                    <input type="file" name="ine" class="form-control" id="ine">
                </div>
                <div class="form-group fnEntrenadores">
                    <label for="constanciaAutorizacion" class="col-form-label">Constancia de Acreditación y Autorización:</label>
                    <input type="file" name="constanciaAutorizacion" class="form-control" id="constanciaAutorizacion">
                </div>
                <div class="form-group fnEntrenadores fnDelegados">
                    <label for="constanciaServicio" class="col-form-label">Constancia de Servicio:</label>
                    <input type="file" name="constanciaServicio" class="form-control" id="constanciaServicio">
                </div>
            </div>
        </div>
        <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
        </form>
        <div>
        </div>
        <br>
    </div>
</div>
<!-- Modal HTML -->
<div id="modalSuccess" class="modal fade">
    <div class="modal-dialog modal-confirm">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <div class="icon-box">
                    <i class="fas fa-check"></i>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body text-center">
                <h4>Genial!</h4>
                <p>¡Se guardo Exitosamente!.</p>
                <button class="btn btn-success" id="btnModalOtro"><span>Capturar Otro</span> <i class="fad fa-users"></i></button>
                <button class="btn btn-return btn-green" id="btnRegresar"><span>Finalizar</span> <i class="fad fa-arrow-alt-left"></i></button>
            </div>
        </div>
    </div>
</div>

<?php require_once "vistas/parte_inferior.php" ?>
<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
    <h1 align="center">Captura de datos</h1>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">            
                <button id="btnNuevo" type="button" class="btn btn-success" data-toggle="modal">Nuevo</button>    
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

<!--Modal para Informes-->
<div class="modal fade" id="modalInforme" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-verde">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formInformes" enctype="multipart/form-data" class="needs-validation" novalidate>    
            <div class="modal-body">
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
                <label for="nombre" class="col-form-label">Nombre Compelto:</label>
                <input type="text" class="form-control" id="nombre" name="nombre">
                </div>
                <div class="form-group">
                <label for="apellidos" class="col-form-label">Apellidos:</label>
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
                <label for="deporte" class="col-form-label">Deporte:</label>
                <select id="deporte" class="form-control" name="deporte">
                <option value="">Seleccionar...</option>
                </select>
                </div>
                <div class="form-group">
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
                <div class="form-group prueba" style="display:none;">
                <label for="   " class="col-form-label">Municipio:</label>
                <select id="prueba" class="form-control" name="prueba">    
                </select>
                </div>
                <div class="form-group">
                <label for="edad" class="col-form-label">Foto:</label>
                <input type="file" name="foto" class="form-control" id="foto" require>
                </div>            
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>
        </form>    
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
<?php require_once "vistas/modalLarge.php"?>
<?php require_once "vistas/parte_inferior.php"?>
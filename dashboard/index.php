<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
    <h1>Informes Trimestrales</h1>
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
                                <th class="d-none">id</th>
                                <th>Nombre</th>
                                <th>Ciclo</th>                                
                                <th>Periodo</th>
                                <th>Documento</th>
                                <th>Fecha envio</th>
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
                <label for="nombre" class="col-form-label">Nombre Compelto Rte:</label>
                <input type="text" class="form-control" id="nombre" name="nombre">
                </div>
                <div class="form-group">
                <label for="apellidos" class="col-form-label">Apellido Rte:</label>
                <input type="text" class="form-control" id="apellidos" name="apellidos">
                </div>                
                <div class="form-group">
                <label for="ciclo" class="col-form-label">Ciclo Escolar:</label>
                <select id="ciclo" class="form-control" name="ciclo">    
                </select>
                </div>
                <div class="form-group">
                <label for="periodo" class="col-form-label">Periodo:</label>
                <select id="periodo" class="form-control" name="periodo">    
                </select>
                </div>
                <div class="form-group">
                <label for="edad" class="col-form-label">Archivo:</label>
                <input type="file" name="archivo" class="form-control" id="archivo" require">
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
<?php require_once "vistas/parte_inferior.php"?>
<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
    <h1 align="center" >ADMINISTRADOR</h1>
    <br>
    <form id="formBuscarDeportistas" enctype="multipart/form-data" class="needs-validation" novalidate>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <label for="usuarios" class="col-form-label">Jefe de zona:</label>        
                    <select id="usuario" class="form-control requerido" name="usuario">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-4">
                    <label for="ciclos" class="col-form-label">Ciclos:</label>          
                    <select id="ciclo" class="form-control requerido" name="ciclo">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-4">
                    <label for="funciones" class="col-form-label">Funciones:</label>          
                    <select id="funcion" class="form-control requerido" name="funcion">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
            
            </div>
            <br>
            <div class="row">     
                <div class="col-lg-3">
                    <label for="deportes" class="col-form-label">Deportes:</label>           
                    <select id="deporte" class="form-control" name="deporte">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>    
                <div class="col-lg-3">  
                    <label for="ramas" class="col-form-label">Ramas:</label>          
                    <select id="rama" class="form-control" name="rama">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-2 categoria" style="display: none;">   
                    <label for="categorias" class="col-form-label">Categorias:</label>         
                    <select id="categoria" class="form-control" name="categoria">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-2 peso" style="display: none;">
                    <label for="peso" class="col-form-label">Peso:</label>
                    <select id="peso" class="form-control" name="peso">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div> 
                <div class="col-lg-2 prueba" style="display: none;">
                    <label for="pruebas" class="col-form-label">Pruebas:</label>         
                    <select id="prueba" class="form-control" name="prueba">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>
            </div>
            <br>
            <div class="row">
                <div align="right"class="col-lg-12">            
                    <button a id="btnbuscar" type="submit" class="btn btn-success">Buscar</button>    
                </div>
            </div>
        </div>
    </form>
    <br>
   
    <br>  
    <div class="container">
        <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive mb-5">        
                        <table id="tablaPersonas" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Escuela</th>
                                <th>Ciclo</th>                                
                                <th>Turno</th>                                
                                <th>Funcion</th>
                                <th>Deporte</th>
                                <th>Rama</th>
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

<!--Modal para Comenarios-->
<div class="container">
    <div class="row">
        <div class="col-md-12" >  
            <button type="button" id="btnCedula" class="btn btn-success">Imprimir Cedula</button>
            <button type="button" id="btnGafete" class="btn btn-success">Imprimir Gafete</button>
            <button type="button" id="btnExcel" class="btn btn-success">Exportar Excel</button>
        </div>
    </div>
</div>
    
</div>
<!--FIN del cont principal-->
<?php require_once "vistas/parte_inferior.php"?>
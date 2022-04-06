<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
    <h1 align="center" >ADMINISTRADOR</h1>
    <br>
    <form id="formBuscarDeportistas" enctype="multipart/form-data" class="needs-validation" novalidate>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <label for="usuarios" class="col-form-label">Jefe de sector:</label>        
                    <select id="usuarios" class="form-control" name="usuarios">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-4">
                    <label for="ciclos" class="col-form-label">Ciclos:</label>          
                    <select id="ciclo" class="form-control" name="ciclo">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-4">
                    <label for="funciones" class="col-form-label">Funciones:</label>          
                    <select id="funcion" class="form-control" name="funcion">
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
                <div class="col-lg-2">   
                    <label for="categorias" class="col-form-label">Categorias:</label>         
                    <select id="categoria" class="form-control" name="categoria">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div>  
                <div class="col-lg-2">
                    <label for="peso" class="col-form-label">Peso:</label>
                    <select id="peso" class="form-control" name="peso">
                        <option value="">Seleccionar...</option>
                    </select> 
                </div> 
                <div class="col-lg-2">
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
                    <div class="table-responsive">        
                        <table id="tablaPersonas" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th class="d-none">id</th>
                                <th>Escuela</th>
                                <th>Ciclo</th>                                
                                <th>Turno</th>
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

<!--Modal para Comenarios-->

    
    
</div>
<!--FIN del cont principal-->
<?php require_once "vistas/parte_inferior.php"?>
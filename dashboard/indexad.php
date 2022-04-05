<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
<div class="container">
    <h1 align="center" >ADMINISTRADOR</h1>
    <br>
    <div class="container">
        <div class="row">
       
        <div class="col-lg-4">            
                <select id="usuarios" class="form-control" name="usuarios"></select> 
            </div>  
            <div class="col-lg-4">            
                <select id="ciclo" class="form-control" name="ciclo"></select> 
            </div>  
            <div class="col-lg-4">            
                <select id="funcion" class="form-control" name="funcion"></select> 
            </div>  
           
        </div>
        <br>
        <br>
        <div>
        <div class="container">
        <div class="row">
                  
        <div class="col-lg-3">            
                <select id="deporte" class="form-control" name="deporte"></select> 
            </div>    
            <div class="col-lg-3">            
                <select id="rama" class="form-control" name="rama"></select> 
            </div>  
            <div class="col-lg-2">            
                <select id="categoria" class="form-control" name="categoria"></select> 
            </div>  
            <div class="col-lg-2">            
                <select id="prueba" class="form-control" name="prueba"></select> 
            </div>  
            <div class="col-lg-2">            
                <select id="peso" class="form-control" name="peso"></select> 
            </div> 
            <br>
        </div>
        </div>  
        </div>
        <br>
        <div align="right"class="col-lg-12">            
                <button a id="btnbuscar" type="button" class="btn btn-success" data-toggle="modal">Buscar</button>    
            </div>  
    </div>
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
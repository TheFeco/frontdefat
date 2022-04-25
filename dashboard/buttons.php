<?php require_once "vistas/parte_superior.php"?>

<!--INICIO del cont principal-->
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
                            <th>rama</th>
                        </tr>
                    </thead>
                    <tbody id="DataDeportistas">
                    </tbody>        
                    </table>                    
                </div>
            </div>
    </div>
</div> 
<!--FIN del cont principal-->

<?php require_once "vistas/parte_inferior.php"?>
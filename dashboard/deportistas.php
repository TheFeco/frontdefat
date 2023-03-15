<?php require_once "vistas/parte_superior.php" ?>
<div class="container-fluid">
    <h1 class="text-center mb-5" style="color: #651D32;">Lista de <span class="nombreFuncion"></span> de la Escuela <span class="nombreEscuela"></span></h1>
    
    <table class="table table-hover">
        <thead id="headerListaDeportistas">
        </thead>
        <tbody id="ListaDeportistas">
        </tbody>
    </table>
</div>
<div class="sidebar-data">
    <!-- Agrega un botón de cierre en la parte superior de la barra lateral -->
    <button class="close-sidebar" onclick="closeSidebar();">&times;</button>

    <!-- Resto del contenido de la barra lateral -->
    <form id="uploadForm" class="mt-4">
        <input type="hidden" id="idDeportista" name="idDeportista">

        <div class="foto">
            <label for="foto">Foto:</label>
            <input type="file" id="foto" name="foto">
        </div>

        <div class="acta-curp">
            <label for="acta_curp">Acta de nacimiento o CURP:</label>
            <input type="file" id="acta_curp" name="acta_curp">
        </div>

        <div class="constancia-estudio">
            <label for="constancia_estudio">Constancia de estudio:</label>
            <input type="file" id="constancia_estudio" name="constancia_estudio">
        </div>

        <div class="certificado-medico">
            <label for="certificado_medico">Certificado Medico:</label>
            <input type="file" id="certificado_medico" name="certificado_medico">
        </div>

        <div class="carta-responsiva">
            <label for="carta_responsiva">Carta Responsiva:</label>
            <input type="file" id="carta_responsiva" name="carta_responsiva">
        </div>

        <div class="ine">
            <label for="ine">INE de Padre, Madre o Tutor:</label>
            <input type="file" id="ine" name="ine">
        </div>

        <div class="constancia-acreditacion">
            <label for="constancia_acreditacion">Constancia de Acreditación y Actualización:</label>
            <input type="file" id="constancia_acreditacion" name="constancia_acreditacion">
        </div>

        <div class="constancia-servicios">
            <label for="cocnstancia_servicio">Constancia de Servicio:</label>
            <input type="file" id="cocnstancia_servicio" name="cocnstancia_servicio">
        </div>

        <button type="submit">Subir archivos</button>
    </form>
</div>


<?php require_once "vistas/parte_inferior.php" ?>
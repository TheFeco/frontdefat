
      </div>
      <!-- End of Main Content -->

      <?php require_once "vistas/footer.php"?>

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">¿Confirma salir y cerrar Sesión?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
          <a class="btn btn-primary" id="logout" href="#">Salir</a>
  
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="js/sb-admin-2.min.js"></script>
  <script src="js/jquery.inputmask.min.js"></script>

  <!-- datatables JS -->
  <script type="text/javascript" src="vendor/datatables/datatables.min.js"></script>
  <script src="vendor/ckeditor/ckeditor.js"></script>
  <script src="vendor/ckeditor/adapters/jquery.js"></script>
  <!-- código propio JS --> 
  <script src="../../plugins/sweetalert2/sweetalert2.all.min.js"></script>
  <script src="../../config.js"></script>
  <!-- <script type="text/javascript" src="main.js?ver=3"></script> -->
  <?php
    // Verificar la página actual y cargar los scripts correspondientes
    $pagina_actual = basename($_SERVER['PHP_SELF']);
    $random_number = rand(1, 1000000); // Genera un número aleatorio
    echo '<script type="text/javascript" src="main.js?ver='.$random_number.'"></script>';
    switch($pagina_actual) {
      case 'deportistas.php':
        echo '<script type="text/javascript" src="js/deportistas.js?ver='.$random_number.'"></script>';
        break;
      case 'index.php':
        echo '<script type="text/javascript" src="deportistas.js?ver='.$random_number.'"></script>';
        break;
      case 'captura.php':
        echo '<script type="text/javascript" src="js/captura.js?ver='.$random_number.'"></script>';
        break;
      case 'capturaEditar.php':
        echo '<script type="text/javascript" src="js/capturaEditar.js?ver='.$random_number.'"></script>';
        break;
      case 'otra_pagina.php':
        echo '<script type="text/javascript" src="otra_pagina.js?ver='.$random_number.'"></script>';
        break;
      // Agregar más casos para cada página adicional
    }
  ?>

</body>

</html>

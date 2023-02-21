
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
        <span>Copyright &copy; Desarrollado por  &nbsp; &nbsp; </span>  <img class=desarrollado  src="../imagenes/logo1.png"  top="50px"> 
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

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
  <script type="text/javascript" src="main.js"></script>
  <?php
    // Verificar la página actual y cargar los scripts correspondientes
    $pagina_actual = basename($_SERVER['PHP_SELF']);
    switch($pagina_actual) {
      case 'ciclos.php':
        echo '<script type="text/javascript" src="js/ciclos.js"></script>';
        break;
      case 'otra_pagina.php':
        echo '<script type="text/javascript" src="otra_pagina.js"></script>';
        break;
      // Agregar más casos para cada página adicional
    }
  ?>

</body>

</html>

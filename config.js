var miStorage = window.localStorage;
// const baseUrl = 'http://apidefatw.test/';
const baseUrl = 'http://tecnologiaeducativa.sepyc.gob.mx/api/';
// const baseUrl = 'http://juegosdeportivosescolares.sepyc.gob.mx/api/';


function getUsuario(){
    var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
    return getUsuario.id;
}
function getUsuarioNombre(){
    var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
    return getUsuario.usuario;
}
function getNivel(){
    var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
    return getUsuario.id_nivel;
}
function getRol(){
    var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
    return getUsuario.id_rol;
}
function getToken(){
    var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
    return getUsuario.token;
}

function valdiateUrl(){
    var loc = window.location;
    var pathName = loc.pathname.substring(loc.pathname.lastIndexOf('/'), loc.pathname.lastIndexOf('.php'));
    if (pathName == '/indexAdmin' && getRol() != 1) {
        window.location.href = "index.php";
    }
}
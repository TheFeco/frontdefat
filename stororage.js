var miStorage = window.localStorage;
const baseUrl = 'http://apidefat.test/';
// const baseUrl = 'http://dtesepyc.gob.mx/apidefat/';
//var getUsuario = JSON.parse(window.localStorage.getItem("s_storage"));
//const getUsuario = getUser();

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

function valdiateUrl(){
    var loc = window.location;
    var pathName = loc.pathname.substring(loc.pathname.lastIndexOf('/'), loc.pathname.lastIndexOf('.php'));
    if (pathName == '/indexAdmin' && getRol() != 1) {
        window.location.href = "index.php";
    }
}
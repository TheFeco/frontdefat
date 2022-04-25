$(document).ready(function(){
    // console.log(url.pathname.split('/'));
    // var local = window.location.pathname.split('/');
    // console.log(local);

    const url = window.location;
    console.log(url.pathname.split('/'));
    const params = new URLSearchParams(url.search)
    console.log(params)
});
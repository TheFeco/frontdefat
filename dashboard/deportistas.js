$(document).ready(function(){
    const url = window.location;
    console.log(url.pathname.split('/'));
    const params = new URLSearchParams(url.search)
    console.log(params)
});
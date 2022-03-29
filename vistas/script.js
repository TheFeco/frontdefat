$('#logout').click(function(e){
    e.preventDefault();
    $.ajax({
        url:"../bd/logout.php",
        type:"GET",
        datatype: "json", 
        success:function(data){
            localStorage.removeItem('s_storage')
            window.location.href = "../index.php";
        }    
     });     
});
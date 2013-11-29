/*

 Menú dinámico.
  - { PRE: TOKEN }
  - { POST: MENU CARGADO }

*/



$(document).ready(function(){

    var idRol=localStorage.getItem("idRol");
    var idUsuario=localStorage.getItem("idUsuario");
    

    if(idRol == null || idUsuario==null){
    	
        $(location).attr('href','../../index.html');
    }

    /*if(idRol==1){
	var jqxhr = $.getJSON( "http://www.json-generator.com/j/cvrpAzgmdK?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			    	if ($("#botonera")!= null){
			    		$("#botonera").show();
			    	}
			  })
     }else{
         var jqxhr = $.getJSON( "http://www.json-generator.com/j/bOpjQIbsmW?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			  })
         
         
     }*/

     $.ajax({
		type: 'GET',
		url: '../../api/S_obtenerMenuGeneral/'+idRol,
		dataType: "json", // data type of response	
                success: function(data){
                    var menu = armaMenu( data );
                    $("#seguridadMenu").html(menu);
			    	if ($("#botonera")!= null){
			    		$("#botonera").show();
			    	}
                }
	});


     var nombre=localStorage.getItem("nombre");
     var menuPerfil = '<ul class="nav navbar-nav navbar-right">';
         menuPerfil+= '<li id="logeado" class="dropdown">';
         menuPerfil+= '<a href="#" class="dropdown-toggle" data-toggle="dropdown">';
         menuPerfil+= '<span class="glyphicon glyphicon-user"></span>';
         menuPerfil+= '    Bienvenido '+nombre+' <b class="caret"></b></a>';
         menuPerfil+= '<ul class="dropdown-menu">';
         menuPerfil+= '<li><a href="#">Preferencias</a></li>';
         menuPerfil+= '<li class="divider"></li>';
         menuPerfil+= '<li><a id="logout" href="../../index.html"><span class="glyphicon glyphicon-log-out"></span>Log out</a></li>';
         menuPerfil+= '</ul></li></ul>';
     $("#perfilMenu").html(menuPerfil); 

});





function armaMenu( data ){
	//console.log(data);

	var menu = '<ul class = "nav navbar-nav">';
	for ( i = 0 ; i < data.menu.length; i++ ){
		var submenu = data.menu[i].submenu;

		menu += '<li class = "dropdown">';
		menu +=  '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + data.menu[i].title +'<b class="caret"></b></a>';
		
		menu += '<ul class="dropdown-menu">';

		for ( j = 0 ; j < submenu.length; j++ ){
			menu += '<li>';
			menu += '<a href="' + submenu[j].href + '">'+ submenu[j].title+ '</a>';
			menu += '</li>';

		}
		menu += '</ul>';
	}
	
	menu += '</ul>'

	return menu;

}
$('#logout').click(function(){
    localStorage.clear();
});
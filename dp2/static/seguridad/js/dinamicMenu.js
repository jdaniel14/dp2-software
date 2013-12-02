/*

 Menú dinámico.
  - { PRE: TOKEN }
  - { POST: MENU CARGADO }

*/



$(document).ready(function(){

    var idRol=localStorage.getItem("idRol");
    var idProyecto=localStorage.getItem("idProyecto");
    var idUsuario=localStorage.getItem("idUsuario");
    

    if(idRol == null || idProyecto==null || idUsuario==null){
    	
        $(location).attr('href','../../index.html');
    }

    /*if(idRol==1){
    		
    		//menu para el GP 
			var jqxhr = $.getJSON( "http://www.json-generator.com/j/bUkYhcRRXC?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			    	if ($("#botonera")!= null){
			    		$("#botonera").show();
			    	}
			  })
     }else if(idRol==2){
     		
     		//menu para un JP
         	var jqxhr = $.getJSON( "http://www.json-generator.com/j/cpogpCpgWG?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			    	if ($("#botonera")!= null){
			    		$("#botonera").show();
			    	}
			})
         
         
     }else if(idRol==3){

     	//menu para el TM
     	var jqxhr = $.getJSON( "http://www.json-generator.com/j/ceMClpDzxe?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			})


     }*/

     $.ajax({
		type: 'GET',
		url: '../../api/S_obtenerMenu/'+idRol,
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
         menuPerfil+= '      Bienvenido '+nombre+' <b class="caret"></b></a>';
         menuPerfil+= '<ul class="dropdown-menu">';
         menuPerfil+= '<li><a href="#">Preferencias</a></li>';
         menuPerfil+= '<li class="divider"></li>';
         menuPerfil+= '<li><a id="logout" href="../../index.html"><span class="glyphicon glyphicon-log-out"></span>Log out</a></li>';
         menuPerfil+= '</ul></li></ul>';
     $("#perfilMenu").html(menuPerfil); 


});



/*

  <ul class="dropdown-menu">
      <li><a tabindex="-1" href="#">Second level</a></li>
      <li class="dropdown-submenu">
        <a href="#">More..</a>
        <ul class="dropdown-menu">
        	<li><a href="#">3rd level</a></li>
        	<li><a href="#">3rd level</a></li>
        </ul>
      </li>
*/

function armaMenu( data ){
	//console.log(data);
	/*
	console.log( "arma Menu ");
	var menu = '<ul class = "nav navbar-nav">';
	for ( i = 0 ; i < data.menu.length; i++ ){
		var submenu = data.menu[i].submenu;

		menu += '<li class = "dropdown">';
		menu +=  '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + data.menu[i].title +'<b class="caret"></b></a>';
		
		menu += '<ul class="dropdown-menu">';

		for ( j = 0 ; j < submenu.length; j++ ){
			menu += '<li>';
				menu += '<li class="dropdown-submenu">';
				menu += '<a href="' + submenu[j].href + '">'+ submenu[j].title+ '</a>';
				menu += '<ul class="dropdown-menu">';
				menu += '<li><a href="#">3rd level</a></li>';
				menu += '</ul>';
				menu += '</li>';
			menu += '</li>';

		}
		menu += '</ul>';
	}
	
	menu += '</ul>'

	return menu;
	*/
	var i = 0;
	var menu = '<ul class="nav navbar-nav" role="menu" aria-labelledby="dropdownMenu" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">';
	for ( i = 0; i < data.menu.length; i++ ){
		var submenu = data.menu[i].submenu;
		menu += '<li class="dropdown-submenu">';
		menu += '<a tabindex = "-1" href="#" class="dropdown-toggle" data-toggle="dropdown">' + data.menu[i].title +'<b class="caret"></b></a>';
		menu += '<ul class="dropdown-menu">';
			for ( j = 0; j < submenu.length; j++){
				//<a tabindex="-1" href="#">Second level</a><menu += '<li><a tabindex="-1" href="#">Second level</a></li>';
				menu += '<li class="dropdown-submenu">';
				menu += '<a href="' + submenu[j].href + '">'+ submenu[j].title+ '</a>';
				menu += '<ul class="dropdown-menu">';
				var subsubmenu = submenu[j].subsubmenu;
				console.log("subsubmenu",subsubmenu,subsubmenu.length);
				for ( k = 0; k < subsubmenu.length; k++ ){
					menu += '<li>';
					menu += '<a href="' + subsubmenu[k].href + '">'+ subsubmenu[k].title+ '</a>';
					menu += '</li>';
				}
				
				//console.log("submenu", submenu[j]);
				menu += '</ul>';
				menu += '</li>';

			}
	    menu += '</ul>';
	}
	menu += '</ul>';

	//var html = '<ul class="nav navbar-nav" role="menu" aria-labelledby="dropdownMenu" style="display: block; position: static; margin-bottom: 5px; *width: 180px;">';
	//html += '<li class="dropdown-submenu">';
	//html += '<a tabindex="-1" href="#">More options</a>';
	//html += '<ul class="dropdown-menu">';
	//html += '<li><a tabindex="-1" href="#">Second level</a></li>';
	/*
	//html += '<li class="dropdown-submenu">';
	//html += '<a href="#">More..</a>';
	html += '<ul class="dropdown-menu">';
	html += '<li><a href="#">3rd level</a></li>';
	html += '<li><a href="#">3rd level</a></li>';
	html += '</ul>';
	html += '</li>';
	html += '<li><a href="#">Second level</a></li>';
	html += '</ul>';
	html += '</li>';
	html += '</ul>';
	*/
/*
var html = '<ul class="nav nav-pills">';
    html += '<li class="active"><a href="#">Regular link</a></li>';
    html += '<li class="dropdown">';
    html += '<a href="#" data-toggle="dropdown" class="dropdown-toggle">Dropdown <b class="caret"></b></a>';
    html +=  '<ul class="dropdown-menu" id="menu1">';
       html += '<li class="dropdown-submenu">';
          html += '<a href="#">More options</a>';
          html += '<ul class="dropdown-menu">';
           html += '<li><a href="#">Second level link</a></li>';
           html += '<li><a href="#">Second level link</a></li>';
            html += '<li><a href="#">Second level link</a></li>';
            html += '<li><a href="#">Second level link</a></li>';
            html += '<li><a href="#">Second level link</a></li>';
          html += '</ul>';
        html += '</li>';
        html += '<li><a href="#">Another action</a></li>';
        html += '<li><a href="#">Something else here</a></li>';
        html += '<li class="divider"></li>';
        html += '<li><a href="#">Separated link</a></li>';
      html += '</ul>';
    html += '</li>';
    html += '<li class="dropdown">';
      html += '<a href="#">Menu</a>';
    html += '</li>';
    html += '<li class="dropdown">';
      html += '<a href="#">Menu</a>';
    html +='</li>';
html += '</ul>';
*/

     return menu;

}
$('#logout').click(function(){
    localStorage.clear();
});
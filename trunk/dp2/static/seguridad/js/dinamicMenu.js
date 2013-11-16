/*

 Menú dinámico.
  - { PRE: TOKEN }
  - { POST: MENU CARGADO }

*/



$(document).ready(function(){

    var idRol=localStorage.getItem("idRol");
    if(idRol==1){
    		
    		//menu para el GP 
			var jqxhr = $.getJSON( "http://www.json-generator.com/j/cvKZvGhpRu?indent=4", function() {
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
         	var jqxhr = $.getJSON( "http://www.json-generator.com/j/bOPlzSahDS?indent=4", function() {
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
     	var jqxhr = $.getJSON( "http://www.json-generator.com/j/cbaxomKqDC?indent=4", function() {
			}).done(function( data ) {
			    	var menu = armaMenu( data );
			    	//console.log(menu);
			    	$("#seguridadMenu").html(menu);
			})


     }


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
//Variables globales
var listaRed;
var dataAJAX;

var xIni = 1;
var yIni = 100;

//Factor que se mueve en el mismo bloque
var factorXEnB = 150;
var factorYEnB = 70;

//Factor que se mueve de bloque en bloque
var factorX = 500;
var factorY = 100;

//Posicion actual -> Va variando
var x = 1;
var y = 1;

//Posicion de los titulos de cada bloque
var xTitulo = 1;
var yTitulo = 1;
var borderColorT = '#63449A';
var borderWidthT = 3;

//Parametros del diagrama
var widthDiagram = 1200;
var heightDiagram = 620;

//Parametros de dibujo de los cuadraditos
var width = 120;
var height = 70;
var anchoPita = '3';
var anchoPitaC = '6';
var borderColor = '#AAAAAA';
var borderWidth = '1';
var borderColorC = '#B32323';
var borderWidthC = '5';


//Lista de actividades en un bloque determinado
var actXBloque;
var cantActXBloque = 0;


//Cogue del local Storage
var idProyecto;
if (localStorage.getItem("idProyecto")){
	idProyecto = localStorage.getItem("idProyecto");
}
else {
	idProyecto = "1";
}


//Diagrama general
var diagram;


function cargarDatos(){
	
	var objProy ={
		idProyecto : idProyecto
	}
	
	var rootURL = "../../../api/CR_getDependencias/"+JSON.stringify(objProy);
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", 
        success: function(data){
        	console.log("Data Recibida: ");
        	console.log(data);
        	dataAJAX = data;
        	listaRed = data.listaRed;
        	iniciarFiesta()
        }
	});
}

function crearConexionNodos(id_from,id_to,pitaSize){
	if((id_from != undefined) && (id_to != undefined)){
		diagram.addConnection(new Connection(id_from,'e',id_to,'w','#AA0000', pitaSize));
	}
}

function crearNodo(id_actividad,nombre_actividad, posX, posY, colorBorde, anchoBorde, widthN, heightN){
	if(id_actividad != undefined){
		diagram.addNode(new Node({
			'nodeId': id_actividad,
			'nodeType':'NODE',
			'nodeContent': nombre_actividad,
			'xPosition':posX,
			'yPosition':posY,
			'width': widthN,
			'height' : heightN,
			'bgColor':'#FFFFFF',
			'borderColor':colorBorde,
			'borderWidth':anchoBorde,
			'fontColor':'#000000',
			'fontSize':'',
			'fontType':'',
			'minHeight':50,
			'maxHeight':200,
			'minWidth':100,
			'maxWidth':200,
			'nPort':true,
			'ePort':true,
			'sPort':true,
			'wPort':true,
			'image':'',
			'draggable':false,
			'resizable':false,
			'editable':false,
			'selectable':false,
			'deletable':false,
			'nPortMakeConnection': true,
			'ePortMakeConnection': true,
			'sPortMakeConnection': true,
			'wPortMakeConnection': true,
			'nPortAcceptConnection': true,
			'ePortAcceptConnection': true,
			'sPortAcceptConnection': true,
			'wPortAcceptConnection': true
		}));
	}
}

function imprimirHijos(padre,rX,rY){
	$.each(actXBloque,function(r,re){
		if(re.marcado != 1){
			var arrPapis = re.predecesores.split(',');
			
			if ($.inArray(padre,arrPapis) != -1){//si es que es su hijo...
				if(re.EsCritico == 0){
					crearNodo(re.id_actividad,re.nombre_actividad,rX,rY,borderColor,borderWidth, width, height);
				}
				else{
					crearNodo(re.id_actividad,re.nombre_actividad,rX,rY,borderColorC,borderWidthC, width, height);
				}
				re.marcado = 1;
				imprimirHijos(re.id_actividad,rX + factorXEnB,rY);
				rX = rX;
				rY = rY + factorYEnB;
				y = rY;
			}			
		}
	});
}

function imprimirTituloDelBloque(bloque, rX, rY){
	crearNodo('-1',"Bloque: " + bloque,rX,rY,borderColorT,borderWidthT, factorX, height);
}

function cantidadDeActividadesEnElBloque(actividadesEnBloque){
	//console.log("Hallando los niveles");
	//console.log(actividadesEnBloque);
	cantActXBloque = 0;
	
	$.each(actividadesEnBloque, function(e,el){
		el.numero_fila = 0;
		el.predecesores_id = 0;
	});
	
	$.each(actividadesEnBloque, function(e,el){
		el.predecesores_id = 1; //aca manejo si es que ha sido recorridos
		
		$.each(actividadesEnBloque, function(e1,el1){
			var arrPredecesores = el1.predecesores.split(',');
			
			if((el1.predecesores_id != 1) && ($.inArray(el.id_actividad,arrPredecesores) != -1)){
				el1.numero_fila = Math.max(el.numero_fila + 1,el1.numero_fila);
				el1.predecesores_id = 1;
			}
		});
	});
	
	$.each(actividadesEnBloque,function(e,el){
		cantActXBloque = Math.max(cantActXBloque, el.numero_fila);
	});
	
	cantActXBloque++;
	//console.log(cantActXBloque);
	
}

function iniciarFiesta(){
		
	//Creo el diagrama general
	diagram = new Diagram({
		'xPosition':20, 
		'yPosition':30, 
		'width':widthDiagram, 
		'height':heightDiagram,
		'imagesPath': '../../../static/cronograma/pirateado/images/',
		'connectionColor': '#AA0000',
		onSave: function(data){
			alert('from on save event \n' +data);
		}
	});	
	
	//Inicializo los valores para el tama–o de cada bloque
	factorX = widthDiagram / dataAJAX.cantBloques;
	
	console.log("Inicio de la impresion de diagrama de red...");
	console.log(listaRed);
		
	//Recorro todos los bloques y dibujo todas las actividades
	for(var b = 0; b < dataAJAX.cantBloques; b++){ //hasta listaRed.cantBloques
		//console.log("Bloque actual: " + b);
				
		//Obtener las actividades del bloque
		actXBloque = new Array();

		var n = 0;
		$.each(listaRed,function(e,el){
			if(el.bloque == b){
				actXBloque[n] = el;
				n++;
			}
		});
		//Fin obtener actividades del bloque
		
		console.log("Actividades por el bloque: " + b);
		console.log(actXBloque);
		
		//Inicializo el factor de movimiento en este bloque
		//Calculo cantActXBloque (niveles en el bloque)
		cantidadDeActividadesEnElBloque(actXBloque);
		console.log("Cantidad de niveles en el bloque = " + cantActXBloque);
		
		factorXEnB = factorX / cantActXBloque;
		//Fin Inicializar el factor de movimiento en este bloque

		//Inicializar X e Y
		x = xIni + (b * factorX);
		y = yIni;
		//Fin inicializar X e Y
		
		//Inicializar la posicion del titulo del bloque
		xTitulo = x;
		yTitulo = y - 70;
		
		imprimirTituloDelBloque(b, xTitulo, yTitulo);
		//Fin inicializar la posicion del titulo del bloque
		
		//Recorro la lista de las actividades que pertenecen al bloque en el que estoy
		//actXBloque
		$.each(actXBloque,function(e,el){
			
			//Dibujar si es que aun no se ha dibujado (marcado == 0)
			if(el.marcado == 0){
				//imprimir el nodo
				if(el.EsCritico == 0){
					crearNodo(el.id_actividad, el.nombre_actividad,x,y,borderColor,borderWidth, width, height);
					
				}
				else{
					crearNodo(el.id_actividad, el.nombre_actividad,x,y,borderColorC,borderWidthC, width, height);
				}
				//marcar el nodo como  ya impreso
				el.marcado = 1;//0->no dibujado ni conectado, 1-> dibujado, 2->conectado y dibujado		
				
				//recursiva imprimirHijosEnBloque(padre,x,y,actxbloq)
				imprimirHijos(el.id_actividad, x + factorXEnB, y /*+ factorYEnB*/);
				
				//Aumento la posicion en la que estoy
				x = x;
				y = y ;
				
			}
			
		});
		//Fin recorro la lista
		
		
	}
	//Fin recorro todos los bloques
	
	
	//Una vez que ya estan dibujadas todas las actividades las recorro y las conecto entre si
	$.each(listaRed,function(e,el){
		if(el.marcado != 2){ //si no lo han conectado aun con su/sus padre(s)...
			
			if(el.predecesores != ""){//si no tiene predecesores
				
				var arrPapis = el.predecesores.split(',');
				
				$.each(arrPapis,function(p,pa){					
					crearConexionNodos(pa,el.id_actividad,anchoPita);					
				});
				
			}
			
			el.marcado = 2;
			
		}
	});
}

$(document).ready(function() {
	cargarDatos();	
});

//Variables globales
var listaRed;
var xIni = 1;
var yIni = 30;

//Factor que se mueve en el mismo bloque
var factorXEnB = 30;
var factorYEnB = 30;

//Factor que se mueve de bloque en bloque
var factorX = 100;
var factorY = 30;

//Posicion actual
var x = 1;
var y = 1;

//Parametros de dibujo de los cuadraditos
var width = 10;
var height = 10;
var anchoPita = '3';
var anchoPitaC = '6';
var borderColor = '#AAAAAA';
var borderWidth = '1';
var borderColorC = '#BBBBBB';
var borderWidthC = '5';


//Lista de actividades en un bloque determinado
var actXBloque;



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
        	listaRed = data;
        	iniciarFiesta()
        }
	});
}

function crearConexionNodos(id_from,id_to,pitaSize){
	if((id_from != undefined) && (id_to != undefined)){
		diagram.addConnection(new Connection(id_from,'n',id_to,'s','#AA0000', pitaSize));
	}
}

function crearNodo(id_actividad,nombre_actividad, posX, posY, colorBorde, anchoBorde){
	if(id_actividad != undefined){
		diagram.addNode(new Node({
			'nodeId': id_actividad,
			'nodeType':'NODE',
			'nodeContent': 'Outcomexxx',
			'xPosition':posX,
			'yPosition':posY,
			'width': '120',
			'height' : '70',
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
			'draggable':true,
			'resizable':true,
			'editable':true,
			'selectable':true,
			'deletable':true,
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
				if(re.esCritico == 0){
					crearNodo(re.id_actividad,re.nombre_actividad,rX,rY,borderColor,borderWidth);
				}
				else{
					crearNodo(re.id_actividad,re.nombre_actividad,rX,rY,borderColorC,borderWidthC);
				}
				re.marcado = 1;
				imprimirHijos(re.id_actividad,rX + factorXEnB,rY);
				rX = rX;
				rY = rY + factorYEnB;
			}			
		}
	});
}

function iniciarFiesta(){
		
	//Creo el diagrama general
	diagram = new Diagram({
		'xPosition':20, 
		'yPosition':30, 
		'width':1024, 
		'height':620,
		'imagesPath': '../../../static/cronograma/pirateado/images/',
		'connectionColor': '#AA0000',
		onSave: function(data){
			alert('from on save event \n' +data);
		}
	});	
	
	console.log("Inicio de la impresion de diagrama de red...");
	console.log(listaRed);
		
	//Recorro todos los bloques y dibujo todas las actividades
	for(var b = 0; b < listaRed.cantBloques; b++){ //hasta listaRed.cantBloques
		console.log("Bloque actual: " + i);
				
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
		
		//Inicializar X e Y
		x = xIni + (b * factorX);
		y = yIni;
		//Fin inicializar X e Y
		
		//Recorro la lista de las actividades que pertenecen al bloque en el que estoy
		//actXBloque
		$.each(actXBloque,function(e,el){
			
			//Dibujar si es que aun no se ha dibujado (marcado == 0)
			if(el.marcado == 0){
				//imprimir el nodo
				if(el.esCritico == 0){
					crearNodo(el.id_actividad, el.nombre_actividad,x,y,borderColor,borderWidth);
				}
				else{
					crearNodo(el.id_actividad, el.nombre_actividad,x,y,borderColorC,borderWidthC);
				}
				//marcar el nodo como  ya impreso
				el.marcado = 1;//0->no dibujado ni conectado, 1-> dibujado, 2->conectado y dibujado		
				
				//recursiva imprimirHijosEnBloque(padre,x,y,actxbloq)
				imprimirHijos(el.id_actividad, x + factorXEnB, y);
				
				//Aumento la posicion en la que estoy
				x = x;
				y = y + factorYEnB;
				
			}
			
		});
		//Fin recorro la lista
		
		
	}
	//Fin recorro todos los bloques
	
	
	//Una vez que ya estan dibujadas todas las actividades las recorro y las conecto entre si
	$.each(listaRed,function(e,el){
		if((el.marcado != 2) && (el.predecesores != undefined)){ //si no lo han conectado aun con su/sus padre(s)...
			
			var arrPapis = el.predecesores.split(',');
			
			$.each(arrPapis,function(p,pa){
				if (el.esCritico == 0){
					crearConexionNodos(pa,el.id_actividad,anchoPita);
				}
				else{
					crearConexionNodos(pa,el.id_actividad,anchoPitaC);
				}
			});
			
			el.marcado = 2;
			
		}
	});
	
	diagram.addNode(new Node({
		'nodeId': '1',
		'nodeType':'NODE',
		'nodeContent': 'Outcomexxx',
		'xPosition':x,
		'yPosition':y,
		'width': '120',
		'height' : '70',
		'bgColor':'#FFFFFF',
		'borderColor':'#AAAAAA',
		'borderWidth':'1',
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
		'draggable':true,
		'resizable':true,
		'editable':true,
		'selectable':true,
		'deletable':true,
		'nPortMakeConnection': true,
		'ePortMakeConnection': true,
		'sPortMakeConnection': true,
		'wPortMakeConnection': true,
		'nPortAcceptConnection': true,
		'ePortAcceptConnection': true,
		'sPortAcceptConnection': true,
		'wPortAcceptConnection': true
	}));
	
	
	
	
	
	
	diagram.addNode(new Node({
				'nodeId': '2',
				'nodeType':'NODE',
				'nodeContent': 'Output',
				'xPosition':1,
				'yPosition':1,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '3',
				'nodeType':'NODE',
				'nodeContent': 'Output',
				'xPosition':400,
				'yPosition':350,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '4',
				'nodeType':'NODE',
				'nodeContent': 'Output',
				'xPosition':600,
				'yPosition':350,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '5',
				'nodeType':'NODE',
				'nodeContent': 'Activity',
				'xPosition':194,
				'yPosition':450,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '6',
				'nodeType':'NODE',
				'nodeContent': 'Activity',
				'xPosition':394,
				'yPosition':450,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '7',
				'nodeType':'NODE',
				'nodeContent': 'Activity',
				'xPosition':530,
				'yPosition':450,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
				'fontColor':'#000000',
				'fontSize':'',
				'fontType':'',
				'minHeight':50,
				'maxHeight':100,
				'minWidth':100,
				'maxWidth':200,
				'nPort':true,
				'ePort':true,
				'sPort':true,
				'wPort':true,
				'image':'',
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '8',
				'nodeType':'NODE',
				'nodeContent': 'Activity',
				'xPosition':690,
				'yPosition':450,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	
	diagram.addNode(new Node({
				'nodeId': '9',
				'nodeType':'NODE',
				'nodeContent': 'Goal',
				'xPosition':200,
				'yPosition':150,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '10',
				'nodeType':'NODE',
				'nodeContent': 'Goal',
				'xPosition':412,
				'yPosition':150,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
				'draggable':true,
				'resizable':true,
				'editable':true,
				'selectable':true,
				'deletable':true,
				'nPortMakeConnection': true,
				'ePortMakeConnection': true,
				'sPortMakeConnection': true,
				'wPortMakeConnection': true,
				'nPortAcceptConnection': true,
				'ePortAcceptConnection': true,
				'sPortAcceptConnection': true,
				'wPortAcceptConnection': true
	
			}));
	
	
	diagram.addNode(new Node({
				'nodeId': '11',
				'nodeType':'NODE',
				'nodeContent': 'Goal',
				'xPosition':600,
				'yPosition':150,
				'width': '120',
				'height' : '70',
				'bgColor':'#FFFFFF',
				'borderColor':'#AAAAAA',
				'borderWidth':'1',
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
		'draggable':true,
		'resizable':true,
		'editable':true,
		'selectable':true,
		'deletable':true,
		'nPortMakeConnection': true,
		'ePortMakeConnection': true,
		'sPortMakeConnection': true,
		'wPortMakeConnection': true,
		'nPortAcceptConnection': true,
		'ePortAcceptConnection': true,
		'sPortAcceptConnection': true,
		'wPortAcceptConnection': true
	
	}));
	
	diagram.addConnection(new Connection('2','n','1','s','#AA0000', '3'));
	diagram.addConnection(new Connection('3','n','1','s','#AA0000', '3'));
	diagram.addConnection(new Connection('4','n','1','s','#AA0000', '3'));
	diagram.addConnection(new Connection('5','n','2','s','#AA0000', '3'));
	diagram.addConnection(new Connection('6','n','3','s','#AA0000', '3'));
	diagram.addConnection(new Connection('7','n','4','s','#AA0000', '3'));
	diagram.addConnection(new Connection('8','n','4','s','#AA0000', '3'));
	diagram.addConnection(new Connection('1','n','9','s','#AA0000', '3'));
	diagram.addConnection(new Connection('1','n','10','s','#AA0000', '3'));
	diagram.addConnection(new Connection('1','n','11','s','#AA0000', '3'));
	
}

$(document).ready(function() {
	cargarDatos();	
});

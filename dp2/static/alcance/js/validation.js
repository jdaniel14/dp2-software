function clearErrors(){
	$(".errorMsg").remove();
	$(".has-error").removeClass("has-error");
}

function addErrorMsg(elementId,message){
	var spanError = '<span class="errorMsg help-block">'+message+'</span>';
	$('#'+elementId).parent().addClass("has-error");
	$('#'+elementId).parent().append(spanError);
}

function validateMandatory(elementId, message){
	if ($('#'+elementId).val() == ""){
		addErrorMsg(elementId,message);
		return false;
	}
	return true;
}

function validateLength(elementId, minLength, maxLength, errorMsgMin, errorMsgMax){
	var text = $('#'+elementId).val();
	if(text.length < minLength){
		addErrorMsg(elementId,errorMsgMin);
		return false;
	}
	if(text.length > maxLength){
		addErrorMsg(elementId,errorMsgMax);
		return false;
	}
	return true;
}

function validateInteger(elementId , min, max, errorMsgRange, errorMsg){
	if ($('#'+elementId).val() == "") return true;
	var val = parseFloat($('#'+elementId).val());
	if(isNaN(val) ||  val % 1 != 0){
		addErrorMsg(elementId,errorMsg);
		return false;
	}
	if (val < min || val > max ){
		addErrorMsg(elementId,errorMsgRange);
		return false;
	}
	return true;
}

function validateFloat(elementId , min, max, errorMsgRange, errorMsg){
	if ($('#'+elementId).val() == "") return true;
	var val = parseFloat($('#'+elementId).val());
	if(isNaN(val)){
		addErrorMsg(elementId,errorMsg);
		return false;
	}
	if (val < min || val > max ){
		addErrorMsg(elementId,errorMsgRange);
		return false;
	}	
	return true;
}

function validateEmail(elementId, errorMsg){//beta!
	var val = $('#'+elementId).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)){
    	addErrorMsg(elementId,errorMsg);
		return false;
    }
    return true;
}

function validateExtention(elementId, validExtentions ,errorMsg){
	var validList = validExtentions.split("|");
	var tokens = ($('#'+elementId)[0].files[0].name).split(".");
	var ext = tokens[tokens.length - 1];
	if(validList.indexOf(ext) == -1){
		addErrorMsg(elementId,errorMsg);
		return false;
	}
	return true;
}

function showAlert(formId ,valid, successMsg, errorMsg){
	$(".alert").remove();
	var divClass;
	var msg;
	if(valid){
		divClass = 'class="alert alert-success"';
		msg = successMsg;
	}
	else{
		divClass = 'class="alert alert-danger"';
		msg = errorMsg;
	}
	$("#"+formId).prepend('<div '+divClass+'>'+msg+'</div>');
}


function validarPaqueteTrabajo(){
	clearErrors(); //limpiar los errores anteriores
	var camposValidos = true;//comenzar a validar campos 
	//la variable camposValidos siempre debe ir al final para evitar lazy evaluation
	camposValidos = validateInteger("dias", 0 , Number.POSITIVE_INFINITY, "Debe ingresar un número positivo","Debe ingresar un número entero") && camposValidos;
	camposValidos = validateFloat("costo",0 , Number.POSITIVE_INFINITY, "Debe ingresar un número positivo","Debe ingresar un número real") && camposValidos;
	camposValidos = validateInteger("numero_personas",0,Number.POSITIVE_INFINITY,"Debe ingresar un número positivo","Debe ingresar un número entero") && camposValidos;
	camposValidos = validateMandatory("descripcion","el campo es obligatorio") && camposValidos;
	showAlert("form-paquete",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
	return camposValidos;
}



function validarAlcance(){
	clearErrors(); //limpiar los errores anteriores
	var camposValidos = true;//comenzar a validar campos 
	//la variable camposValidos siempre debe ir al final para evitar lazy evaluation
	camposValidos = validateMandatory("descripcion","El campo es obligatorio") && camposValidos;
	camposValidos = validateMandatory("alcance_producto","El campo es obligatorio") && camposValidos;
	camposValidos = validateFloat("version",0 , Number.POSITIVE_INFINITY, "Debe ingresar un número positivo","Debe ingresar un número real") && camposValidos;
	showAlert("form-alcance",camposValidos,"Se guardaron los cambios","Hay errores en el formulario");
	return camposValidos;
}



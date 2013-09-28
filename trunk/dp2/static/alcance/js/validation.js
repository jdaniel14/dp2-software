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
	}
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

function validarPaqueteTrabajo(){
	clearErrors();
	var camposValidos = true;
	camposValidos = validateInteger("dias", 0 , Number.POSITIVE_INFINITY, "Debe ingresar un número positivo","Debe ingresar un número entero") && camposValidos;
	camposValidos = validateFloat("costo",0 , Number.POSITIVE_INFINITY, "Debe ingresar un número positivo","Debe ingresar un número real") && camposValidos;
	camposValidos = validateInteger("numero_personas",0,Number.POSITIVE_INFINITY,"Debe ingresar un número positivo","Debe ingresar un número entero") && camposValidos;
	camposValidos = validateMandatory("descripcion","el campo es obligatorio");
	return camposValidos;
}
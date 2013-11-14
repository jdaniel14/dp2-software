function onElementError(element){
	element.className = element.className + " has-error";
}

function onSelectorError(selector){
	$(selector).addClass("has-error");
}

function elementValidateMandatory(element, message = "El campo es oligatorio"){
	if (element.value == ""){
		onElementError(element);
		return false;
	}
	return true;
}

function elementValidateLength(element, minLength =0 , maxLength = 1000, errorMsgMin = "Ingrese por lo menos un carater", errorMsgMax = "Ingrese menos de 1000 caracteres"){
	var text = element.value;
	if(text.length < minLength){
		onElementError(element);
		return false;
	}
	if(text.length > maxLength){
		onElementError(element);
		return false;
	}
	return true;
}

function elementValidateInteger(element , min=0, max= Number.POSITIVE_INFINITY, errorMsgRange="Ingrese un número entero mayor que 0", errorMsg="Ingrese un número entero"){
	if (element.value == "") return true;
	var val = parseFloat(element.value);
	if(isNaN(val) ||  val % 1 != 0){
		onElementError(element);
		return false;
	}
	if (val < min || val > max ){
		onElementError(element);
		return false;
	}
	return true;
}

function elementValidateFloat(element , min=0, max= Number.POSITIVE_INFINITY, errorMsgRange="Ingrese un número positivo, errorMsg="Ingrese un número real"){
	if (element.value == "") return true;
	var val = parseFloat(element.value);
	if(isNaN(val)){
		onElementError(element);
		return false;
	}
	if (val < min || val > max ){
		onElementError(element);
		return false;
	}	
	return true;
}

function elementValidateEmail(element, errorMsg="Ingrese un e-mail valido"){//beta!
	var val = element.value;
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)){
    	onElementError(element);
		return false;
    }
    return true;
}

function selectorValidateMandatory(selector,  message = "El campo es oligatorio"){
	if ($(selector).val() == ""){
		onSelectorError(selector);
		return false;
	}
	return true;
}

function selectorValidateLength(selector, minLength =0 , maxLength = 1000, errorMsgMin = "Ingrese por lo menos un carater", errorMsgMax = "Ingrese menos de 1000 caracteres"){
	var text = $(selector).val();
	if(text.length < minLength){
		onSelectorError(selector);
		return false;
	}
	if(text.length > maxLength){
		onSelectorError(selector);
		return false;
	}
	return true;
}

function validateInteger(selector , min=0, max= Number.POSITIVE_INFINITY, errorMsgRange="Ingrese un número entero mayor que 0", errorMsg="Ingrese un número entero"){
	if ($(selector).val() == "") return true;
	var val = parseFloat($('#'+elementId).val());
	if(isNaN(val) ||  val % 1 != 0){
		onSelectorError(selector);
		return false;
	}
	if (val < min || val > max ){
		onSelectorError(selector);
		return false;
	}
	return true;
}

function selectorValidateFloat(selector , min=0, max= Number.POSITIVE_INFINITY, errorMsgRange="Ingrese un número positivo, errorMsg="Ingrese un número real"){
	if ($(selector).val() == "") return true;
	var val = parseFloat($('#'+elementId).val());
	if(isNaN(val)){
		onSelectorError(selector);
		return false;
	}
	if (val < min || val > max ){
		onSelectorError(selector);
		return false;
	}	
	return true;
}

function selectorValidateEmail(selector, errorMsg="Ingrese un e-mail valido"){//beta!
	var val = $(selector).val();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)){
    	onSelectorError(selector);
		return false;
    }
    return true;
}
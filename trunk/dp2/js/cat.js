var rootURL = "api/efectopucp";
var arr = [];
var pointer = 0;
// Retrieve wine list when application starts 
findCatAll();

$("#imgizq").click(function(){
	pointer++;
	if ( pointer >= arr.length ) pointer = 0;
	$("#imgder").html(addphoto(arr[pointer]));
	addConsole("Click Izquierdo");
	addConsole(arr[pointer] + " loaded");
});

$("#imgder").click(function(){
	pointer++;
	if ( pointer >= arr.length ) pointer = 0;
	$("#imgizq").html(addphoto(arr[pointer]));
	addConsole("Click Derecho");
	addConsole(arr[pointer] + " loaded");
});

function addConsole(param){
	var html = "<p>$[dp2]_:";
	html += param;
	html += "</p>";
	$("#parameters").prepend(html);
}

function findCatAll(){
	addConsole("Service " + rootURL);
	console.log('findCatAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
}

function addphoto( photo ){
	var html = '<img  src="';
	html += photo + '"'; 
	html += 'width="400" height="200" alt="" >';
	return html;
}

function renderList(data) {
	arr = data;
	console.log(arr);
	$("#imgizq").html(addphoto(data[0]));
	$("#imgder").html(addphoto(data[1]));
	pointer += 2;
	addConsole(data[0] + " loaded");
	addConsole(data[1] + " loaded");
}

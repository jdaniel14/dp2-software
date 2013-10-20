$("#buscarResponsable").click(function(){
	console.log("buscarResponsable");
	$('#myModal').modal('show');
	/*

	 validacion de suma
		- actualizacion
		- mostrar loader
		- valor negativo
		- validar routing
		activities close -> not edt
		-packages level (cronograma actividades completas)
		estados (revisado,  aceppted, aprobado
			- archivos permitidos mostrar :)
			  - tipo de documentos
		activities close -> not edt
		
		)

		Cosas por hacer:

		- Hacer la validación de suma, según formula: Padres = sumatoria(hijos.tiempo)
			- Si la suma de sus hijos es mayor a la del padre, se actualizará el padre, y saldra
			  advertencia de actualización		  
	
		- Fixear el problema de actualizar (F5), para que el metodo solo sea llamado una sola vez
			- O en su defecto mejorar el flujo de trabajo para que se tenga que hacer el (F5)
		- mostrar barra de cargado (loader) para que el usuario sepa cuando termina el servicio de @guardar EDT

		- Agregar verificación de valor negativo a los campos del EDT

		- Validar Routing
		- Las actividades cerradas

		 - A nivel de paquetes ( Cronograma, Actividades completas )

		 - Estados ( Revisado, aceptado, aprobado )

		 - Mostrar listas de archivos permitidos (Ejemplo: .txt, .doc, .docx)

		
	*/
});
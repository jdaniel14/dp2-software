package com.dp2.gproyectos;


public class ServerConstants {
	public static String SERVER_URL = "http://200.16.7.112/trunk/dp2/api/";
	//public static String SERVER_URL = "http://localhost:8080/dp2/api/";
	
	//PRUEBA
	public static String GET_PRUEBA_URL = "efectopucp";
	
	//GENERAL
	public static String GENERAL_GETLISTAPROYECTOS_URL = "G_listaProyecto";
	public static String GENERAL_VALIDARLOGIN_URL = "G_verificaUsuario";
	public static String GENERAL_GETLISTALECCIONES_URL = "G_devuelveLeccionesAprendidas";
	public static String GENERAL_LISTARECURSOSXPROYECTO_URL = "/G_devuelveListaEmpleadosXProyecto/";
	public static String GENERAL_GETINFOPROYECTO_URL = "G_devuelveInfoProyecto/";
	public static String GENERAL_GETESTADOLINEABASE_URL = "/G_verificaLineaBase/";
	
	
	//COSTOS
	public static String COSTOS_CO_GETLISTAINDICADORES_URL = "CO_obtenerIndicadores";
	public static String COSTOS_CO_GETHISTORIALINDICADOR_URL = "CO_obtenerHistorialIndicador";
	public static String COSTOS_CO_YOLO_URL = "CO_test";
	public static String COSTOS_TEST_IMAGE = "http://200.16.7.112/movil/etc/morde_jungla.png";
	
	//Cronograma
	public static String CronogramaGetActividades = "CR_getListaActividad";
	public static String CronogramaGetDetalleActividad = "CR_getDetalleActividad";
	public static String CronogramaGuardarActividades = "CR_updateAvanceActividad";
	public static String CronogramaGetRecursosPorActividad = "CR_getRecursosActividad";
	public static String CronogramaPostUpdateAvanceRecurso = "CR_updateAvanceRecurso";
	public static String CronogramaGetIndicadoresFlujo = "CR_getIndicadoresFlujo";
	public static String CronogramaGetGanttHtml = "CR_getActividadesMovil";

}

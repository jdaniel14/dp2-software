CREATE FUNCTION `f_halla_min_dia`(id_proyecto INT) RETURNS date
BEGIN

DECLARE FECHA_MIN DATE;

SELECT
MIN(H.FECINI)  INTO FECHA_MIN
FROM
(
select
B.FECHA_PLAN_INICIO FECINI,
B.FECHA_PLAN_FIN FECFIN,
SUM(IFNULL(C.CANTIDADESTIMADA,0)*(IFNULL(D.COSTO_UNITARIO_ESTIMADO,0)*IFNULL(X.CAMBIO_A_SOL,0))) PRESUP_SOLES
from 
PROYECTO A LEFT JOIN ACTIVIDAD B ON A.ID_PROYECTO=B.ID_PROYECTO
LEFT JOIN ACTIVIDAD_X_RECURSO C ON B.ID_ACTIVIDAD=C.ID_ACTIVIDAD
LEFT JOIN RECURSO D ON C.ID_RECURSO=D.ID_RECURSO
LEFT JOIN CAMBIO_HISTORICO X ON D.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
WHERE
C.ESTADO<>0 AND B.PROFUNDIDAD<>0 AND B.ELIMINADO<>1 AND
DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
AND D.ESTADO<>'ELIMINADO' 
AND A.ID_PROYECTO=id_proyecto
GROUP BY
B.FECHA_PLAN_INICIO,
B.FECHA_PLAN_FIN
UNION
SELECT
B.FECHA_PLAN_INICIO_COSTO_FIJO FECINI,
B.FECHA_PLAN_FIN_COSTO_FIJO FECFIN,
SUM(B.COSTO_FIJO_DIARIO_ESTIMADO*(DATEDIFF(B.FECHA_PLAN_FIN_COSTO_FIJO,B.FECHA_PLAN_INICIO_COSTO_FIJO)+1)*X.CAMBIO_A_SOL) PRESUP_SOLES
FROM
PROYECTO A JOIN RECURSO B ON A.ID_PROYECTO=B.ID_PROYECTO
JOIN CAMBIO_HISTORICO X ON B.ID_CAMBIO_MONEDA=X.ID_CAMBIO_MONEDA
WHERE
A.ID_PROYECTO=id_proyecto AND B.ESTADO='ACTIVO' AND B.COSTO_FIJO_DIARIO_ESTIMADO>0
AND DATE_FORMAT(X.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
GROUP BY
B.FECHA_PLAN_INICIO_COSTO_FIJO,
B.FECHA_PLAN_FIN_COSTO_FIJO
UNION
SELECT
STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d') FECINI,
LAST_DAY(STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d')) FECFIN,
SUM(IFNULL(A.costo_ESTIMADO*B.CAMBIO_A_SOL,0)) PRESUP_SOLES
FROM
COSTO_INDIRECTO A JOIN CAMBIO_HISTORICO B ON A.ID_CAMBIO_MONEDA=B.ID_CAMBIO_MONEDA
JOIN PROYECTO Z ON A.ID_PROYECTO=Z.ID_PROYECTO
WHERE
A.ID_PROYECTO=id_proyecto AND DATE_FORMAT(B.FECHA,'%Y%m%d')=DATE_FORMAT(SYSDATE(),'%Y%m%d')
GROUP BY
STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d'),
LAST_DAY(STR_TO_DATE(CONCAT(A.CODMES,'01'),'%Y%m%d'))
) H;

RETURN FECHA_MIN;

END



|

CREATE FUNCTION `f_aplica_inflacion`( MONTO DOUBLE, FECINI DATE , FECFIN DATE) RETURNS double
BEGIN

	DECLARE MONTO_INFLADO DOUBLE;
	DECLARE UD DATE;
	DECLARE FI DATE;
	DECLARE FF DATE;
	DECLARE CONT INT;
	DECLARE DIAS INT;
	DECLARE PORC DOUBLE;
	DECLARE VAL_TEMP DOUBLE;
	DECLARE INFLA_ACUM DOUBLE;
	
	SET CONT =0;
	SET MONTO_INFLADO=0;
	SET INFLA_ACUM=1;
	SET FI=FECINI;
	SET FF=FECFIN;
	SET VAL_TEMP=0;
	SET DIAS=DATEDIFF(FF,FI)+1;
	SET UD=STR_TO_DATE(CONCAT(DATE_FORMAT(FI,'%Y'),'1231'),'%Y%m%d');


	WHILE (DATE_FORMAT(FF,'%Y%m%d')>DATE_FORMAT(UD,'%Y%m%d')) DO
	
		SET PORC=(DATEDIFF(UD,FI)+1)/DIAS;
		SET VAL_TEMP=MONTO*PORC;

		IF (CONT>0) THEN
			SET VAL_TEMP=INFLA_ACUM*VAL_TEMP*(SELECT 1+(PORCENTAJE/100) FROM INFLACION WHERE ANHO=DATE_FORMAT(FI,'%Y'));
		END IF;

		SET MONTO_INFLADO=MONTO_INFLADO+VAL_TEMP;
		IF (CONT>0) THEN
			SET INFLA_ACUM=INFLA_ACUM*(SELECT 1+(PORCENTAJE/100) FROM INFLACION WHERE ANHO=DATE_FORMAT(FI,'%Y'));
		END IF;

		SET FI=DATE_ADD(UD, INTERVAL 1 DAY);
		SET UD=STR_TO_DATE(CONCAT(DATE_FORMAT(FI,'%Y'),'1231'),'%Y%m%d');
		SET CONT=CONT + 1;
		

	END WHILE;

	SET PORC=(DATEDIFF(FF,FI)+1)/DIAS;
	SET VAL_TEMP=MONTO*PORC;

	IF (CONT>0) THEN
		SET VAL_TEMP=INFLA_ACUM*VAL_TEMP*(SELECT 1+(PORCENTAJE/100) FROM INFLACION WHERE ANHO=DATE_FORMAT(FI,'%Y'));
	END IF;

	SET MONTO_INFLADO=MONTO_INFLADO+VAL_TEMP;

	RETURN MONTO_INFLADO;

END



|

CREATE PROCEDURE `P_GE_grabar_linea_base`(IN id INT )
BEGIN

INSERT INTO
    `dp2_lineabase`.`PROYECTO`(id_proyecto,nombre_proyecto,flag_linea_base,prioridad,fecha_inicio_planificada,fecha_fin_planificada,fecha_inicio_real,fecha_fin_real,comentarios_cierre,lecciones_cierre,porcentaje_reserva,monto_sin_reserva,id_tipo_proyecto,descripcion_proyecto,acta_costos,acta_duracion,acta_calidad,acta_jefe_comite,acta_patrocinador,acta_f_preparacion,id_prioridad,estado,acta_objetivos,flag_linea_base_editable,linea_base_fecha_inicio,linea_base_fecha_fin,linea_base_activa, num_linea_base)
    SELECT id_proyecto,nombre_proyecto,flag_linea_base,prioridad,fecha_inicio_planificada,fecha_fin_planificada,fecha_inicio_real,fecha_fin_real,comentarios_cierre,lecciones_cierre,porcentaje_reserva,monto_sin_reserva,id_tipo_proyecto,descripcion_proyecto,acta_costos,acta_duracion,acta_calidad,acta_jefe_comite,acta_patrocinador,acta_f_preparacion,id_prioridad,estado,acta_objetivos,flag_linea_base_editable,linea_base_fecha_inicio,linea_base_fecha_fin,linea_base_activa, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
    FROM `dp2`.`PROYECTO` WHERE id_proyecto=id;

INSERT INTO
    `dp2_lineabase`.`MIEMBROS_EQUIPO`(id_miembros_equipo,id_proyecto,id_empleado,fecha_entrada,fecha_salida,estado,costo_empleado,porcentaje,id_rol,id_profesion_actual,num_linea_base)
    SELECT id_miembros_equipo,id_proyecto,id_empleado,fecha_entrada,fecha_salida,estado,costo_empleado,porcentaje,id_rol,id_profesion_actual, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
 FROM `dp2`.`MIEMBROS_EQUIPO` WHERE id_proyecto = id;

INSERT INTO
    `dp2_lineabase`.`LECCION_APRENDIDA`(id_leccion_aprendida,id_miembros_equipo,id_categoria_lec_aprendida,descripcion,fecha_registro,fecha_actualizacion,estado,num_linea_base)
	SELECT L.id_leccion_aprendida,L.id_miembros_equipo,L.id_categoria_lec_aprendida,L.descripcion,L.fecha_registro,L.fecha_actualizacion,L.estado, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
	FROM `dp2`.`LECCION_APRENDIDA` L, `dp2`.`MIEMBROS_EQUIPO` M
	WHERE
        L.id_miembros_equipo = M.id_miembros_equipo AND
        M.id_proyecto = id;

INSERT INTO
    `dp2_lineabase`.`DETALLE_CIERRE`(id_documentos_cierre, id_feedback, id_proyecto, valor_esperado, valor_logrado, num_linea_base)
    SELECT id_documentos_cierre, id_feedback, id_proyecto, valor_esperado, valor_logrado, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
    FROM `dp2`.`DETALLE_CIERRE` WHERE id_proyecto = id;

INSERT INTO
    `dp2_lineabase`.`SOLICITUD_CAMBIO`(id_solicitud_cambio, id_proyecto, estado, flag_cambio, justificacion, descripcion, num_linea_base)
    SELECT id_solicitud_cambio, id_proyecto, estado, flag_cambio, justificacion, descripcion, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
    FROM `dp2`.`SOLICITUD_CAMBIO` WHERE id_proyecto = id;

INSERT INTO
    `dp2_lineabase`.`OBJETIVO`(id_objetivo, id_proyecto, descripcion, flag_cumplido, comentarios, num_linea_base)
	SELECT id_objetivo, id_proyecto, descripcion, flag_cumplido, comentarios, (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=id)
    FROM `dp2`.`OBJETIVO` WHERE id_proyecto = id;

END



|

CREATE PROCEDURE `P_CR_GRABAR_LINEA_BASE`(IN ID INT )
BEGIN
  
  
 
INSERT INTO dp2_lineabase.ACTIVIDAD 
( 
id_actividad, 
nombre_actividad, 
id_proyecto, 
id_paquete_trabajo, 
id_asiento_contable, 
fecha_plan_inicio, 
fecha_plan_fin, 
fecha_actual_inicio, 
fecha_actual_fin, 
numero_fila, 
profundidad, 
predecesores, 
avance, 
costo, 
dias, 
estado, 
codigo, 
descripcion, 
inicio_hash, 
fin_hash, 
eliminado, 
hito_inicio, 
hito_fin, 
porc_avance_costo_estimado, 
num_linea_base 
) 
SELECT
id_actividad, 
nombre_actividad, 
id_proyecto, 
id_paquete_trabajo, 
id_asiento_contable, 
fecha_plan_inicio, 
fecha_plan_fin, 
fecha_actual_inicio, 
fecha_actual_fin, 
numero_fila, 
profundidad, 
predecesores, 
avance, 
costo, 
dias, 
estado, 
codigo, 
descripcion, 
inicio_hash, 
fin_hash, 
eliminado, 
hito_inicio, 
hito_fin, 
porc_avance_costo_estimado, 
(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID) 
FROM dp2.ACTIVIDAD 
WHERE
ID_PROYECTO=ID and eliminado=0; 
COMMIT; 
  
  
 
  
INSERT INTO dp2_lineabase.ACTIVIDAD_X_RECURSO 
( 
id_actividad, 
id_recurso, 
cantidadEstimada, 
cantidadReal, 
costo_unitario_real, 
id_tipo_costo, 
estado, 
num_linea_base 
) 
select *  
from (SELECT a.*,(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID) as 'num_linea_base' FROM dp2.ACTIVIDAD_X_RECURSO a, dp2.ACTIVIDAD b where b.id_proyecto=ID and a.id_actividad=b.id_actividad and a.estado=1) z; 
COMMIT; 
  
 
INSERT INTO dp2_lineabase.CALENDARIO_BASE 
( 
id_calendario_base, 
nombre, 
feriados, 
num_linea_base 
) 
  
select a.id_calendario_base,a.nombre,a.feriados, 
(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID) from dp2.CALENDARIO_BASE a, dp2.CALENDARIO_PROYECTO b where b.id_proyecto=1 and a.id_calendario_base=b.id_calendario_base; 
COMMIT; 
  
  
 
  
INSERT INTO dp2_lineabase.CALENDARIO_PROYECTO 
( 
id_proyecto, 
id_calendario_base, 
num_linea_base 
) 
select id_proyecto,id_calendario_base, 
(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID) from dp2.CALENDARIO_PROYECTO where id_proyecto=ID; 
COMMIT; 
  
END



|

CREATE PROCEDURE `P_CO_GRABAR_LINEA_BASE`(IN ID INT )
BEGIN



INSERT INTO dp2_lineabase.INDICADOR_X_PROYECTO
(id_indicador,
id_proyecto,
fecha,
valor,
id_indicador_x_proyecto,
num_linea_base)
SELECT
id_indicador,
id_proyecto,
fecha,
valor,
id_indicador_x_proyecto,
(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID)
FROM
dp2.INDICADOR_X_PROYECTO
WHERE
ID_PROYECTO=ID;

INSERT INTO dp2_lineabase.RECURSO
(
id_recurso,
id_unidad_medida,
descripcion,
id_proyecto,
id_miembros_equipo,
esta_aceptado,
costo_unitario_estimado,
id_cambio_moneda,
estado,
costo_fijo_diario_estimado,
costo_fijo_diario_real,
fecha_plan_inicio_costo_fijo,
fecha_plan_fin_costo_fijo,
fecha_real_inicio_costo_fijo,
fecha_real_fin_costo_fijo,
num_linea_base
)
SELECT
id_recurso,
id_unidad_medida,
descripcion,
id_proyecto,
id_miembros_equipo,
esta_aceptado,
costo_unitario_estimado,
id_cambio_moneda,
estado,
costo_fijo_diario_estimado,
costo_fijo_diario_real,
fecha_plan_inicio_costo_fijo,
fecha_plan_fin_costo_fijo,
fecha_real_inicio_costo_fijo,
fecha_real_fin_costo_fijo,
(SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE ID_PROYECTO=ID)
FROM
dp2.RECURSO
WHERE
ID_PROYECTO=ID;

COMMIT;

END



|

CREATE PROCEDURE `P_AL_GRABAR_LINEA_BASE`(IN ID INT )
BEGIN
    DECLARE ID_EDT, ID_ER INT;

    INSERT INTO dp2_lineabase.ACTIVOS_PROCESO_ORGANIZACION
    (
        id_activo,
        id_proyecto,
        nombre,
        descripcion,
        ruta,
        num_linea_base
    )
    SELECT
        id_activo,
        id_proyecto,
        nombre,
        descripcion,
        ruta,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.ACTIVOS_PROCESO_ORGANIZACION
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.ALCANCE
    (
        id_alcance,
        id_proyecto,
        descripcion,
        alcance_producto,
        version,
        criterios_aceptacion,
        entregables,
        exclusiones,
        restricciones,
        supuestos,
        id_estado_alcance,
        num_linea_base
    )
    SELECT
        id_alcance,
        id_proyecto,
        descripcion,
        alcance_producto,
        version,
        criterios_aceptacion,
        entregables,
        exclusiones,
        restricciones,
        supuestos,
        id_estado_alcance,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.ALCANCE
    WHERE
        id_proyecto=ID;
    COMMIT;


    
    INSERT INTO dp2_lineabase.EDT
    (
        id_edt,
        version,
        id_estado,
        id_paquete_trabajo_inicial,
        id_miembros_equipo,
        id_proyecto,
        num_linea_base
    )
    SELECT
        id_edt,
        version,
        id_estado,
        id_paquete_trabajo_inicial,
        id_miembros_equipo,
        id_proyecto,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.EDT
    WHERE
        id_proyecto=ID;
    COMMIT;


    SELECT id_edt INTO ID_EDT FROM dp2.EDT WHERE id_proyecto = ID LIMIT 1;

    INSERT INTO dp2_lineabase.PAQUETE_TRABAJO
    (
        id_paquete_trabajo,
        nombre,
        descripcion,
        supuestos,
        fecha_inicio,
        fecha_final,
        porcentaje_completo,
        id_estado,
        id_miembros_equipo,
        id_edt,
        id_componente_padre,
        version,
        ultima_actualizacion,
        criterios_aceptacion,
        entregables,
        hitos,
        costo,
        interdependencias,
        requisitos_calidad,
        referencias_tecnicas,
        informacion_contrato,
        numero_serie,
        dias,
        num_linea_base
    )
    SELECT
        id_paquete_trabajo,
        nombre,
        descripcion,
        supuestos,
        fecha_inicio,
        fecha_final,
        porcentaje_completo,
        id_estado,
        id_miembros_equipo,
        id_edt,
        id_componente_padre,
        version,
        ultima_actualizacion,
        criterios_aceptacion,
        entregables,
        hitos,
        costo,
        interdependencias,
        requisitos_calidad,
        referencias_tecnicas,
        informacion_contrato,
        numero_serie,
        dias,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.PAQUETE_TRABAJO
    WHERE
        id_edt=ID_EDT;
    COMMIT;



    INSERT INTO dp2_lineabase.ESPECIFICACION_REQUISITOS
    (
        id_especificacion_requisitos,
        id_proyecto,
        nombre,
        version,
        id_estado,
        num_linea_base
    )
    SELECT
        id_especificacion_requisitos,
        id_proyecto,
        nombre,
        version,
        id_estado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.ESPECIFICACION_REQUISITOS
    WHERE
        id_proyecto=ID;
    COMMIT;


    SELECT id_especificacion_requisitos INTO ID_ER FROM dp2.ESPECIFICACION_REQUISITOS WHERE id_proyecto = ID LIMIT 1;

    INSERT INTO dp2_lineabase.REQUISITO
    (
        id_requisito,
        id_especificacion_requisitos,
        prioridad,
        descripcion,
        criterio_aceptacion,
        observaciones,
        unidad_medida,
        valor,
        fundamento_incorporacion,
        fuente,
        version,
        fecha_termino,
        id_estado_requisito,
        id_tipo_requisito,
        solicitud,
        cargo,
        id_prioridad_requisito,
        entregable,
        id_miembros_equipo,
        num_linea_base
    )
    SELECT
        id_requisito,
        id_especificacion_requisitos,
        prioridad,
        descripcion,
        criterio_aceptacion,
        observaciones,
        unidad_medida,
        valor,
        fundamento_incorporacion,
        fuente,
        version,
        fecha_termino,
        id_estado_requisito,
        id_tipo_requisito,
        solicitud,
        cargo,
        id_prioridad_requisito,
        entregable,
        id_miembros_equipo,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.REQUISITO
    WHERE
        id_especificacion_requisitos=ID_ER;
    COMMIT;
	


    INSERT INTO dp2_lineabase.FASE
    (
        id_fase,
        id_proyecto,
        descripcion,
        num_linea_base
    )
    SELECT
        id_fase,
        id_proyecto,
        descripcion,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.FASE
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.FASE_X_REQUISITO
    (
        id_fase,
        id_requisito,
        entregable,
        fecha,
        num_linea_base
    )
    SELECT
        A.id_fase,
        A.id_requisito,
        A.entregable,
        A.fecha,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.FASE_X_REQUISITO A JOIN FASE B ON A.ID_FASE=B.ID_FASE
    WHERE
        B.id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.PLAN_GESTION_REQUISITOS
    (
        id_plan_gestion_requisitos,
        id_proyecto,
        documentacion,
        seguimiento,
        responsable,
        acciones,
        priorizacion,
        num_linea_base
    )
    SELECT
        id_plan_gestion_requisitos,
        id_proyecto,
        documentacion,
        seguimiento,
        responsable,
        acciones,
        priorizacion,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.PLAN_GESTION_REQUISITOS
    WHERE
        id_proyecto=ID;
    COMMIT;
END
 

|

CREATE PROCEDURE `P_RI_GRABAR_LINEA_BASE`(IN ID INT )
BEGIN
	


    INSERT INTO dp2_lineabase.RIESGO_X_PROYECTO
    (
        id_riesgo_x_proyecto,
        id_proyecto,
        nombre_riesgo,
        id_paquete_trabajo,
        id_riesgo_comun,
        codigo_riesgo,
		fecha_origen,
		costo_potencial,
		demora_potencial,
		disparador,
		descripcion,
		probabilidad,
		impacto,
		materializado,
		costo_materializacion_real,
		demora_materializacion_real,
		severidad,
		link_documento_riesgo,
		tipo_riesgo_opcional,
		cerrado,
		fecha_materializacion,
		fecha_vencimiento_opcional,
		estado,
		flag_categoria_riesgos,
		estado_logico,
		id_empleado,
		id_probabilidad_riesgo,
		id_nivel_impacto,
		id_tipo_impacto,
		acciones_especificas,
		positivo_negativo,
		costo_real,
		tiempo_real,
		num_linea_base
    )
    SELECT
        id_riesgo_x_proyecto,
        id_proyecto,
        nombre_riesgo,
        id_paquete_trabajo,
        id_riesgo_comun,
        codigo_riesgo,
		fecha_origen,
		costo_potencial,
		demora_potencial,
		disparador,
		descripcion,
		probabilidad,
		impacto,
		materializado,
		costo_materializacion_real,
		demora_materializacion_real,
		severidad,
		link_documento_riesgo,
		tipo_riesgo_opcional,
		cerrado,
		fecha_materializacion,
		fecha_vencimiento_opcional,
		estado,
		flag_categoria_riesgos,
		estado_logico,
		id_empleado,
		id_probabilidad_riesgo,
		id_nivel_impacto,
		id_tipo_impacto,
		acciones_especificas,
		positivo_negativo,
		costo_real,
		tiempo_real,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.RIESGO_X_PROYECTO
    WHERE
        id_proyecto=ID;
    COMMIT;



    INSERT INTO dp2_lineabase.ACCIONES_X_RIESGO
    (
        id_acciones_x_riesgo,
        id_riesgo_x_proyecto,
        descripcion,
        costo,
        tiempo,
        estado,
        fecha_materializacion,
        fecha_inicio,
        tiempo_real,
        id_actividad,
        flag_aceptado_rechazado,
        num_linea_base
    )
    SELECT
        a.id_acciones_x_riesgo,
        a.id_riesgo_x_proyecto,
        a.descripcion,
        a.costo,
        a.tiempo,
        a.estado,
        a.fecha_materializacion,
        a.fecha_inicio,
        a.tiempo_real,
        a.id_actividad,
        a.flag_aceptado_rechazado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.ACCIONES_X_RIESGO a, dp2.RIESGO_X_PROYECTO b
    WHERE
		b.id_proyecto = ID
		AND
        a.id_riesgo_x_proyecto = b.id_riesgo_x_proyecto;
    COMMIT;

    
    INSERT INTO dp2_lineabase.CATEGORIZACION_ESTRATEGIAS
    (
        id_categorizacion_estrategias,
        id_proyecto,
        tipo,
        puntaje_limite_bajo,
        puntaje_limite_alto,
        prioridad,
		estrategia,
		significado,
        num_linea_base
    )
    SELECT
        id_categorizacion_estrategias,
        id_proyecto,
        tipo,
        puntaje_limite_bajo,
        puntaje_limite_alto,
        prioridad,
		estrategia,
		significado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.CATEGORIZACION_ESTRATEGIAS
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.PROBABILIDAD_RIESGO
    (
        id_probabilidad_riesgo,
        id_proyecto,
        nivel,
        descripcion,
        minimo,
        maximo,
        num_linea_base
    )
    SELECT
        id_probabilidad_riesgo,
        id_proyecto,
        nivel,
        descripcion,
        minimo,
        maximo,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.PROBABILIDAD_RIESGO
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.COMITE_RIESGO
    (
        id_proyecto,
        id_empleado,
        num_linea_base
    )
    SELECT
        id_proyecto,
        id_empleado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.COMITE_RIESGO
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.ACUERDOS
    (
        id_acuerdos,
        id_proyecto,
		fecha,
		hora,
		acuerdos,
		estado,
        num_linea_base
    )
    SELECT
        id_acuerdos,
        id_proyecto,
		fecha,
		hora,
		acuerdos,
		estado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.ACUERDOS
    WHERE
        id_proyecto=ID;
    COMMIT;

    INSERT INTO dp2_lineabase.RIESGO_COMUN
    (
        id_riesgo_comun,
        nombre,
		ult_probabilidad,
		ult_impacto,
		ult_severidad,
		tipo,
        num_linea_base
    )
    SELECT
        id_riesgo_comun,
        nombre,
		ult_probabilidad,
		ult_impacto,
		ult_severidad,
		tipo,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.RIESGO_COMUN;
    COMMIT;


    INSERT INTO dp2_lineabase.LOG_TRATAMIENTO_RIESGOS
    (
        id_log_tratamiento_riesgos,
        id_riesgo_x_actividad,
		fecha_riesgo,
		descripcion_cambios,
        num_linea_base
    )
    SELECT
        a.id_log_tratamiento_riesgos,
        a.id_riesgo_x_actividad,
		a.fecha_riesgo,
		a.descripcion_cambios,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.LOG_TRATAMIENTO_RIESGOS a, dp2.RIESGO_X_PROYECTO b
    WHERE
		b.id_proyecto = ID
		AND
        a.id_riesgo_x_actividad = b.id_riesgo_x_proyecto;
    COMMIT;


    INSERT INTO dp2_lineabase.CONTINGENCIA
    (
        id_contingencia,
        id_riesgo_x_actividad,
		descripcion,
		costo_estimado,
        num_linea_base
    )
    SELECT
        a.id_contingencia,
        a.id_riesgo_x_actividad,
		a.descripcion,
		a.costo_estimado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.CONTINGENCIA a, dp2.RIESGO_X_PROYECTO b
    WHERE
		b.id_proyecto = ID
		AND
        a.id_riesgo_x_actividad = b.id_riesgo_x_proyecto;
    COMMIT;


    INSERT INTO dp2_lineabase.MITIGACION
    (
        id_mitigacion,
        id_riesgo_x_actividad,
		descripcion,
		costo_estimado,
        num_linea_base
    )
    SELECT
        a.id_mitigacion,
        a.id_riesgo_x_actividad,
		a.descripcion,
		a.costo_estimado,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.MITIGACION a, dp2.RIESGO_X_PROYECTO b
    WHERE
		b.id_proyecto = ID
		AND
        a.id_riesgo_x_actividad = b.id_riesgo_x_proyecto;
    COMMIT;

    INSERT INTO dp2_lineabase.TIPO_IMPACTO
    (
        id_tipo_impacto,
        id_proyecto,
		descripcion,
		tipo,
        num_linea_base
    )
    SELECT
        id_tipo_impacto,
        id_proyecto,
		descripcion,
		tipo,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.TIPO_IMPACTO
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.NIVEL_IMPACTO
    (
        id_nivel_impacto,
        id_proyecto,
		nivel,
		descripcion,
		tipo,
        num_linea_base
    )
    SELECT
        id_nivel_impacto,
        id_proyecto,
		nivel,
		descripcion,
		tipo,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.NIVEL_IMPACTO
    WHERE
        id_proyecto=ID;
    COMMIT;


    INSERT INTO dp2_lineabase.TIPO_IMPACTO_X_NIVEL_IMPACTO
    (
        id_tipo_impacto,
		id_nivel_impacto,
        id_proyecto,
		limite_menor,
		limite_mayor,
		descripcion,
        num_linea_base
    )
    SELECT
        id_tipo_impacto,
		id_nivel_impacto,
        id_proyecto,
		limite_menor,
		limite_mayor,
		descripcion,
        (SELECT IFNULL(linea_base_activa,0) FROM dp2.PROYECTO WHERE id_proyecto=ID)
    FROM dp2.TIPO_IMPACTO_X_NIVEL_IMPACTO
    WHERE
        id_proyecto=ID;
    COMMIT;

END

|

CREATE PROCEDURE `grabar_linea_base`(IN id_proyecto INT)
BEGIN


CALL P_GE_grabar_linea_base(id_proyecto);
CALL P_CR_grabar_linea_base(id_proyecto);
CALL P_AL_grabar_linea_base(id_proyecto);
CALL P_CO_grabar_linea_base(id_proyecto);
CALL P_RI_grabar_linea_base(id_proyecto);


END


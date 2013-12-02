CREATE TRIGGER AI_MIEMBROS_EQUIPO_T1 AFTER INSERT ON MIEMBROS_EQUIPO
  FOR EACH ROW BEGIN
  INSERT INTO RECURSO (ID_UNIDAD_MEDIDA,DESCRIPCION,ID_PROYECTO,ID_MIEMBROS_EQUIPO,
  COSTO_UNITARIO_ESTIMADO,ID_CAMBIO_MONEDA,ESTADO)
  SELECT
  2 UNIDAD_MEDIDA,
  B.NOMBRE_CORTO,
  NEW.ID_PROYECTO,
  NEW.ID_MIEMBROS_EQUIPO,
  NEW.COSTO_EMPLEADO COSTO_UNITARIO,
  1 ID_CAMBIO_MONEDA,
  'ACTIVO' ESTADO
  FROM 
  MIEMBROS_EQUIPO A JOIN EMPLEADO B ON  A.ID_EMPLEADO=B.ID_EMPLEADO
  WHERE
  B.ID_EMPLEADO=NEW.ID_EMPLEADO AND A.ID_PROYECTO=NEW.ID_PROYECTO;

  END

|

CREATE TRIGGER AU_MIEMBROS_EQUIPO_T1 AFTER UPDATE ON MIEMBROS_EQUIPO
  FOR EACH ROW BEGIN
  
  DECLARE REC INT;
  
  IF (NEW.ESTADO=0) THEN
  
  UPDATE RECURSO SET ESTADO='ELIMINADO' WHERE ID_MIEMBROS_EQUIPO=NEW.ID_MIEMBROS_EQUIPO;
  
  SELECT ID_RECURSO INTO REC FROM RECURSO WHERE ID_MIEMBROS_EQUIPO=NEW.ID_MIEMBROS_EQUIPO;
  
  UPDATE ACTIVIDAD_X_RECURSO SET ESTADO=0 WHERE
  ID_RECURSO=REC;
  
  END IF;
  
  UPDATE RECURSO SET COSTO_UNITARIO_ESTIMADO=NEW.COSTO_EMPLEADO;
  
 END

|

CREATE TRIGGER AI_PROYECTO_T1 AFTER INSERT ON PROYECTO
  FOR EACH ROW BEGIN
  DECLARE HashI BIGINT;
  DECLARE HashF BIGINT;
  DECLARE id_CBase integer;
  SELECT UNIX_TIMESTAMP(NEW.fecha_inicio_planificada)*1000 into HashI;
    SELECT UNIX_TIMESTAMP(NEW.fecha_fin_planificada)*1000 into HashF;
    INSERT INTO ACTIVIDAD (nombre_actividad,id_proyecto,fecha_plan_inicio,fecha_plan_fin,numero_fila,profundidad,inicio_hash,fin_hash,eliminado)
                        values(NEW.nombre_proyecto,NEW.id_proyecto,NEW.fecha_inicio_planificada,NEW.fecha_fin_planificada,1,0,HashI,HashF,0);
    INSERT INTO CALENDARIO_BASE (nombre,FERIADOS) values('Calendario Peruano','#01_01#05_01#06_29#07_28#07_29#08_30#10_08#11_01#12_08#12_25#');
  SELECT max(id_calendario_base) into id_CBase FROM CALENDARIO_BASE; 
    INSERT INTO CALENDARIO_PROYECTO (ID_PROYECTO,id_calendario_base) values(NEW.id_proyecto,id_CBase);
  
  
  INSERT INTO TIPO_IMPACTO (id_proyecto, descripcion, tipo) VALUES (NEW.id_proyecto, 'Financiero', 1);
  INSERT INTO TIPO_IMPACTO (id_proyecto, descripcion, tipo) VALUES (NEW.id_proyecto, 'Legal', 2);
  INSERT INTO NIVEL_IMPACTO (id_proyecto, nivel, descripcion) VALUES (NEW.id_proyecto, 1, 'Muy Bajo');
  INSERT INTO NIVEL_IMPACTO (id_proyecto, nivel, descripcion) VALUES (NEW.id_proyecto, 3, 'Medio');
  INSERT INTO NIVEL_IMPACTO (id_proyecto, nivel, descripcion) VALUES (NEW.id_proyecto, 5, 'Alto');
  INSERT INTO PROBABILIDAD_RIESGO (id_proyecto, nivel, descripcion, minimo, maximo) VALUES (NEW.id_proyecto, 1, 'Muy Bajo', 1, 40);
  INSERT INTO PROBABILIDAD_RIESGO (id_proyecto, nivel, descripcion, minimo, maximo) VALUES (NEW.id_proyecto, 1, 'Medio', 41, 75);
  INSERT INTO PROBABILIDAD_RIESGO (id_proyecto, nivel, descripcion, minimo, maximo) VALUES (NEW.id_proyecto, 1, 'Muy Alto', 76, 100);
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, limite_menor, limite_mayor) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 1), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 1), NEW.id_proyecto, 0, 10000);
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, limite_menor, limite_mayor) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 1), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 3), NEW.id_proyecto, 10001, 20000);
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, limite_menor, limite_mayor) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 1), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 5), NEW.id_proyecto, 20001, 0);
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, descripcion) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 2), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 1), NEW.id_proyecto, '3 UIT');
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, descripcion) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 2), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 3), NEW.id_proyecto, '5 UIT');
  INSERT INTO TIPO_IMPACTO_X_NIVEL_IMPACTO (id_tipo_impacto, id_nivel_impacto, id_proyecto, descripcion) VALUES ((SELECT id_tipo_impacto FROM TIPO_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND tipo = 2), (SELECT id_nivel_impacto FROM NIVEL_IMPACTO WHERE id_proyecto = NEW.id_proyecto AND nivel = 5), NEW.id_proyecto, '6 UIT');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 1, 1, 5, '1', 'Aceptar', 'sig 1');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 1, 6, 10, '2', 'Compartir', 'sig 2');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 1, 11, 15, '3', 'Explotar', 'sig 3');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 2, 1, 5, 'pri1', 'Aceptar', 'pri 1');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 2, 6, 10, 'pri2', 'Mitigar', 'pri 2');
  INSERT INTO CATEGORIZACION_ESTRATEGIAS (id_proyecto, tipo, puntaje_limite_bajo, puntaje_limite_alto, prioridad, estrategia, significado) VALUES (NEW.id_proyecto, 2, 11, 15, 'pri3', 'Transferir', 'pri 3');

  END
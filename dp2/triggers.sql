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

END
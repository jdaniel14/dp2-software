/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP TRIGGER IF EXISTS `AI_PROYECTO_T1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;

DELIMITER ;;

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

  END ;;

DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP TRIGGER IF EXISTS `AI_MIEMBROS_EQUIPO_T1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;

DELIMITER ;;

CREATE TRIGGER AI_MIEMBROS_EQUIPO_T1 AFTER INSERT ON MIEMBROS_EQUIPO
  FOR EACH ROW BEGIN

  /*firme*/
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
  /*SIEMPRE DARA SOLO UN REGISTRO PORQUE TOMARA EL NUEVO*/
  
  
  END ;;

DELIMITER ;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP TRIGGER IF EXISTS `AU_MIEMBROS_EQUIPO_T1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;

DELIMITER ;;

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
  
 END ;;
DELIMITER ;
COMMIT;

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
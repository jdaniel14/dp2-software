<?php

      $subsubmenu = array();

     //General

       $link_G_RegAct = array(
                "href"=> "../../views/general/RegistrarActaConstitucion.html", 
                "title"=> "Registrar Acta de Constitucion",
                "subsubmenu" => $subsubmenu
        );

     $link_G_VerAct = array(
                "href"=> "../../views/general/VisualizarActaConstitucion.html", 
                "title"=> "Ver Acta de Constitucion",
                "subsubmenu" => $subsubmenu
        );

     $link_G_ListRRHHXPro = array(
                "href"=> "../../views/general/ListaRecursosHumanosXProyecto.html", 
                "title"=> "Ver Lista de Recursos Humanos",
                "subsubmenu" => $subsubmenu
        );

     $link_G_MatriRRHH = array(
                "href"=> "../../views/general/ListaRecursosHumanosXProyecto2.html", 
                "title"=> "Matriz de Recursos Humanos",
                "subsubmenu" => $subsubmenu
        );

     $link_G_ListLinBase = array(
                "href"=> "../../views/general/ListaLineaBaseXProyecto.html", 
                "title"=> "Linea Base",
                "subsubmenu" => $subsubmenu
        );

     $link_G_RegSol = array(
                "href"=> "../../views/general/RegistrarSolicitudCambio.html", 
                "title"=> "Solicitud de Cambio",
                "subsubmenu" => $subsubmenu
        );

         /****************************************************************************************************/
         //Alcance

         $link_A_RegEDT = array(
                "href"=> "../../views/alcance/index.html", 
                "title"=> "EDT",
                "subsubmenu" => $subsubmenu
        );

         $link_A_RegDic = array(
                "href"=> "../../views/alcance/diccionario.html", 
                "title"=> "Diccionario EDT",
                "subsubmenu" => $subsubmenu
        );

         $link_A_GestAlc = array(
                "href"=> "../../views/alcance/gestionAlcance.html", 
                "title"=> "Gestión de alcance",
                "subsubmenu" => $subsubmenu
        );

         $link_A_GesReq = array(
                "href"=> "../../views/alcance/requisitos.html", 
                "title"=> "Gestión de requisitos",
                "subsubmenu" => $subsubmenu
        );

         $link_A_MatriRas = array(
                "href"=> "../../views/alcance/tickets.html", 
                "title"=> "Matriz de rastreabilidad",
                "subsubmenu" => $subsubmenu
        );

         $link_A_VerFase = array(
                "href"=> "../../views/alcance/fases.html", 
                "title"=> "Fases",
                "subsubmenu" => $subsubmenu
        );

         $link_A_PlanAlc = array(
                "href"=> "../../views/alcance/PlanGestionAlcance.html", 
                "title"=> "Plan de gestión de alcance",
                "subsubmenu" => $subsubmenu
        );

         $link_A_PlanReq = array(
                "href"=> "../../views/alcance/PlanGestionRequisitos.html", 
                "title"=> "Plan de gestión de requisitos",
                "subsubmenu" => $subsubmenu
        );

         /****************************************************************************************************/
         //cronograma

         $link_CR_VerGantt = array(
                "href"=> "../../views/cronograma/index.html", 
                "title"=> "Mostrar Gantt",
                "subsubmenu" => $subsubmenu
        );

         $link_CR_VerRed = array(
                "href"=> "../../views/cronograma/diagramaRed.html", 
                "title"=> "Mostrar Diagrama de red",
                "subsubmenu" => $subsubmenu
        );

          $link_CR_VerGesCam = array(
                "href"=> "../../views/cronograma/GestionCambios.html", 
                "title"=> "Gestión de cambios",
                "subsubmenu" => $subsubmenu
        );

         /****************************************************************************************************/
         //costos

             
 
          $link_CO_RegRec = array(
                "href"=> "../../views/costo/RegistrarRecursos.html", 
                "title"=> "Registrar Recursos"
            );

          $link_CO_RegCostIndPla = array(
              "href"=> "../../views/costo/RegistrarCostosIndirectosPlaneados.html", 
                "title"=> "Costos Indirectos Planeados"
            );

          $link_CO_AsigCta = array(
              "href"=> "../../views/costo/AsignaCuenta.html", 
                "title"=> "Asignar cuenta contable"
            );

          $link_CO_VerPre = array(
                "href"=> "../../views/costo/VisualizarPresupuesto.html", 
                "title"=> "Visualizar Presupuesto"
            );

          $link_CO_AsigCost = array(
               "href"=> "../../views/costo/AsignaCostoRecursos.html", 
                "title"=> "Resumen presupuesto/Reserva",
            );


          $link_CO_RegCostReal = array(
               "href"=> "../../views/costo/RegistrarCostosReales.html", 
                "title"=> "Registrar Costos Reales Fijos"
            );

          $link_CO_RegCostCta = array(
                "href"=> "../../views/costo/VisualizarCostoPorCuenta.html", 
                "title"=> "Visualizar Costo por Cuenta Contables"
            );

          $link_CO_VerPreReal = array(
                "href"=> "../../views/costo/VisualizarPresupuestoReal.html", 
                "title"=> "Visualizar Presupuesto Real"
            );

          $link_CO_RegCostIndReal = array(
                "href"=> "../../views/costo/RegistrarCostosIndirectosReales.html", 
                "title"=> "Costos Indirectos Reales"
            );

          $link_CO_VerIndGra = array(
               "href"=> "../../views/costo/VisualizarIndicadoresGrafico.html", 
                "title"=> "Visualizar Indicadores Grafico"
            );

          

          $link_CO_VerInd = array(
               "href"=> "../../views/costo/VisualizarIndicadores.html", 
                "title"=> "Visualizar Indicadores"
            );
         

         /****************************************************************************************************/
         //riesgos

         $subsubmenu = array();

        $link_R_Config = array(
                "href"=> "../../views/riesgo/Configuracion.html", 
                "title"=> "Nivel de impacto",
                "subsubmenu" => $subsubmenu
        );

        $link_R_VerRiesgo = array(
                "href"=> "../../views/riesgo/index.html", 
                "title"=> "Mostrar riesgos",
                "subsubmenu" => $subsubmenu
        );

        $link_R_MatriRiesgo = array(
                "href"=> "../../views/riesgo/MatrizRiesgos.html", 
                "title"=> "Matriz Riesgos",
                "subsubmenu" => $subsubmenu
        );

        $link_R_RegRiesgo = array(
                "href"=> "../../views/riesgo/RegistrarRiesgos.html", 
                "title"=> "Registrar Riesgos",
                "subsubmenu" => $subsubmenu
        );

        $link_R_PlanRiesgo = array(
                "href"=> "../../views/riesgo/PlanRiesgos.html", 
                "title"=> "Plan Riesgos",
                "subsubmenu" => $subsubmenu
        );

        $link_R_ComiRiesgo = array(
                "href"=> "../../views/riesgo/ComiteEquipo.html", 
                "title"=> "Comite de riesgos",
                "subsubmenu" => $subsubmenu
        );

        $link_R_AcuModif = array(
                "href"=> "../../views/riesgo/AcuerdosModificaciones.html", 
                "title"=> "Acuerdos y Modificaciones",
                "subsubmenu" => $subsubmenu
        );

        $link_R_RiesMateri = array(
                "href"=> "../../views/riesgo/RiesgosMaterializados.html", 
                "title"=> "Reisgos Materializados",
                "subsubmenu" => $subsubmenu
        );





?>
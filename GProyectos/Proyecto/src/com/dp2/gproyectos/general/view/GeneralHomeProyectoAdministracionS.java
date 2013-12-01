package com.dp2.gproyectos.general.view;

import android.os.Bundle;
import android.view.Window;
import android.widget.EditText;
import android.widget.TextView;

import com.actionbarsherlock.app.SherlockActivity;
import com.dp2.framework.view.LoadTaskDialog;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.controller.ProyectoController;
import com.dp2.gproyectos.general.entities.InfoBean;
import com.dp2.gproyectos.general.entities.ProyectoBean;
import com.dp2.gproyectos.utils.MensajesUtility;
import com.dp2.gproyectos.view.components.BotonIconTexto;

public class GeneralHomeProyectoAdministracionS extends SherlockActivity
		implements Loadingable {
	String titulo = "INFO PROYECTO";
	ProyectoBean esteProyecto;
	InfoBean estaInfo;
	TextView txtNombreProyecto;
	TextView txtPrioridad;
	TextView txtTipoProyecto;
	TextView txtFechaInicio;
	TextView txtFechaFin;
	TextView txtDescripcion;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.setContentView(R.layout.general_proyecto_detalle_layout);

		getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setIcon(R.drawable.maleta);

		txtNombreProyecto = (TextView) findViewById(R.id.txtNombreProyecto);
		txtPrioridad = (TextView) findViewById(R.id.txtPrioridad);
		txtTipoProyecto = (TextView) findViewById(R.id.txtTipo);
		txtFechaInicio = (TextView) findViewById(R.id.txtFechaInicio);
		txtFechaFin = (TextView) findViewById(R.id.txtFechaFin);
		txtDescripcion = (TextView) findViewById(R.id.txtDescripcion);

		try {
			esteProyecto = (ProyectoBean) getIntent().getSerializableExtra(
					"proyecto");
		} catch (Exception e) {
			e.printStackTrace();
		}

		try {
			new LoadTaskDialog(this, MensajesUtility.INFO_CARGANDO).execute();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	}

	@Override
	public void beforeLoadingData() {

	}

	@Override
	public void loadingData() {
		if (esteProyecto != null) {
			estaInfo = ProyectoController.getInstance().getInformacion(
					esteProyecto.id);
		}

	}

	@Override
	public void afterLoadingData() {
		if (estaInfo != null) {
			txtNombreProyecto.setText(estaInfo.nombre);
			txtDescripcion.setText(estaInfo.descripcion);
			txtPrioridad.setText(estaInfo.prioridad);
			txtTipoProyecto.setText(estaInfo.tipoproyecto);
			txtFechaInicio.setText(estaInfo.fechainicio);
			txtFechaFin.setText(estaInfo.fechafin);
		}

	}

}

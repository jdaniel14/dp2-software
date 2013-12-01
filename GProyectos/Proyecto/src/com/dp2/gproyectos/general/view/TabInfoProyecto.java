package com.dp2.gproyectos.general.view;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.actionbarsherlock.app.SherlockFragment;
import com.dp2.framework.view.Loadingable;
import com.dp2.gproyectos.R;

public class TabInfoProyecto extends SherlockFragment implements Loadingable{
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.cronograma_recurso_costo_form_layout, container, false);
        return rootView;
    }

	@Override
	public void beforeLoadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void loadingData() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterLoadingData() {
		// TODO Auto-generated method stub
		
	}
 
}


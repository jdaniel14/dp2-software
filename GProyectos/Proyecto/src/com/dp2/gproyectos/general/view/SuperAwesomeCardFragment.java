/*
 * Copyright (C) 2013 Andreas Stuetz <andreas.stuetz@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.dp2.gproyectos.general.view;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import com.dp2.gproyectos.R;
import com.dp2.gproyectos.general.entities.ProyectoBean;

public class SuperAwesomeCardFragment extends Fragment {

	private static final String ARG_POSITION = "position";
	private static final String ARG_CODIGOPROYECTO = "cod_proyecto";
	private ProyectoBean proyecto;
	private int position;

	public static SuperAwesomeCardFragment newInstance(ProyectoBean proyecto) {
		SuperAwesomeCardFragment f = new SuperAwesomeCardFragment();
		Bundle b = new Bundle();
		b.putSerializable(ARG_CODIGOPROYECTO, proyecto);
		f.setArguments(b);
		return f;
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		proyecto  = (ProyectoBean) getArguments().getSerializable(ARG_CODIGOPROYECTO);
		//position = getArguments().getInt(ARG_POSITION);
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		
		View rootView = inflater.inflate(R.layout.general_login_layout, container, false);
		EditText edtUser = (EditText) rootView.findViewById(R.id.edtUser);
		edtUser.setText(proyecto.nombre);
		return rootView;
		            
		/*inflater.inflate(R.layout.general_login_layout,  new LinearLayout(this), true);
		LayoutParams params = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

		FrameLayout fl = new FrameLayout(getActivity());
		fl.setLayoutParams(params);

		final int margin = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 8, getResources()
				.getDisplayMetrics());

		TextView v = new TextView(getActivity());
		params.setMargins(margin, margin, margin, margin);
		v.setLayoutParams(params);
		v.setLayoutParams(params);
		v.setGravity(Gravity.CENTER);
		v.setBackgroundResource(R.drawable.background_card);
		v.setText("CARD " + (position + 1));

		fl.addView(v);
		return fl;*/
	}

}
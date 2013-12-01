package com.dp2.gproyectos.view;

import com.dp2.gproyectos.cronograma.view.TabActividades;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

public class MyFragmentPagerAdapter extends FragmentPagerAdapter{
	
	final int PAGE_COUNT = 3;
	
	/** Constructor of the class */
	public MyFragmentPagerAdapter(FragmentManager fm) {
		super(fm);
		
	}

	/** This method will be invoked when a page is requested to create */
	@Override
	public Fragment getItem(int arg0) {
		Bundle data = new Bundle();
		switch(arg0){
		
			/** Android tab is selected */
			case 0:
				TabActividades androidFragment = new TabActividades();				
				data.putInt("current_page", arg0+1);
				androidFragment.setArguments(data);
				return androidFragment;
				
			/** Apple tab is selected */
			case 1:
				TabActividades appleFragment = new TabActividades();
				data.putInt("current_page", arg0+1);
				appleFragment.setArguments(data);
				return appleFragment;	
		}
		
		return null;
	}

	/** Returns the number of pages */
	@Override
	public int getCount() {		
		return PAGE_COUNT;
	}
	
}

package com.dp2.gproyectos.general.view;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.ViewPager;

import com.actionbarsherlock.app.ActionBar;
import com.actionbarsherlock.app.ActionBar.Tab;
import com.actionbarsherlock.app.SherlockFragmentActivity;
import com.actionbarsherlock.view.Menu;
import com.dp2.gproyectos.R;
import com.dp2.gproyectos.view.MyFragmentPagerAdapter;

public class GeneralHomeProyectoAdministracion extends SherlockFragmentActivity  {
	ActionBar mActionBar;
	ViewPager mPager;
	String titulo = "Administrar";
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_container);
        
        /** Getting a reference to action bar of this activity */
        mActionBar = getSupportActionBar();
        
        /** Set tab navigation mode */
        mActionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
        
        /** Getting a reference to ViewPager from the layout */
        mPager = (ViewPager) findViewById(R.id.pager);
        
        /** Getting a reference to FragmentManager */
        FragmentManager fm = getSupportFragmentManager();      
        
        /** Defining a listener for pageChange */
        ViewPager.SimpleOnPageChangeListener pageChangeListener = new ViewPager.SimpleOnPageChangeListener(){
        	@Override
        	public void onPageSelected(int position) {        		
        		super.onPageSelected(position);
        		mActionBar.setSelectedNavigationItem(position);        		
        	}
        	
        };
        
        /** Setting the pageChange listner to the viewPager */
        mPager.setOnPageChangeListener(pageChangeListener);
        
        /** Creating an instance of FragmentPagerAdapter */
        MyFragmentPagerAdapter fragmentPagerAdapter = new MyFragmentPagerAdapter(fm);
        
        /** Setting the FragmentPagerAdapter object to the viewPager object */
        mPager.setAdapter(fragmentPagerAdapter);

        mActionBar.setDisplayShowTitleEnabled(true);
        
        /** Defining tab listener */
        ActionBar.TabListener tabListener = new ActionBar.TabListener() {
			
			@Override
			public void onTabUnselected(Tab tab, FragmentTransaction ft) {				
			}
			
			@Override
			public void onTabSelected(Tab tab, FragmentTransaction ft) {
				mPager.setCurrentItem(tab.getPosition());
				
			}
			
			@Override
			public void onTabReselected(Tab tab, FragmentTransaction ft) {
			}
		};

		/** Creating Android Tab */
        Tab tab = mActionBar.newTab()
                           .setText("Info proyecto")
                           //.setIcon(R.drawable.ic_launcher)
                           .setTabListener(tabListener);
        
        mActionBar.addTab(tab);

        /** Creating Apple Tab */
        tab = mActionBar.newTab()
                       .setText("Cronograma")
                     //  .setIcon(R.drawable.foco_nocaigasenlatentacion)
                       .setTabListener(tabListener);                               
        mActionBar.addTab(tab);    
        
        /** Creating Apple Tab */
        tab = mActionBar.newTab()
                       .setText("Indicadores")
                     //  .setIcon(R.drawable.foco_nocaigasenlatentacion)
                       .setTabListener(tabListener);   
        
        mActionBar.addTab(tab);        
        
    	getSherlock().getActionBar().setTitle(titulo);
		getSherlock().getActionBar().setIcon(R.drawable.maleta);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getSupportMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

}

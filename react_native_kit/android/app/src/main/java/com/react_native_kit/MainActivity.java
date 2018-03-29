package com.react_native_kit;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // 1.导入启动屏包

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "react_native_kit";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) { // 2. 显示启动方法
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
    }
}

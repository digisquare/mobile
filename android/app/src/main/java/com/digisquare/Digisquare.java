package net.digisquare;

import android.app.Application;

import com.urbanairship.UAirship;

public class Digisquare extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        UAirship.takeOff(this, new UAirship.OnReadyCallback() {
            @Override
            public void onAirshipReady(UAirship airship) {
                airship.getPushManager().setUserNotificationsEnabled(true);
            }
        });
    }
}

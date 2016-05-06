package net.digisquare;

import android.app.Application;
import android.support.v7.app.NotificationCompat;

import com.urbanairship.UAirship;
import com.urbanairship.push.notifications.DefaultNotificationFactory;

public class Digisquare extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        UAirship.takeOff(this, new UAirship.OnReadyCallback() {
            @Override
            public void onAirshipReady(UAirship airship) {
                // Create a customized default notification factory
                DefaultNotificationFactory notificationFactory;
                notificationFactory = new DefaultNotificationFactory(getApplicationContext());

                // Custom notification icon
                notificationFactory.setSmallIconId(R.drawable.ic_notification);

                // The accent color for Android Lollipop+
                notificationFactory.setColor(NotificationCompat.COLOR_DEFAULT);

                // Set the factory on the PushManager
                airship.getPushManager().setNotificationFactory(notificationFactory);

                airship.getPushManager().setUserNotificationsEnabled(true);
            }
        });
    }
}

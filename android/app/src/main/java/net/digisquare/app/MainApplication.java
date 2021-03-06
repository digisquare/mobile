package net.digisquare.app;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.smixx.fabric.FabricPackage;
import com.geektime.reactnativeonesignal.ReactNativeOneSignalPackage;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new FabricPackage(),
        new MainReactPackage(),
        new VectorIconsPackage(),
        new ReactNativeOneSignalPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}

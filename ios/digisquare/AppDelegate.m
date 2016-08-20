/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import "RCTOneSignal.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [Fabric with:@[[Crashlytics class]]];

  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *ONE_SIGNAL_APP_ID = infoDictionary[@"ONE_SIGNAL_APP_ID"];

  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                         appId:ONE_SIGNAL_APP_ID];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"digisquare"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  /**
   * Splash Screen
   */
  NSArray *allPngImageNames = [[NSBundle mainBundle] pathsForResourcesOfType:@"png"
                                                                 inDirectory:nil];
  for (NSString *imgName in allPngImageNames){
    // Find launch images
    if ([imgName containsString:@"LaunchImage"]){
      UIImage *img = [UIImage imageNamed:imgName]; //-- this is a launch image
      // Has image same scale and dimensions as our current device's screen?
      if (img.scale == [UIScreen mainScreen].scale && CGSizeEqualToSize(img.size, [UIScreen mainScreen].bounds.size)) {
        rootView.backgroundColor = [UIColor colorWithPatternImage:img];
      }
    }
  }
  
  return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification {
  [RCTOneSignal didReceiveRemoteNotification:notification];
}

@end

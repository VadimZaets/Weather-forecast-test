#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import <ReactNativeConfig/ReactNativeConfig.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Get the Google Maps API key from the .env file using react-native-config
  NSString *googleApiKey = [ReactNativeConfig envFor:@"GOOGLE_API_KEY"];

  // Provide the API key for Google Maps
  [GMSServices provideAPIKey:googleApiKey]; // Use the API key from the environment variable

  self.moduleName = @"AwesomeProject"; // Replace with your app's module name
  self.initialProps = @{}; // Add any custom initial props for your app here

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

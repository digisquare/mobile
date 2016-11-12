# Digisquare Mobile [![Build Status](https://travis-ci.org/digisquare/mobile.svg?branch=master)](https://travis-ci.org/digisquare/mobile)

This is the mobile application for [Digisquare](https://digisquare.net), built using [React Native](https://facebook.github.io/react-native/), available on [Google Play](https://play.google.com/store/apps/details?id=net.digisquare.app) and the [App Store](https://itunes.apple.com/us/app/digisquare/id1129249292).

It shares the same codebase for iOS and Android.

## Dependencies

  - [Redux](https://github.com/reactjs/redux) for state container
  	- [redux-logger](https://github.com/evgenyrodionov/redux-logger) for dev logs
  	- [redux-persist](https://github.com/rt2zz/redux-persist) for offline persistence
  	- [redux-thunk](https://github.com/gaearon/redux-thunk) for asynchronous actions
  - Components
    - [@exponent/ex-navigation](https://github.com/exponentjs/ex-navigation)
    - [react-native-htmlview](https://github.com/jsdf/react-native-htmlview)
    - [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Setup

`TODO: how to setup private keys`

## Testing

Tests are written with:

  - [Jest](https://github.com/facebook/jest)
  - [Chai](https://github.com/chaijs/chai)
  - [Enzyme](https://github.com/airbnb/enzyme/)
  
They run with `npm test`. Coverage is available with `npm run cover`.

A [Travis CI](https://travis-ci.org/digisquare/mobile) job is set up, together with a [GreenKeeper](https://github.com/greenkeeperio/greenkeeper) bot to check for updated dependencies.

## Linting

All code is linted with [eslint](https://github.com/eslint/eslint) and can be checked with `npm run lint`, using [Airbnb rules](https://github.com/airbnb/javascript).

## Push Notifications

Push Notifications are sent using [OneSignal](https://onesignal.com/) and the [React Native OneSignal](https://github.com/geektimecoil/react-native-onesignal) package.

## Fastlane

[Fastlane](https://github.com/fastlane/fastlane) tools are used for easy deployment

  - iOS
	- snapshot: Automate taking localized screenshots of your iOS app on every device
	- match: Easily sync your certificates and profiles across your team using Git
	- gym: Building your iOS apps has never been easier
	- pilot: The best way to manage your TestFlight testers and builds from your terminal
	- frameit: Quickly put your screenshots into the right device frames
  - Android
	- graddle
	- deliver: Updating Android apps and their metadata on the Google Play Store
  
	
## Licence

MIT

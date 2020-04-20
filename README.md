# upnextbus

modern nextbus app built with react-native &amp; typescript

<p float="left">
  <img src="https://user-images.githubusercontent.com/15663675/69209786-6f6b3a00-0b0d-11ea-8414-0de5e6bb955b.png" width="180" />
  <img src="https://user-images.githubusercontent.com/15663675/69209819-827e0a00-0b0d-11ea-8e29-29517c5e3b2a.png" width="180" />
  <img src="https://user-images.githubusercontent.com/15663675/69209829-8c077200-0b0d-11ea-8828-53d64084b75f.png" width="180" />
  <img src="https://user-images.githubusercontent.com/15663675/69209852-96297080-0b0d-11ea-84e4-256e7d1c0e11.png" width="180" />
</p>

## description

Get around the city with real-time predictions using upnextbus.

- view nearby buses by distance from your location
- favorite the stops you need for quick-access
- features map showing real-time bus locations, paths and distance
- supports light & dark mode

Supports:

- SF Muni
- LA Metro
- Toronto Transit Commission
- and much more!

\*All real-time data is provided by NextBus Inc.

## installation

- follow general guidelines under React Native CLI Quickstart:
  https://reactnative.dev/docs/environment-setup

* clone the project `git clone https://github.com/stanleyliu15/upnextbus.git`
* `cd upnextbus`
* download dependencies

  - `npm install` or `yarn install`
  - for ios users: `cd ios && pod install`

* run the project

  - ios: `yarn ios`
  - android: `yarn android`

* instructions to get google maps for android: https://developers.google.com/maps/documentation/javascript/get-api-key

```
# insert the api key
# android/app/src/main/AndroidManifest.xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="GOOGLE_MAPS_API_KEY"/>
```

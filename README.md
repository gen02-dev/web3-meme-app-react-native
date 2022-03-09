# `web3-meme-app-react-native`

This project is a fork of [Ethereum React Native Boilerplate](https://github.com/ethereum-boilerplate/ethereum-react-native-boilerplate) and shows how you can easily create your own Web3 Etherium Mobile Chat App using Moralis.

# 🚀 Quick Start

📄 Clone or fork `web3-meme-app-react-native`:

```sh
https://github.com/gen02-dev/web3-meme-app-react-native.git
```

✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server))
Example:

```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

💿 Install all dependencies:

```sh
cd web3-meme-app-react-native
yarn install
```

🚴‍♂️ Run your App:

IMPORTANT: 
- To run the app and be able to actually login do the following:
    - Make sure to have Xcode installed on your machine if you wish to run it in iOS development and Android Studio if you want it in Android.
    - Connect a physical phone device. Open termilan/cmd and run ```adb adb devices``` and see if your device id is listed.
    - Install your preferred wallet on your device: (Metamask, Trust Wallet etc..)

- IOS: 
    - Command ```yarn ios``` 
    - For physical IOS Device: Open the moraliscreatereactnativedapp.xcworkspace from ios folder in Xcode. Run the App by choosing your connected physical device.
    - for emulator Make sure you have Xcode or atleast Xcode command line tools installed
- Android:
    - Make sure that your physical device is connected.
    - Turn on "Developer Options" by doing going to "Settings" , then tap "About device" or "About phone". Scroll down, then tap Build number seven times. Depending on your device and operating system, you may need to tap "Software information", then tap "Build number" seven times. Return to the previous screen to find Developer options near the bottom. Scroll down and enable USB debugging.
    - Open terminal and go to root directory then do this command: ```yarn android```. It will open a bundler and builds the app on your phone.

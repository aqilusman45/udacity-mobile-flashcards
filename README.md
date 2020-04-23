
## Mobile Flash Cards

React and Redux project for React Nano degree program.

### Scope
Learn React Native APIs and Native APIs for both Android and IOS platforms.
  
### Additional Libraries/Dependencies

- Styled Components

- React Native Icon

- Redux

- Redux Thunk

### Notes

Notification helper functions can be found in `./utils/helpers.js`. `App.js` componentdidmount hook calls `setLocalNotifications()` to check for Notifications permission. Further, logic for checking if app should remind user is implemented in `./components/Quiz/index.js`. `clearLocalNotification()` is called when user completes the quiz and `setLocalNotifications()` is invoked to set notification for the next day.

  ### Platforms Tested
  App is tested on Android Virtual Device / Emulator : Nexus 5x 
  For Notification Physical Device : Moto G6

### Setup Guide

1. Setup NodeJs

2. Setup `yarn`

3. Install `expo-cli` using npm: `npm install expo-cli --global`

4. To install expo-cli using yarn: `yarn global add explo-cli`

5. Install `node_modules` : `yarn install`

6. Install expo app on your Android using this link: [https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

7. To start dev environment: `yarn start`

8. Once the server is running you can scan the QR code from the cli to view the app on your smartphone.


### References

  

1. https://codedaily.io/tutorials/57/Custom-Handling-the-Android-Back-Button-with-React-Navigation

2. https://upmostly.com/tutorials/how-to-use-the-setstate-callback-in-react

3. https://reactnavigation.org/docs/navigation-lifecycle/#example-scenario

4. https://daveceddia.com/usestate-hook-examples/

5. https://expo.io/learn
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello guys!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import 'react-native-gesture-handler'
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Import our screens
// import AuthScreen from './screens/AuthScreen';
// import FamilyFeedScreen from './screens/FamilyFeedScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import { enableScreens } from 'react-native-screens';

// const Stack = createStackNavigator();
// enableScreens();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Auth">
//         <Stack.Screen
//           name="Auth"
//           component={AuthScreen}
//           options={{ title: 'Login / Sign Up' }}
//         />
//          <Stack.Screen
//           name="FamilyFeed"
//           component={FamilyFeedScreen}
//           options={{ title: 'Family Connection' }}
//         />
//          <Stack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{ title: 'Profile' }}
//         />
//          </Stack.Navigator>
//     </NavigationContainer>
//   )
// }


// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { enableScreens } from 'react-native-screens';

// // Import Firebase config to initialize Firebase
// import './firebaseConfig';

// // Import your screens
// import AuthScreen from './screens/AuthScreen';
// import FamilyFeedScreen from './screens/FamilyFeedScreen';
// import ProfileScreen from './screens/ProfileScreen';

// const Stack = createStackNavigator();
// enableScreens();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Auth">
//         <Stack.Screen
//           name="Auth"
//           component={AuthScreen}
//           options={{ title: 'Login / Sign Up' }}
//         />
//         <Stack.Screen
//           name="FamilyFeed"
//           component={FamilyFeedScreen}
//           options={{ title: 'Family Connection' }}
//         />
//         <Stack.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{ title: 'Profile' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// new
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import AuthScreen from './screens/AuthScreen';
import SignupScreen from './screens/SignupScreen';
import FamilyFeedScreen from './screens/FamilyFeedScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Login / Sign Up' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="FamilyFeed" component={FamilyFeedScreen} options={{ title: 'Family Connection' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

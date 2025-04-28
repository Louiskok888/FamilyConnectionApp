// screens/TestImagePickerScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TestImagePickerScreen({ navigation }) {
  const testPicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      console.log("Permission denied");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    console.log("Picker result:", result);
  };

  return (
    <View style={styles.container}>
      <Text>Test Image Picker</Text>
      <Button title="Launch Image Picker" onPress={testPicker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

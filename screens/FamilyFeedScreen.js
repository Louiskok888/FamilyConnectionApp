import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FamilyFeedScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      {/* Navbar stays at the top */}
      <View style={styles.navbar}>
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Groups" onPress={() => navigation.navigate('FamilyGroup')} />
        <Button title="Logout" onPress={() => navigation.replace('Auth')} />
      </View>

      {/* Scrollable content below navbar */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to the Family Connection App!</Text>
        <Text style={styles.subtitle}>Family Feed & Daily Challenges</Text>
        <Text style={styles.placeholder}>[Your Family Feed, Mini-Games, & Challenges go here]</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    scrollContent: {
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    placeholder: {
      marginVertical: 20,
      fontSize: 16,
      color: 'gray',
    },
  });
  
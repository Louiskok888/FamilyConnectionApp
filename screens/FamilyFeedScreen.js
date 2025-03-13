// screens/FamilyFeedScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function FamilyFeedScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to the Family Connection App!</Text>
            <Text style={styles.subtitle}>Family Feed & Daily Challenges</Text>

            {/* Add your family app features here */}
            <Text style={styles.placeholder}>[Your Family Feed, Mini-Games, & Challenges go here]</Text>

            <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
            <Button title="Logout" onPress={() => navigation.replace('Auth')} />
            <Button
                title="Manage Family Group"
                onPress={() => navigation.navigate('FamilyGroup')}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
    placeholder: { marginVertical: 20, fontSize: 16, color: 'gray' },
});

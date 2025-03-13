// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User account created successfully
                Alert.alert('Success', 'Account created successfully!');
                // Navigate to the FamilyFeed or your app's main screen
                navigation.replace('FamilyFeed');
            })
            .catch((error) => {
                Alert.alert('Signup Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button title="Sign Up" onPress={handleSignup} />
                <Button title="Back to Login" onPress={() => navigation.goBack()} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 4 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // You can adjust the margin or padding here to suit your design
        marginTop: 10,
    },
});


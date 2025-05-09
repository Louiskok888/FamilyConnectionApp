// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Login successful, navigate to FamilyFeed
                    navigation.replace('FamilyFeed');
                })
                .catch((error) => {
                    // Handle errors here
                    Alert.alert('Login Error', error.message);
                });
        } else {
            Alert.alert('Error', 'Please enter both email and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Family Connection App</Text>
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

            <View style={styles.buttonRow}>
                <View style={styles.buttonWrapper}>
                    <Button title="Login" onPress={handleLogin} />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 4 },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        flexWrap: 'wrap', // allows wrapping on smaller screens
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5,
    }
});

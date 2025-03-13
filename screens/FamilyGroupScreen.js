// screens/FamilyGroupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createFamilyGroup, joinFamilyGroup } from '../services/FamilyGroupService';

export default function FamilyGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');

  // Create a new family group
  const handleCreateGroup = async () => {
    try {
      if (!groupName) {
        Alert.alert("Error", "Please enter a group name");
        return;
      }
      const newGroupId = await createFamilyGroup(groupName);
      Alert.alert("Success", `Group created! Group ID: ${newGroupId}`);
      // Navigate to your Family Feed screen or update UI as needed.
      navigation.replace('FamilyFeed');
    } catch (error) {
      Alert.alert("Create Group Error", error.message);
    }
  };

  // Join an existing family group
  const handleJoinGroup = async () => {
    try {
      if (!groupId) {
        Alert.alert("Error", "Please enter a group ID");
        return;
      }
      await joinFamilyGroup(groupId);
      Alert.alert("Success", "You have joined the group!");
      navigation.replace('FamilyFeed');
    } catch (error) {
      Alert.alert("Join Group Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Group System</Text>
      <Text style={styles.label}>Create a new Family Group:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Create Group" onPress={handleCreateGroup} />

      <Text style={[styles.label, { marginTop: 20 }]}>
        Or join an existing Family Group:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group ID"
        value={groupId}
        onChangeText={setGroupId}
      />
      <Button title="Join Group" onPress={handleJoinGroup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 4 },
});

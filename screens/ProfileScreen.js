// // ProfileScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, Alert } from 'react-native';
// import { auth, firestore } from '../firebaseConfig';
// import { signOut } from 'firebase/auth';
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   updateDoc,
//   doc,
//   arrayRemove
// } from 'firebase/firestore';

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [familyGroups, setFamilyGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUser(currentUser);
//       // Query for family groups where the current user's UID is in the members array
//       const groupsQuery = query(
//         collection(firestore, "familyGroups"),
//         where("members", "array-contains", currentUser.uid)
//       );
//       // Subscribe for real-time updates
//       const unsubscribe = onSnapshot(groupsQuery, (snapshot) => {
//         const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFamilyGroups(groups);
//         setLoading(false);
//       }, error => {
//         console.error("Error fetching family groups:", error);
//         setLoading(false);
//       });
      
//       // Clean up the subscription on unmount
//       return () => unsubscribe();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       navigation.replace("Auth"); // Navigate back to the authentication screen after sign-out
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const handleUnjoinGroup = async (groupId) => {
//     if (!user) return;
//     try {
//       // Reference the group document and remove the user's UID from the members array
//       const groupRef = doc(firestore, "familyGroups", groupId);
//       await updateDoc(groupRef, {
//         members: arrayRemove(user.uid)
//       });
//       Alert.alert("Left Group", "You have successfully left the group.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to leave group: " + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       {user ? (
//         <>
//           <Text style={styles.info}>Email: {user.email}</Text>
//           <Text style={styles.info}>User ID: {user.uid}</Text>
//           <Text style={styles.subtitle}>Family Groups Joined</Text>
//           {familyGroups.length === 0 ? (
//             <Text>You have not joined any family groups yet.</Text>
//           ) : (
//             <FlatList 
//               data={familyGroups}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.groupContainer}>
//                   <Text style={styles.groupName}>{item.name}</Text>
//                   <Button title="Leave Group" onPress={() => handleUnjoinGroup(item.id)} />
//                 </View>
//               )}
//             />
//           )}
//         </>
//       ) : (
//         <Text>No user is logged in.</Text>
//       )}
//       <Button title="Sign Out" onPress={handleSignOut} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20
//   },
//   info: {
//     fontSize: 18,
//     marginBottom: 10
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10
//   },
//   groupContainer: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     marginBottom: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   groupName: {
//     fontSize: 18,
//   },
// });



//new
// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ActivityIndicator, 
  FlatList, 
  Alert, 
  Modal, 
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import { auth, firestore } from '../firebaseConfig';
import { signOut, updateEmail, sendPasswordResetEmail } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  arrayRemove
} from 'firebase/firestore';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [familyGroups, setFamilyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      // Query for family groups where the current user's UID is in the members array
      const groupsQuery = query(
        collection(firestore, "familyGroups"),
        where("members", "array-contains", currentUser.uid)
      );
      // Subscribe for real-time updates
      const unsubscribe = onSnapshot(groupsQuery, (snapshot) => {
        const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFamilyGroups(groups);
        setLoading(false);
      }, error => {
        console.error("Error fetching family groups:", error);
        setLoading(false);
      });
      
      // Clean up the subscription on unmount
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Auth"); // Navigate back to the authentication screen after sign-out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleUnjoinGroup = async (groupId) => {
    if (!user) return;
    try {
      const groupRef = doc(firestore, "familyGroups", groupId);
      await updateDoc(groupRef, {
        members: arrayRemove(user.uid)
      });
      Alert.alert("Left Group", "You have successfully left the group.");
    } catch (error) {
      Alert.alert("Error", "Failed to leave group: " + error.message);
    }
  };

  // Update the user's email address
  const handleUpdateEmail = async () => {
    if (!newEmail) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    try {
      await updateEmail(user, newEmail);
      Alert.alert("Success", "Email updated successfully.");
      // Update local user state with the new email
      setUser({ ...user, email: newEmail });
      setIsEditingEmail(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update email: " + error.message);
    }
  };

  // Send a password reset email to the user's current email
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
    } catch (error) {
      Alert.alert("Error", "Failed to send password reset email: " + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>User ID: {user.uid}</Text>
          
          <View style={styles.buttonContainer}>
            <Button title="Edit Email" onPress={() => {
              setNewEmail(user.email); // Pre-fill with current email
              setIsEditingEmail(true);
            }} />
            <Button title="Reset Password" onPress={handleResetPassword} />
          </View>
          
          <Text style={styles.subtitle}>Family Groups Joined</Text>
          {familyGroups.length === 0 ? (
            <Text>You have not joined any family groups yet.</Text>
          ) : (
            <FlatList 
              data={familyGroups}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.groupContainer}>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Button title="Leave Group" onPress={() => handleUnjoinGroup(item.id)} />
                </View>
              )}
            />
          )}
        </>
      ) : (
        <Text>No user is logged in.</Text>
      )}
      <Button title="Sign Out" onPress={handleSignOut} />

      {/* Modal for editing email */}
      <Modal
        visible={isEditingEmail}
        animationType="slide"
        transparent
        onRequestClose={() => setIsEditingEmail(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Email</Text>
            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter new email"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsEditingEmail(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateEmail}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  info: {
    fontSize: 18,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20
  },
  groupContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  groupName: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 4,
    width: '45%',
    alignItems: 'center'
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

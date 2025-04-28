
// // // new
// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Button, 
//   ActivityIndicator, 
//   FlatList, 
//   Alert, 
//   Modal, 
//   TextInput, 
//   TouchableOpacity 
// } from 'react-native';
// import { auth, firestore } from '../firebaseConfig';
// import { signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
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

//   // State for editing email (removed Edit Email functionality as requested)
//   // State for editing username:
//   const [isEditingUsername, setIsEditingUsername] = useState(false);
//   const [newUsername, setNewUsername] = useState('');

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
//       navigation.replace("Auth");
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const handleUnjoinGroup = async (groupId) => {
//     if (!user) return;
//     try {
//       const groupRef = doc(firestore, "familyGroups", groupId);
//       await updateDoc(groupRef, {
//         members: arrayRemove(user.uid)
//       });
//       Alert.alert("Left Group", "You have successfully left the group.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to leave group: " + error.message);
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, user.email);
//       Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to send password reset email: " + error.message);
//     }
//   };

//   // Update the user's username
//   const handleUpdateUsername = async () => {
//     if (!newUsername) {
//       Alert.alert("Error", "Please enter a valid username.");
//       return;
//     }
//     try {
//       await updateProfile(user, { displayName: newUsername });
//       Alert.alert("Success", "Username updated successfully.");
//       // Update local user state with the new username
//       setUser({ ...user, displayName: newUsername });
//       setIsEditingUsername(false);
//     } catch (error) {
//       Alert.alert("Error", "Failed to update username: " + error.message);
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
//           {user.displayName && <Text style={styles.info}>Username: {user.displayName}</Text>}

//           <View style={styles.buttonContainer}>
//             <Button title="Set Username" onPress={() => {
//               setNewUsername(user.displayName || '');
//               setIsEditingUsername(true);
//             }} />
//             <Button title="Reset Password" onPress={handleResetPassword} />
//           </View>

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

//       {/* Modal for editing username */}
//       <Modal
//         visible={isEditingUsername}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setIsEditingUsername(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Set Username</Text>
//             <TextInput
//               style={styles.input}
//               value={newUsername}
//               onChangeText={setNewUsername}
//               placeholder="Enter new username"
//               autoCapitalize="none"
//               editable={true}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setIsEditingUsername(false)}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleUpdateUsername}
//               >
//                 <Text style={styles.modalButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     padding: 20,
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20
//   },
//   info: {
//     fontSize: 18,
//     marginBottom: 10
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 20
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
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 20
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   modalButton: {
//     padding: 10,
//     backgroundColor: '#2196F3',
//     borderRadius: 4,
//     width: '45%',
//     alignItems: 'center'
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold'
//   }
// });



// // new
// // screens/ProfileScreen.js
// // import React, { useEffect, useState } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   StyleSheet, 
// //   Button, 
// //   ActivityIndicator, 
// //   FlatList, 
// //   Alert 
// // } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// // import { auth, firestore, storage } from '../firebaseConfig';
// // import { signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
// // import {
// //   collection,
// //   query,
// //   where,
// //   onSnapshot,
// //   updateDoc,
// //   doc,
// //   arrayRemove
// // } from 'firebase/firestore';
// // import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// // export default function ProfileScreen({ navigation }) {
// //   const [user, setUser] = useState(null);
// //   const [familyGroups, setFamilyGroups] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const currentUser = auth.currentUser;
// //     if (currentUser) {
// //       setUser(currentUser);
// //       // Query for family groups where the current user's UID is in the members array
// //       const groupsQuery = query(
// //         collection(firestore, "familyGroups"),
// //         where("members", "array-contains", currentUser.uid)
// //       );
// //       // Subscribe for real-time updates
// //       const unsubscribe = onSnapshot(groupsQuery, (snapshot) => {
// //         const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //         setFamilyGroups(groups);
// //         setLoading(false);
// //       }, error => {
// //         console.error("Error fetching family groups:", error);
// //         setLoading(false);
// //       });

// //       // Clean up the subscription on unmount
// //       return () => unsubscribe();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const handleSignOut = async () => {
// //     try {
// //       await signOut(auth);
// //       navigation.replace("Auth"); // Navigate back to the authentication screen after sign-out
// //     } catch (error) {
// //       console.error("Error signing out: ", error);
// //     }
// //   };

// //   const handleUnjoinGroup = async (groupId) => {
// //     if (!user) return;
// //     try {
// //       const groupRef = doc(firestore, "familyGroups", groupId);
// //       await updateDoc(groupRef, {
// //         members: arrayRemove(user.uid)
// //       });
// //       Alert.alert("Left Group", "You have successfully left the group.");
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to leave group: " + error.message);
// //     }
// //   };

// //   const handleResetPassword = async () => {
// //     try {
// //       await sendPasswordResetEmail(auth, user.email);
// //       Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to send password reset email: " + error.message);
// //     }
// //   };

// //   // Function to handle profile picture upload
// //   const handleUploadProfilePicture = async () => {
// //     // Request permission to access media library
// //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //     if (!permissionResult.granted) {
// //       Alert.alert("Permission Denied", "Permission to access the media library is required!");
// //       return;
// //     }

// //     // Launch the image picker
// //     const pickerResult = await ImagePicker.launchImageLibraryAsync({
// //       allowsEditing: true,
// //       aspect: [1, 1],
// //       quality: 0.5,
// //     });

// //     if (pickerResult.cancelled) {
// //       return;
// //     }

// //     try {
// //       const { uri } = pickerResult;
// //       // Convert image URI to a blob
// //       const response = await fetch(uri);
// //       const blob = await response.blob();

// //       // Create a storage reference for the profile picture
// //       const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
// //       // Upload the image blob to Firebase Storage
// //       await uploadBytes(storageRef, blob);
// //       // Get the download URL for the uploaded image
// //       const downloadURL = await getDownloadURL(storageRef);

// //       // Update the user's profile with the new photoURL
// //       await updateProfile(user, { photoURL: downloadURL });
// //       Alert.alert("Success", "Profile picture updated successfully.");
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to upload profile picture: " + error.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <ActivityIndicator size="large" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Profile</Text>
// //       {user ? (
// //         <>
// //           <Text style={styles.info}>Email: {user.email}</Text>

// //           <View style={styles.buttonContainer}>
// //             <Button title="Reset Password" onPress={handleResetPassword} />
// //             <Button title="Upload Profile Picture" onPress={handleUploadProfilePicture} />
// //           </View>

// //           <Text style={styles.subtitle}>Family Groups Joined</Text>
// //           {familyGroups.length === 0 ? (
// //             <Text>You have not joined any family groups yet.</Text>
// //           ) : (
// //             <FlatList 
// //               data={familyGroups}
// //               keyExtractor={(item) => item.id}
// //               renderItem={({ item }) => (
// //                 <View style={styles.groupContainer}>
// //                   <Text style={styles.groupName}>{item.name}</Text>
// //                   <Button title="Leave Group" onPress={() => handleUnjoinGroup(item.id)} />
// //                 </View>
// //               )}
// //             />
// //           )}
// //         </>
// //       ) : (
// //         <Text>No user is logged in.</Text>
// //       )}
// //       <Button title="Sign Out" onPress={handleSignOut} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1, 
// //     padding: 20,
// //     alignItems: 'center'
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginVertical: 20
// //   },
// //   info: {
// //     fontSize: 18,
// //     marginBottom: 10
// //   },
// //   subtitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginVertical: 20
// //   },
// //   groupContainer: {
// //     padding: 10,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 4,
// //     marginBottom: 10,
// //     width: '100%',
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center'
// //   },
// //   groupName: {
// //     fontSize: 18,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     width: '100%',
// //     marginBottom: 20,
// //   },
// // });



// // new
// // screens/ProfileScreen.js
// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Button, 
//   ActivityIndicator, 
//   FlatList, 
//   Alert, 
//   Modal, 
//   TextInput, 
//   TouchableOpacity 
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { auth, firestore, storage } from '../firebaseConfig';
// import { signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   updateDoc,
//   doc,
//   arrayRemove
// } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [familyGroups, setFamilyGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State for username editing
//   const [isEditingUsername, setIsEditingUsername] = useState(false);
//   const [newUsername, setNewUsername] = useState('');

//   // State for email editing (if needed; you mentioned remove edit button, so can be omitted)
//   const [isEditingEmail, setIsEditingEmail] = useState(false);
//   const [newEmail, setNewEmail] = useState('');

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
//       navigation.replace("Auth"); // Navigate back to the authentication screen
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const handleUnjoinGroup = async (groupId) => {
//     if (!user) return;
//     try {
//       const groupRef = doc(firestore, "familyGroups", groupId);
//       await updateDoc(groupRef, {
//         members: arrayRemove(user.uid)
//       });
//       Alert.alert("Left Group", "You have successfully left the group.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to leave group: " + error.message);
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, user.email);
//       Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to send password reset email: " + error.message);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!newUsername) {
//       Alert.alert("Error", "Please enter a valid username.");
//       return;
//     }
//     try {
//       await updateProfile(user, { displayName: newUsername });
//       Alert.alert("Success", "Username updated successfully.");
//       setUser({ ...user, displayName: newUsername });
//       setIsEditingUsername(false);
//     } catch (error) {
//       Alert.alert("Error", "Failed to update username: " + error.message);
//     }
//   };

//   const handleUploadProfilePicture = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission Denied", "Permission to access the media library is required!");
//       return;
//     }
//     const pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });
//     if (pickerResult.cancelled) {
//       return;
//     }
//     try {
//       const { uri } = pickerResult;
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
//       await uploadBytes(storageRef, blob);
//       const downloadURL = await getDownloadURL(storageRef);
//       await updateProfile(user, { photoURL: downloadURL });
//       Alert.alert("Success", "Profile picture updated successfully.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to upload profile picture: " + error.message);
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
//           <Text style={styles.info}>Username: {user.displayName || "Not set"}</Text>

//           <View style={styles.buttonContainer}>
//             <Button title="Reset Password" onPress={handleResetPassword} />
//             <Button title="Upload Profile Picture" onPress={handleUploadProfilePicture} />
//             <Button title="Set Username" onPress={() => {
//               setNewUsername(user.displayName || '');
//               setIsEditingUsername(true);
//             }} />
//           </View>

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

//       {/* Modal for editing username */}
//       <Modal
//         visible={isEditingUsername}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setIsEditingUsername(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Set Username</Text>
//             <TextInput
//               style={styles.input}
//               value={newUsername}
//               onChangeText={setNewUsername}
//               placeholder="Enter username"
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setIsEditingUsername(false)}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleUpdateUsername}
//               >
//                 <Text style={styles.modalButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Modal for editing email (optional; can be removed if not needed) */}
//       <Modal
//         visible={isEditingEmail}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setIsEditingEmail(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Edit Email</Text>
//             <TextInput
//               style={styles.input}
//               value={newEmail}
//               onChangeText={setNewEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               placeholder="Enter new email"
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setIsEditingEmail(false)}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleUpdateEmail}
//               >
//                 <Text style={styles.modalButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     padding: 20,
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20
//   },
//   info: {
//     fontSize: 18,
//     marginBottom: 10
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 20
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
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 20
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   modalButton: {
//     padding: 10,
//     backgroundColor: '#2196F3',
//     borderRadius: 4,
//     width: '45%',
//     alignItems: 'center'
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold'
//   }
// });


// // new 4
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   ActivityIndicator,
//   FlatList,
//   Alert,
//   Modal,
//   TextInput,
//   TouchableOpacity
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { auth, firestore, storage } from '../firebaseConfig';
// import { signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
// import {
//   collection,
//   query,
//   where,
//   onSnapshot,
//   updateDoc,
//   doc,
//   arrayRemove
// } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [familyGroups, setFamilyGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State for editing username:
//   const [isEditingUsername, setIsEditingUsername] = useState(false);
//   const [newUsername, setNewUsername] = useState('');

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
//       navigation.replace("Auth");
//     } catch (error) {
//       console.error("Error signing out: ", error);
//     }
//   };

//   const handleUnjoinGroup = async (groupId) => {
//     if (!user) return;
//     try {
//       const groupRef = doc(firestore, "familyGroups", groupId);
//       await updateDoc(groupRef, {
//         members: arrayRemove(user.uid)
//       });
//       Alert.alert("Left Group", "You have successfully left the group.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to leave group: " + error.message);
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, user.email);
//       Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to send password reset email: " + error.message);
//     }
//   };

//   const handleUpdateUsername = async () => {
//     if (!newUsername) {
//       Alert.alert("Error", "Please enter a valid username.");
//       return;
//     }
//     try {
//       await updateProfile(user, { displayName: newUsername });
//       Alert.alert("Success", "Username updated successfully.");
//       setUser({ ...user, displayName: newUsername });
//       setIsEditingUsername(false);
//     } catch (error) {
//       Alert.alert("Error", "Failed to update username: " + error.message);
//     }
//   };

//   // const handleUploadProfilePicture = async () => {
//   //   // Request permission to access media library
//   //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   //   if (!permissionResult.granted) {
//   //     Alert.alert("Permission Denied", "Permission to access the media library is required!");
//   //     return;
//   //   }
//   //   // Launch the image picker
//   //   const pickerResult = await ImagePicker.launchImageLibraryAsync({
//   //     allowsEditing: true,
//   //     aspect: [1, 1],
//   //     quality: 0.5,
//   //   });
//   //   if (pickerResult.cancelled) {
//   //     return;
//   //   }
//   //   try {
//   //     const { uri } = pickerResult;
//   //     const response = await fetch(uri);
//   //     const blob = await response.blob();
//   //     // Create a storage reference for the profile picture
//   //     const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
//   //     await uploadBytes(storageRef, blob);
//   //     const downloadURL = await getDownloadURL(storageRef);
//   //     // Update the user's profile with the new photoURL
//   //     await updateProfile(user, { photoURL: downloadURL });
//   //     Alert.alert("Success", "Profile picture updated successfully.");
//   //   } catch (error) {
//   //     Alert.alert("Error", "Failed to upload profile picture: " + error.message);
//   //   }
//   // };


//   const handleUploadProfilePicture = async () => {
//     // Request permission to access media library
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Permission Denied", "Permission to access the media library is required!");
//       return;
//     }
//     // Launch the image picker
//     const pickerResult = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });
//     if (pickerResult.cancelled) {
//       return;
//     }
//     try {
//       // Use the correct URI from the assets array
//       const { uri } = pickerResult.assets[0];
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       // Create a storage reference for the profile picture
//       const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
//       await uploadBytes(storageRef, blob);
//       const downloadURL = await getDownloadURL(storageRef);
//       // Update the user's profile with the new photoURL
//       await updateProfile(user, { photoURL: downloadURL });
//       Alert.alert("Success", "Profile picture updated successfully.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to upload profile picture: " + error.message);
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
//           {user.displayName && <Text style={styles.info}>Username: {user.displayName}</Text>}

//           <View style={styles.buttonContainer}>
//             <Button title="Set Username" onPress={() => {
//               setNewUsername(user.displayName || '');
//               setIsEditingUsername(true);
//             }} />
//             <Button title="Reset Password" onPress={handleResetPassword} />
//             <Button title="Upload Profile Picture" onPress={handleUploadProfilePicture} />
//           </View>

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

//       {/* Modal for editing username */}
//       <Modal
//         visible={isEditingUsername}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setIsEditingUsername(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Set Username</Text>
//             <TextInput
//               style={styles.input}
//               value={newUsername}
//               onChangeText={setNewUsername}
//               placeholder="Enter new username"
//               autoCapitalize="none"
//               editable={true}
//             />
//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => setIsEditingUsername(false)}
//               >
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleUpdateUsername}
//               >
//                 <Text style={styles.modalButtonText}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20
//   },
//   info: {
//     fontSize: 18,
//     marginBottom: 10
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 20
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
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 20
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   modalButton: {
//     padding: 10,
//     backgroundColor: '#2196F3',
//     borderRadius: 4,
//     width: '45%',
//     alignItems: 'center'
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold'
//   }
// });


// new
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
  TouchableOpacity,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../firebaseConfig';
import { signOut, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  arrayRemove
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [familyGroups, setFamilyGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for editing username:
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');

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
      navigation.replace("Auth");
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

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert("Reset Email Sent", "A password reset email has been sent to your email address.");
    } catch (error) {
      Alert.alert("Error", "Failed to send password reset email: " + error.message);
    }
  };

  const handleUpdateUsername = async () => {
    if (!newUsername) {
      Alert.alert("Error", "Please enter a valid username.");
      return;
    }
    try {
      await updateProfile(user, { displayName: newUsername });
      Alert.alert("Success", "Username updated successfully.");
      setUser({ ...user, displayName: newUsername });
      setIsEditingUsername(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update username: " + error.message);
    }
  };

  const handleUploadProfilePicture = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Permission to access the media library is required!");
      return;
    }
    // Launch the image picker
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (pickerResult.cancelled) {
      return;
    }
    try {
      // Use the correct URI from the assets array
      const { uri } = pickerResult.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      // Create a storage reference for the profile picture
      const storageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      // Update the user's profile with the new photoURL
      await updateProfile(user, { photoURL: downloadURL });
      Alert.alert("Success", "Profile picture updated successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to upload profile picture: " + error.message);
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
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          ) : (
            <Text style={styles.info}>No profile picture</Text>
          )}
          <Text style={styles.info}>Email: {user.email}</Text>
          {user.displayName && <Text style={styles.info}>Username: {user.displayName}</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Set Username" onPress={() => {
              setNewUsername(user.displayName || '');
              setIsEditingUsername(true);
            }} />
            <Button title="Reset Password" onPress={handleResetPassword} />
            <Button title="Upload Profile Picture" onPress={handleUploadProfilePicture} />
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

      {/* Modal for editing username */}
      <Modal
        visible={isEditingUsername}
        animationType="slide"
        transparent
        onRequestClose={() => setIsEditingUsername(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Username</Text>
            <TextInput
              style={styles.input}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Enter new username"
              autoCapitalize="none"
              editable={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsEditingUsername(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateUsername}
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
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

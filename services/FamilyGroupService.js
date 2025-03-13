
//new
import { firestore, auth } from '../firebaseConfig';
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';

/**
 * Create a new family group.
 * @param {string} groupName - The name of the family group.
 * @returns {Promise<string>} The newly created group's document ID.
 */
export async function createFamilyGroup(groupName) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not logged in");
  }
  
  // Check if a family group with the same name already exists
  const groupQuery = query(
    collection(firestore, "familyGroups"),
    where("name", "==", groupName)
  );
  const querySnapshot = await getDocs(groupQuery);
  if (!querySnapshot.empty) {
    throw new Error("A family group with that name already exists.");
  }
  
  try {
    // Create a new document in the "familyGroups" collection
    const groupRef = await addDoc(collection(firestore, "familyGroups"), {
      name: groupName,
      createdBy: user.uid,
      members: [user.uid],
      createdAt: serverTimestamp(),
    });
    return groupRef.id;
  } catch (error) {
    throw new Error("Failed to create group: " + error.message);
  }
}

/**
 * Join an existing family group by name.
 * @param {string} groupName - The name of the family group to join.
 */
export async function joinFamilyGroup(groupName) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not logged in");
  }
  
  // Query for the family group document with the given group name
  const groupQuery = query(
    collection(firestore, "familyGroups"),
    where("name", "==", groupName)
  );
  const querySnapshot = await getDocs(groupQuery);
  
  if (querySnapshot.empty) {
    throw new Error("No family group found with the name: " + groupName);
  }
  
  // Assuming group names are unique, select the first document
  const groupDoc = querySnapshot.docs[0];
  
  try {
    // Update the document by adding the current user's UID to the members array
    await updateDoc(groupDoc.ref, {
      members: arrayUnion(user.uid),
    });
  } catch (error) {
    throw new Error("Failed to join group: " + error.message);
  }
}

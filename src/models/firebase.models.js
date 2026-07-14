import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../data/firebase.data.js";

//Traer todos los elementso de una coleccion
export async function readDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  //Mapeo los documentos para unificar el ID de Firebase con los campos internos del objeto
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

//Trae elemento por unico ID
export async function readDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  return { id: docSnap.id, ...docSnap.data() };
}

//Agrega nuevo documento, con FB eligiendo una ID aleatoria
export async function createDocument(collectionName, data) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

//Actualizar campos
export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

//Elimina el documento de la coleccion por su ID
export async function deleteDocument(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
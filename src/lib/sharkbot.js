import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

async function get_doc(collection, document_id) {
  const docRef = doc(db, collection, document_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

async function set_doc(collection, document_id, data) {
  const docRef = doc(db, collection, document_id);
  await setDoc(docRef, data);
}

export async function get_item(item_id) {
    return await get_doc('items', item_id);
}

export async function get_collection(collection_id) {
    return await get_doc('collections', collection_id);
}

export async function get_member(member_id) {
    return await get_doc('members', member_id);
}

export async function get_leaderboard(leaderboard_id) {
    return await get_doc('leaderboards', leaderboard_id);
}

export async function get_post(post_id) {
    return await get_doc('posts', post_id);
}

export async function set_post(post_id, data) {
    return await set_doc('posts', post_id, data);
}
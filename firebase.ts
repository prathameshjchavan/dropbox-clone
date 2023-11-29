import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG!;

const app = getApps().length
	? getApp()
	: initializeApp(JSON.parse(firebaseConfig));

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

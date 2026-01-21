import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEW-y79QIC2OWfeHaDF5NjSIVQf2pzmNI",
    authDomain: "smellgood-3e9dc.firebaseapp.com",
    projectId: "smellgood-3e9dc",
    storageBucket: "smellgood-3e9dc.firebasestorage.app",
    messagingSenderId: "964545028386",
    appId: "1:964545028386:web:5844a5a090e65f604b057b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
    } catch (error) {
        console.error("Помилка завантаження продуктiв: ", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categories = [];
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return categories;
    } catch (error) {
        console.error("Помилка завантаження категорiй: ", error);
        return [];
    }
};

export {
    db,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
};

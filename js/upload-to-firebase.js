import { db, auth } from './firebase-config.js';
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase'e veri yükleme scripti
const menuItems = {
    "menu": {
        "Popüler": [
            {
                "id": "popular-1",
                "name": "Tereyağlı İskender (Et Dönerden)",
                "price": "340 TL",
                "image": "Tereyağlı Eti Bol İskender (Et Dönerden).jpg",
                "description": "Özel sos, tereyağı. Domates, közlenmiş biber, patates kızartması, yoğurt, tırnak pide",
                "kalori": "950 kcal",
                "category": "Popüler"
            },
            // ... diğer ürünler
        ],
        "Çorbalar": [
            {
                "id": "corba-1",
                "name": "Ezogelin Çorbası",
                "price": "80 TL",
                "image": "ezogelin.jpg",
                "description": "Tırnaklı pide ile",
                "kalori": "120 kcal",
                "category": "Çorbalar"
            }
        ]
        // ... diğer kategoriler
    }
};

async function uploadMenuToFirebase() {
    try {
        // Kullanıcının giriş yapmasını bekle
        await new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    unsubscribe();
                    resolve();
                }
            });
        });

        // Her kategori için
        for (const [category, items] of Object.entries(menuItems.menu)) {
            try {
                // Kategoriyi Firestore'a ekle
                await setDoc(doc(db, "menu", category), {
                    items: items
                });
                console.log(`${category} kategorisi başarıyla yüklendi.`);
            } catch (error) {
                console.error(`${category} kategorisi yüklenirken hata oluştu:`, error);
            }
        }
        console.log("Tüm veriler başarıyla yüklendi!");
    } catch (error) {
        console.error("Veri yükleme işlemi sırasında bir hata oluştu:", error);
    }
}

// Scripti çalıştırmak için:
document.addEventListener('DOMContentLoaded', function() {
    uploadMenuToFirebase();
}); 
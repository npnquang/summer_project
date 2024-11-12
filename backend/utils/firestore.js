const { collection, getDocs, query, where, addDoc, updateDoc, doc, increment } = require('firebase/firestore'); // functions to make queries to firestore
const firebaseConfig = require("../config"); // import firebase configurations
const { initializeApp } = require("firebase/app"); // initialize app function
const { getFirestore } = require("firebase/firestore"); // get firestore instance function
const { getAuth } = require("firebase/auth"); // authentication

// create the app, database and authentication
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// get the reference to the data collection
const dataCollection = collection(db, "data");

/**
 * This function gets the number of CRUD operations from firestore database
 */
async function getStats() {
    try {
        // get the documents from firestore
        const result = await getDocs(dataCollection);

        let stats = {
            "create": 0,
            "read": 0,
            "update": 0,
            "delete": 0
        };

        // loop through documents and add the count to stats
        result.forEach((docSnap) => {
            const data = docSnap.data();
            const operation = data.operation;
            const count = data.count;
            if (count && operation) {
                stats[operation] += count;
            }
        });

        return stats;
    } catch (error) {
        console.error('Error getting stats:', error);
    }
}

/**
 * This function increases the CRUD operations
 * 
 * @param {string} operation - the name of the CRUD operation
 */
async function increaseOperation(operation) {
    try {
        // construct the query
        const q = query(dataCollection, where("operation", "==", operation));
        const result = await getDocs(q);

        if (result.empty) {
            // if the result is emtpy and add a new document to the database
            await addDoc(dataCollection, {
                "operation": operation,
                "count": 1
            });
        } else {
            // loop through the documents and increase the count by 1
            result.forEach(async (docSnap) => {
                const docRef = doc(db, 'data', docSnap.id);
                await updateDoc(docRef, {
                    "count": increment(1)
                });
            });
        }
    } catch (error) {
        console.error('Error increasing operation:', error);
    }
}

module.exports = {
    increaseOperation,
    getStats,
    db,
    auth
};
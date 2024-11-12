const mongoose = require("mongoose"); // import mongoose
require('dotenv').config();

/**
 * This function connects the app to the database
 */
async function connectDB() {
    const URL = `${process.env.MONGO_URI}`;

	try {
        await mongoose.connect(URL);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

/**
 * This function create a random string containing based on the requirements
 * @param {string} mode - either 'letters' or 'numbers'
 * @param {int} len - length of the generated strings
 * 
 * @returns {string} 
 */
function generateRandomString(mode, len) {
    let characters = "";
    if (mode === "letters") {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } else if (mode === "numbers") {
        characters = '0123456789';
    } else {
        return "";
    }
    let result = '';
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}





module.exports = {
    connectDB,
    generateRandomString,
}
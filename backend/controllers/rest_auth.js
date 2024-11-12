const express = require("express"); // import express
const { auth, db } = require("../utils/firestore"); // authentication and database of firebase
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth'); // functions to handle user sign in and register
const { collection, addDoc, getDocs, query, where } = require("firebase/firestore"); // functions to make queries to firestore


router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());


/**
 * This function handles the login logic
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function login(req, res) {
    let { username, password } = req.body;
    // create a dummy email and sign in
    let email = username + "@fit2095pdma.com";

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
                return res.status(200).json({
                    status: "Login successfully"
                })
            })
        .catch((e) => {
            let errorMessage;
            switch (e.code) {
                case "auth/invalid-credential":
                    errorMessage = "Incorrect password or username";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many failed login attempts. Please try again later.";
                    break;
                default:
                    errorMessage = e.message;
                    break;
            }
            return res.status(400).json({
                status: errorMessage
            });
        })
}
router.post("/login", login)


/**
 * This function handles the register logic
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function register(req, res) {
    let { username, password, passwordCheck } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;

    // check for validity of username and password
    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            status: "Username must have at least 6 alphanumeric characters"
        });
    }

    const passwordRegex = /^.{5,10}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            status: "Password must have between 5 and 10 characters (inclusive)"
        });
    }

    if (!password === passwordCheck) {
        return res.status(400).json({
            status: "Passwords does not match"
        });
    }

    // check if the username already exists
    const userCollection = collection(db, "user");
    const q = query(userCollection, where("operation", "==", username));
    let result = await getDocs(q);

    // return immediately if the username has been used
    if (!result.empty) {
        return res.status(400).json({
            status: "Username already exists"
        });
    }

    // create a dummy email and register the new user
    let email = username + "@fit2095pdma.com";
    
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await addDoc(userCollection, {
                username,
                password
            });

            await auth.signOut();
            return res.status(200).json({
                status: "Signup sucessfully"
            })
        })
        .catch((e) => {
            let errorMessage;

            switch (e.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This username is already in use. Please try another username.";
                    break;
                case "auth/weak-password":
                    errorMessage = "The password is too weak. Please provide a stronger password.";
                    break;
                default:
                    errorMessage = e.message;
                    break;
            }

            return res.status(400).json({
                status: errorMessage
            });
        });
}
router.post("/register", register)


/**
 * This function handles the logout logic
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function logOut(req, res) {
    auth.signOut();
    return res.status(200).json({
        status: "Logout successfully"
    });
}
router.post("/logout", logOut);


async function checkAuth(req, res) {
    if (auth.currentUser) {
        res.status(200).json({ status: true });
    } else {
        res.status(200).json({ status: false })
    }
}
router.get("/check-auth", checkAuth);

module.exports = router;

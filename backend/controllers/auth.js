const express = require("express"); // import express
const { auth, db } = require("../utils/firestore"); // authentication and database of firebase
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth'); // methods to handle login and register
const { collection, addDoc, getDocs, query, where } = require("firebase/firestore"); // methods to make queries to firestore

router = express.Router();
router.use(express.static("node_modules/bootstrap/dist/css"));

router.use(express.urlencoded({extended: true}));
router.use(express.json());

/**
 * This function renders the login form
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function renderLoginForm(req, res) {
    if (auth.currentUser) {
        res.redirect("/");
    } else {
        res.render("common/login", {login: false});
    }
}
router.get("/login", renderLoginForm);

/**
 * This function handles the login logic
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function login(req, res) {
    let { username, password } = req.body;
    let email = username + "@fit2095pdma.com"; // create a dummy email using the username

    // sign in with that email and password
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
                return res.redirect("/");
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
            return res.render("common/invalid", {errors: [errorMessage], login: false});
        })
}
router.post("/login", login);

/**
 * This function renders the register form
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function renderRegister(req, res) {
    if (auth.currentUser) {
        res.redirect("/");
    } else {
        res.render("common/register", {login: false});
    }
}
router.get("/register", renderRegister);

/**
 * This function handles the register logic
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function register(req, res) {
    let { username, password, passwordCheck } = req.body;

    // check for format of username, password and passworkCheck
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(username)) {
        return res.render("common/invalid", {errors: ["Username must have at least 6 alphanumeric characters"], login: false});
    }

    const passwordRegex = /^.{5,10}$/;
    if (!passwordRegex.test(password)) {
        return res.render("common/invalid", {errors: ["Password must have between 5 and 10 characters (inclusive)"], login: false});
    }

    if (!password === passwordCheck) {
        return res.render("common/invalid", {errors: ["Passwords does not match"], login: false});
    }

    // check if the username already exists
    const userCollection = collection(db, "user");
    const q = query(userCollection, where("operation", "==", username));
    let result = await getDocs(q);

    if (!result.empty) {
        return res.render("common/invalid", {errors: ["Username already exists"], login: false});
    }

    // create a dummy email and register the user
    let email = username + "@fit2095pdma.com";
    
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            await addDoc(userCollection, {  // add new user to the database if registration is successful
                username,
                password
            });

            await auth.signOut();
            return res.redirect("/32963742/James/login");
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

            return res.render("common/invalid", {errors: [errorMessage], login: false});
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
    return res.redirect("/");
}
router.get("/logout", logOut);

module.exports = router;
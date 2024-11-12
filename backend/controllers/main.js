const express = require("express"); // import express
const driver_router = require("./driver"); // driver router
const package_router = require("./package"); // package router
const { getStats } = require("../utils/firestore"); // getStats to retrive the number of CRUD operations
const { auth } = require("../utils/firestore"); // authentication from firestore

let router = express.Router(); // main router
router.use(express.static("node_modules/bootstrap/dist/css"));

/**
 * This function is a middleware to check if there is a signed in user or not to protect the other views.
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
function checkAuth(req, res, next) {
    const user = auth.currentUser;

    if (user) {
        req.body.login = true;
        next();
    } else {
        req.body.login = false;
        res.redirect("/32963742/James/login");
    }
}
router.use(checkAuth);


// connect to the browser-based routers
router.use("/driver", driver_router);
router.use("/package", package_router);

/**
* This function renders the status page
* 
* @param {Express.Request} req 
* @param {Express.Response} res 
*/
async function renderStatus(req, res) {
    let stats = await getStats();
    res.render("common/stats", {stats, login: true});
}
router.get("/stats", renderStatus);


/**
* This function renders the 404 not found view
* 
* @param {Express.Request} req 
* @param {Express.Response} res 
*/
function renderErrorPage(req, res) {
    res.render("common/404", {login: true});
}
router.get("/error", renderErrorPage);

module.exports = router;

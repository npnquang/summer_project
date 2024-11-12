const express = require("express"); // express app
const rest_driver_router = require("./rest_driver");
const rest_package_router = require("./rest_package");
const rest_auth_router = require("./rest_auth");
const { auth, getStats } = require("../utils/firestore");

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
    if (user || req.url === "/v1/login" || req.url === "/v1/register" || req.url === '/v1/check-auth') {
        next();
    } else {
        return res.status(400).json({
            status: "User not signed in"
        });
    }
}
router.use(checkAuth);

// connect REST routers
router.use("/v1/driver", rest_driver_router);
router.use("/v1/package", rest_package_router);
router.use("/v1", rest_auth_router);

/**
 * This function retrieves the stats about CRUD operations and return them
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function retrieveStats(req, res) {
    let result = await getStats();
    return res.status(200).json(result);
}
router.get("/v1/stats", retrieveStats);

function redirect404Rest (req, res) {
    res.status(404);
    res.json({
        status: "Bad request" 
    })
}
router.get("*", redirect404Rest)

module.exports = router;

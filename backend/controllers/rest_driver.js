const express = require("express"); // import express
const { default: mongoose } = require("mongoose"); // import mongoose
const Driver = require("../models/driver"); // Driver model
const Package = require("../models/package"); // Package model
const { connectDB, generateRandomString } = require("../utils/utils"); // utility functions
const { increaseOperation } = require("../utils/firestore"); // function to increase CRUD operation counter

connectDB();

let router = express.Router(); // REST driver router

router.use(express.urlencoded({extended: true}));
router.use(express.json());

/**
 * This function handles the GET request and returns the list of drivers
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function getDrivers(req, res) {
    let drivers = await Driver.find({}).populate("assigned_packages").exec();
    increaseOperation("read");
    return res.status(200).json(drivers);
}
router.get("/", getDrivers);

/**
 * This function handles the POST request submitted to add a driver to the database
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function insertDriver(req, res) {
    // create new driver
    let id = new mongoose.Types.ObjectId();
    let driverId = "D" + parseInt(Math.random() * 100) + "-32-" + generateRandomString("letters", 3);
    let newDriver = new Driver({
        _id: id,
        driverId,
        name: req.body.driver_name,
        department: req.body.driver_department,
        licence: req.body.driver_licence,
        isActive: req.body.driver_isActive ? true : false
    });

    // save new driver to mongodb
    try {
        await newDriver.save();
        increaseOperation("create");
        return res.status(200).json({
            id,
            driver_id: driverId
        });
    } catch (err) {
        return res.status(400).json({
            status: err.message
        });
    }
}
router.post("/add", insertDriver);

/**
 * This function handles the DELETE request
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function deleteDriver(req, res) {
    // check if driver id is valid
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).json({
            status: "ID not found"
        });
    }

    //find the packages assigned to that driver
    id = new mongoose.Types.ObjectId(req.query.id);
    let packages = await Driver.findOne(
        {
            _id: id
        }
    ).select("assigned_packages").populate("assigned_packages").exec();
    
    // if no package found, this means this driver does not exist
    if (!packages) {
        return res.status(400).json({
            status: "ID not found"
        });
    }
    
    // delete the assigned packages
    packages = packages["assigned_packages"];
    packages.map(
        async (item) => {
            await Package.deleteOne({
                _id: item._id
            })
            increaseOperation("delete");
        }
    );

    // delete the driver
    let result = await Driver.deleteOne({
        _id: id
    });

    increaseOperation("delete");
    return res.status(200).json(result);
}
router.delete("/delete", deleteDriver);


/**
 * This function handles the PUT request to update a driver
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
async function updateDriver(req, res) {
    let { id, driver_licence, driver_department } = req.body;

    // check if driver id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            status: "ID not found"
        });
    }
    
    id = new mongoose.Types.ObjectId(id);

    // construct the object storing data to be updated
    let updateData = {}
    if (driver_licence) {
        updateData["licence"] = driver_licence;
    }
    if (driver_department) {
        updateData["department"] = driver_department;
    }
    
    // update the driver
    let result = await Driver.updateOne(
        {
            _id: id
        },
        updateData
    );
    
    // check if driver is updated
    if (result.modifiedCount === 0 || !result.modifiedCount) {
        return res.status(400).json({
            status: "ID not found or no changes were made"
        });
    }

    increaseOperation("update");
    return res.status(200).json({
        status: "Driver updated successfully"
    });
}
router.put("/update", updateDriver);



module.exports = router;